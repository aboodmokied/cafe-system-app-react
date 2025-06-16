import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Billing } from "@/types";
import { fetchCollectionBillings } from "@/api/billings.api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { BillingPaymentDialog } from "@/components/subscripers/BillingPaymentDialog";
import Pagination from "@/components/layout/Pagination";

const CollectionBillings = () => {
  const [page, setPage] = useState(1);
  const [paymentBillingId, setPaymentBillingId] = useState<number | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const limit = 20;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: [`collection-billings-${page}`, page],
    queryFn: () => fetchCollectionBillings(page, limit),
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
        <h1 className="text-2xl font-bold">فواتير غير مدفوعة (مشتركين)</h1>
        <p className="text-red-600 font-semibold">إجمالي الفواتير المطلوبة: {totalAmount} ش</p>

        {billings.length === 0 ? (
          <div className="text-gray-400">لا توجد فواتير.</div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {billings.map((billing: Billing) => (
              <AccordionItem key={billing.id} value={`billing-${billing.id}`} className="border rounded-lg">
                {!billing.isPaid && new Date(billing.endDate) < new Date() && (
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
                    <p className="font-bold mb-1">{billing.subscriper.username}</p>
                    <p className="font-medium">
                      الفاتورة من{" "}
                      {format(new Date(billing.startDate), "yyyy-MM-dd, HH:mm")} إلى{" "}
                      {format(new Date(billing.endDate), "yyyy-MM-dd, HH:mm")}
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
                        navigate(`/subscripers/${billing.subscriperId}/report`)
                      }}
                    >
                      عرض تقرير المشترك
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50 space-y-3">
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
      <BillingPaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        paymentBillingId={paymentBillingId}
        onSuccess={()=>{
          queryClient.invalidateQueries({
            queryKey: [`collection-billings-${page}`]
          });
        }}
      />
    </Layout>
  );
};

export default CollectionBillings;
