import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { PointBilling } from "@/types";
import { fetchPointCollectionBillings } from "@/api/billings.api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { SalesPointBillingPaymentDialog } from "@/components/sales-point/SalesPointBillingPaymentDialog";
import Pagination from "@/components/layout/Pagination";

const PoinCollectionBillings = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const [paymentBillingId, setPaymentBillingId] = useState<number | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["point-collection-billings", page],
    queryFn: () => fetchPointCollectionBillings(page, limit),
  });

  if (isLoading) {
    return <Layout><div className="text-center py-10">جاري التحميل...</div></Layout>;
  }

  if (isError || !data) {
    return <Layout><div className="text-center py-10 text-red-600">حدث خطأ في تحميل الفواتير.</div></Layout>;
  }

  const { billings, totalAmount, pagination } = data;

  const handleOpenPaymentDialog = (billingId: number) => {
    setPaymentBillingId(billingId);
    setPaymentDialogOpen(true);
  };
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">فواتير غير مدفوعة (نقاط البيع)</h1>
        <p className="text-red-600 font-semibold">إجمالي الفواتير المطلوبة: {totalAmount} ش</p>

        {billings.length === 0 ? (
          <div className="text-gray-400">لا توجد فواتير.</div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {billings.map((billing: PointBilling) => (
              <AccordionItem key={billing.id} value={`billing-${billing.id}`} className="border rounded-lg">
                {!billing.isPaid && (
                  <div className="bg-red-100 text-red-700 font-bold text-sm px-4 py-2 rounded-t-lg text-left">
                    🔺 مطلوب الدفع
                  </div>
                )}
                {billing.isPaid && (
                  <div className="bg-green-100 text-green-700 font-bold text-sm px-4 py-2 rounded-t-lg text-left">
                    🟢 تم الدفع
                  </div>
                )}
                <AccordionTrigger className="p-4 justify-between text-right">
                  <div>
                    <p className="font-bold mb-1">{billing.salesPoint.name}</p>
                    <p className="font-medium">
                      تاريخ الفاتورة{" "}
                      {format(new Date(billing.date), "yyyy-MM-dd, HH:mm")}
                    </p>

                    <p className={`text-sm ${billing.isPaid ? "text-green-600" : "text-red-500"}`}>
                      {billing.isPaid ? "مدفوعة" : "غير مدفوعة"}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-green-700 font-semibold">
                        الإجمالي: {billing.totalAmount} ش
                      </p>
                      <span className="text-black/40">|</span>
                      <p className="text-sm text-green-700 font-semibold">
                        المدفوع: {billing.paidAmount} ش
                      </p>

                        {
                          !billing.isPaid && (
                          <>
                            <span className="text-black/40">|</span>
                            <p className="text-sm text-red-700 font-semibold">
                              المتبقي: {billing.totalAmount - billing.paidAmount} ش
                            </p>
                          </>
                          )
                        }
                    </div>
                    {!billing.isPaid&&(<Button
                        className="mb-2 mt-3"
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenPaymentDialog(billing.id)
                        }}
                      >
                        تسديد
                      </Button>
                      )
                      
                    }
                    <Button
                      className="mb-2 mt-3"
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/sales-points/${billing.pointId}/report`)
                      }}
                    >
                      عرض تقرير المشترك
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50 space-y-3">
                    <UICard className="p-3 space-y-1">
                      <p><span className="text-gray-600">البطاقة:</span> {billing.card.label}</p>
                      <p><span className="text-gray-600">عدد البطاقات:</span> {billing.cardsCount}</p>
                      <p><span className="text-gray-600">السرعة:</span> {billing.card.speed}</p>
                      <p><span className="text-gray-600">عدد الساعات:</span> {billing.card.hours}</p>
                      <p><span className="text-gray-600">سعر البطاقة "للبيع":</span> {billing.card.price} ش</p>
                    </UICard>
                  </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Pagination controls */}
        <Pagination 
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
      </div>
      {/* payment dialog */}
      <SalesPointBillingPaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        paymentBillingId={paymentBillingId}
        onSuccess={()=>{
          queryClient.invalidateQueries({
            queryKey: ["point-collection-billings", page]
          });
        }}
      />
    </Layout>
  );
};

export default PoinCollectionBillings;
