import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fetchRevenueReport } from "@/api/revenues.api";
import { FetchRevenuesPayload, Revenue } from "@/types";
import { formatForDateTimeLocal } from "@/utils/formatForDateTimeLocal ";


const Revenues = () => {
  const [tab, setTab] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["revenues", { startDate, endDate }],
    queryFn: () => {
      const start=startDate?new Date(startDate):null;
      const end=endDate?new Date(endDate):null;
      
      return fetchRevenueReport({
        startDate:start,
        endDate:end
      });
    },
  });

  useEffect(() => {
    const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  setStartDate(formatForDateTimeLocal(start));
  setEndDate(formatForDateTimeLocal(end));
  }, []);

  const onTabChange=(newTab:string)=>{
   const now = new Date();

  if (newTab === "daily") {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    setStartDate(formatForDateTimeLocal(start));
    setEndDate(formatForDateTimeLocal(end));
  } else if (newTab === "monthly") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    setStartDate(formatForDateTimeLocal(start));
    setEndDate(formatForDateTimeLocal(end));
  }

  setTab(newTab);
  }  

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">تقرير الإيرادات</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">من تاريخ</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => {
                setTab("");
                setStartDate(e.target.value);
              }}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">إلى تاريخ</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => {
                setTab("");
                setEndDate(e.target.value);
              }}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="flex items-end">
            <Button className="w-full">عرض التقرير</Button>
          </div>
        </div>
        {(!isError && !isLoading && data?.startDate && data?.endDate) && (
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 text-right border border-gray-200">
            <p>
              عرض التقرير 
              {` من ${format(new Date(data.startDate), "yyyy-MM-dd, HH:mm")}`}{" "}
              {`إلى ${format(new Date(data.endDate), "yyyy-MM-dd, HH:mm")}`}
            </p>
            <p className="mt-1">
              إجمالي الإيرادات: <span className="font-bold">{data?.totalAmount || 'غير معروف'} ش</span>
            </p>
          </div>
        )}

        <Tabs value={tab} onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="monthly">الشهر الحالي</TabsTrigger>
            <TabsTrigger value="daily">اليوم الحالي</TabsTrigger>
            {/* <TabsTrigger value="all">الكل</TabsTrigger> */}
          </TabsList>

          <TabsContent value={tab} className="space-y-4">
            {isLoading && <p>جاري تحميل البيانات...</p>}
            {isError && <p className="text-red-500">حدث خطأ: {(error as Error).message}</p>}
            {!isLoading && !isError && data?.revenues?.length === 0 && (
              <p>لا توجد بيانات إيرادات</p>
            )}

            {!isLoading &&
              !isError &&
              data?.revenues?.map((rev:Revenue) =>{ 
                return (
                <Card key={rev.id} className="p-4 text-right">
                  <div className="flex flex-col md:flex-row justify-end gap-4 md:items-center">
                    <div className="text-sm text-gray-500">
                      <p>تاريخ الإيراد: <span className="font-medium">{format(new Date(rev.date), "yyyy-MM-dd HH:mm")}</span></p>
                      <p>المصدر: <span className="font-medium">{
                        rev.type=='SUBSCRIPER'
                        ? 'من مشترك' 
                        : rev.type=='GUEST'
                        ? 'من زائر'
                        : 'من نقطة بيع'
                      }</span></p>
                      <p>الإجمالي: <span className="font-medium text-green-600">{rev.amount} ش</span></p>
                    </div>
                  </div>
                </Card>
                )
              }

              )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Revenues;
