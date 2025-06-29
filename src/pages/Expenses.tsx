import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { formatForDateTimeLocal } from "@/utils/formatForDateTimeLocal";
import { Expenses as ExpensesType } from "@/types";
import { fetchExpensesReport } from "@/api/expenses.api";
import Pagination from "@/components/layout/Pagination";

const Expenses = () => {
  const [tab, setTab] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["expenses", { startDate, endDate },page],
    queryFn: () => {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return fetchExpensesReport({ startDate: start, endDate: end },page,limit);
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

  const onTabChange = (newTab: string) => {
    const now = new Date();
    setPage(1);
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
  };

  if (isLoading) {
    return <Layout><div className="text-center py-10">جاري التحميل...</div></Layout>;
  }
  
  if (isError || !data) {
    return <Layout><div className="text-center py-10 text-red-600">حدث خطأ في تحميل البيانات.</div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">تقرير المصروفات</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">من تاريخ</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => {
                setTab("");
                setPage(1);
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
                setPage(1);
                setEndDate(e.target.value);
              }}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          {/* <div className="flex items-end">
            <Button className="w-full">عرض التقرير</Button>
          </div> */}
        </div>

        {(!isError && !isLoading && data?.startDate && data?.endDate) && (
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 text-right border border-gray-200">
            <p>
              عرض التقرير
              {` من ${format(new Date(data.startDate), "yyyy-MM-dd, HH:mm")}`}{" "}
              {`إلى ${format(new Date(data.endDate), "yyyy-MM-dd, HH:mm")}`}
            </p>
            <p className="mt-1">
              إجمالي المصروفات: <span className="font-bold">{data?.totalAmount || 'غير معروف'} ش</span>
            </p>
          </div>
        )}

        <Tabs value={tab} onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="monthly">الشهر الحالي</TabsTrigger>
            <TabsTrigger value="daily">اليوم الحالي</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="space-y-4">
            {isLoading && <p>جاري تحميل البيانات...</p>}
            {isError && <p className="text-red-500">حدث خطأ: {(error as Error).message}</p>}
            {!isLoading && !isError && data?.expenses?.length === 0 && (
              <p>لا توجد بيانات مصروفات</p>
            )}

            {!isLoading &&
              !isError &&
              data?.expenses?.map((exp: ExpensesType) => {
                return (
                  <Card key={exp.id} className="p-4 text-right">
                    <div className="flex flex-col md:flex-row justify-end gap-4 md:items-center">
                      <div className="text-sm text-gray-500">
                        <p>تاريخ المصروف: <span className="font-medium">{format(new Date(exp.date), "yyyy-MM-dd HH:mm")}</span></p>
                        <p>النوع: <span className="font-medium">
                          {exp.type === "SUPPLIER"
                            ? "مورد"
                            : exp.type === "SALARY"
                            ? "رواتب"
                            : "أخرى"}
                        </span></p>
                        <p>المبلغ: <span className="font-medium text-red-600">{exp.amount} ش</span></p>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </TabsContent>
        </Tabs>
      </div>
      <Pagination 
        page={page}
        setPage={setPage}
        pagination={data.pagination}
      />
    </Layout>
  );
};

export default Expenses;
