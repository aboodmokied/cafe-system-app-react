import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Billing } from "@/types";
import { fetchCollectionBillings } from "@/api/billings.api";
import { useNavigate } from "react-router-dom";

const CollectionBillings = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["collection-billings", page],
    queryFn: () => fetchCollectionBillings(page, limit),
  });

  if (isLoading) {
    return <Layout><div className="text-center py-10">جاري التحميل...</div></Layout>;
  }

  if (isError || !data) {
    return <Layout><div className="text-center py-10 text-red-600">حدث خطأ في تحميل الفواتير.</div></Layout>;
  }

  const { billings, totalAmount, pagination } = data;

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">فواتير غير مدفوعة</h1>
        <p className="text-red-600 font-semibold">إجمالي الفواتير المطلوبة: {totalAmount} ش</p>

        {billings.length === 0 ? (
          <div className="text-gray-400">لا توجد فواتير.</div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {billings.map((billing: Billing) => (
              <AccordionItem key={billing.id} value={`billing-${billing.id}`} className="border rounded-lg">
                <div className="bg-red-100 text-red-700 font-bold text-sm px-4 py-2 rounded-t-lg text-right">
                  🔺 مطلوب الدفع
                </div>
                <AccordionTrigger className="p-4 justify-between text-right">
                  <div>
                    <p className="font-bold">#{billing.id}</p>
                    <p className="text-sm">الفترة: {new Date(billing.startDate).toLocaleDateString()} - {new Date(billing.endDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-700">المشترك: {billing.subscriper?.username || "غير معروف"}</p>
                    <p className="text-red-600 font-semibold">الإجمالي: {billing.totalAmount - billing.paidAmount} ش</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50 space-y-2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate(`/subscribers/${billing.subscriperId}/report`)}
                  >
                    📄 عرض تقرير المشترك
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => alert(`تسديد للفاتورة رقم ${billing.id}`)}
                  >
                    💵 تسديد
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Pagination controls */}
        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >
            السابق
          </Button>
          <div className="text-sm pt-2">صفحة {page} من {pagination.totalPages}</div>
          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
          >
            التالي
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionBillings;
