import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";
import NewSubscriptionDialog from "@/components/subscripers/NewSubscriptionDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchSubscribers } from "@/api/subscriper.api";
import { Link } from "react-router-dom";
import Pagination from "@/components/layout/Pagination";
import SearchBar from "@/components/layout/SearchBar";

type TabType = "all" | "weekly" | "monthly";

const Subscripers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 1;
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryFn: ()=>fetchSubscribers(page,limit,searchQuery),
    queryKey: ["subscripers",page,searchQuery],
  });


  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-10 text-blue-600 font-semibold">جاري تحميل التقرير...</div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center py-10 text-red-600 font-semibold">
          حدث خطأ أثناء تحميل البيانات
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 text-right">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2 items-center">
            <NewSubscriptionDialog />
            <Link to='/collection-billings'>
              <Button className="bg-red-500 hover:bg-red-300">
                  عرض فواتير تحتاج للتحصيل
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold">الاشتراكات</h1>
        </div>

        <SearchBar
          onSearch={(searchInput)=>{
            setPage(1);
            setSearchQuery(searchInput);
          }}
        />

          <div className="space-y-4">
            { data.subscripers.length === 0 ? (
              <p>لا توجد اشتراكات لعرضها</p>
            )
            : (
              data.subscripers.map((subscription) => (
                <Card key={subscription.id} className="p-4 text-right" dir="rtl">
                  <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div>
                      <h3 className="text-lg font-medium">{subscription.username}</h3>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">الهاتف</p>
                        <p className="font-medium">{subscription.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">ايميل</p>
                        <p className="font-medium">{subscription.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">نوع الاشتراك</p>
                        <p className="font-medium">{subscription.type}</p>
                      </div>
                    </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm">
                          <Link to={`/subscripers/${subscription.id}/report`}>عرض التقرير</Link>
                        </Button>
                      </div>
                    
                  </div>
                </Card>
              ))
            )
              }
          </div>
      </div>
      {/* pagination controll */}
      <Pagination
        page={page}
        setPage={setPage}
        pagination={data.pagination}
      />  
    </Layout>
  );
};

export default Subscripers;
