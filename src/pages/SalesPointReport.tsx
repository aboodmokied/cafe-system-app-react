import { useState } from "react";
import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fetchSalesPointReport } from "@/api/point.api";
import { PointBilling } from "@/types";
import { SalesPointBillingPaymentDialog } from "@/components/sales-point/SalesPointBillingPaymentDialog";
import Pagination from "@/components/layout/Pagination";

const SalesPointReport = () => {
  const [paymentBillingId, setPaymentBillingId] = useState<number | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div className="text-red-500">لا يوجد معرف نقطة بيع.</div>;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`sales-point-${id}-report`,page],
    queryFn: () => fetchSalesPointReport(+id,page,limit),
  });

  const handleOpenPaymentDialog = (billingId: number) => {
    setPaymentBillingId(billingId);
    setPaymentDialogOpen(true);
  };

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
          حدث خطأ أثناء تحميل البيانات:{" "}
          {(error as any).response?.data?.message || error.message || "خطأ غير معروف"}
        </div>
      </Layout>
    );
  }

  const { salesPoint } = data;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">تقرير نقطة البيع</h1>

        <UICard className="p-4 space-y-2">
          <p><span className="text-gray-600">اسم نقطة البيع:</span> {salesPoint.name}</p>
          <p><span className="text-gray-600">رقم الهاتف:</span> {salesPoint.phone}</p>
          <p className="font-semibold text-red-600">المبلغ المستحق: {salesPoint.pointTotalAmount} ش</p>
        </UICard>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">الفواتير</h2>
          {salesPoint.pointBillings.length === 0 ? (
            <div className="text-gray-400 text-center">لا توجد فواتير.</div>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {salesPoint.pointBillings.map((billing: PointBilling) => (
                <AccordionItem key={billing.id} value={`billing-${billing.id}`} className="border rounded-lg">
                  <AccordionTrigger className="p-4 justify-between text-right">
                    <div>
                      <p className="font-bold mb-1">{billing.id}#</p>
                      <p className="font-medium">تاريخ الفاتورة: {format(new Date(billing.date), "yyyy-MM-dd, HH:mm")}</p>
                      <p className={`text-sm ${billing.isPaid ? "text-green-600" : "text-red-500"}`}>
                        {billing.isPaid ? "مدفوعة" : "غير مدفوعة"}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-700 font-semibold">الإجمالي: {billing.totalAmount} ش</p>
                        <span className="text-black/40">|</span>
                        <p className="text-sm text-green-700 font-semibold">المدفوع: {billing.paidAmount} ش</p>
                        {!billing.isPaid && (
                          <>
                            <span className="text-black/40">|</span>
                            <p className="text-sm text-red-700 font-semibold">
                              المتبقي: {billing.totalAmount - billing.paidAmount} ش
                            </p>
                          </>
                        )}
                      </div>
                      {!billing.isPaid && (
                        <Button
                          className="mb-2 mt-3"
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPaymentDialog(billing.id);
                          }}
                        >
                          تسديد
                        </Button>
                      )}
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
        </div>
      </div>
      {/* pagination controll */}
      <Pagination
        page={page}
        setPage={setPage}
        pagination={data.pagination}
      />
      {/* payment dialog */}
      <SalesPointBillingPaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        paymentBillingId={paymentBillingId}
        onSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: [`sales-point-${id}-report`],
          });
        }}
      />
    </Layout>
  );
};

export default SalesPointReport;
