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

type TabType = "all" | "weekly" | "monthly";

const Subscripers = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [page, setPage] = useState(1);
  const limit = 1;
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryFn: ()=>fetchSubscribers(page,limit),
    queryKey: ["subscripers"],
  });

   const filteredSubscriptions =
    activeTab === "all"
      ? data?.subscripers || []
      : data?.subscripers?.filter((sub) =>
          activeTab === "monthly" ? sub.type === "monthly" : sub.type === "weekly"
        ) || [];

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

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-right"
            type="text"
            placeholder="البحث عن المشتركين..."
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={(val) => setActiveTab(val as TabType)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="monthly">شهري</TabsTrigger>
            <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            { filteredSubscriptions.length === 0 ? (
              <p>لا توجد اشتراكات لعرضها</p>
            )
            : (
              filteredSubscriptions.map((subscription) => (
                <Card key={subscription.id} className="p-4 text-right">
                  <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex items-center">
                      <Button variant="outline" size="sm">
                        <Link to={`/subscripers/${subscription.id}/report`}>عرض التقرير</Link>
                      </Button>
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

                    <div>
                      <h3 className="text-lg font-medium">{subscription.username}</h3>
                    </div>
                  </div>
                </Card>
              ))
            )
              }
          </TabsContent>
        </Tabs>
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
