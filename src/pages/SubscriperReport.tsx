import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
// import SessionOrdersDialog from "./SessionOrdersDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Billing, Session, SubscriperReportResponse } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSubscriperReport } from "@/api/subscriper.api";
import SessionOrdersDialog from "@/components/sessions/SessionOrdersDialog";
import { BillingPaymentDialog } from "@/components/subscripers/BillingPaymentDialog";

const SubscriperReport = () => {
  const [paymentBillingId, setPaymentBillingId] = useState<number | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [showOrdersDialog, setShowOrdersDialog] = useState(false);
  const [paymentDialogBillingId, setPaymentDialogBillingId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div className="text-red-500">لا يوجد معرف مشترك.</div>;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`subscriper-${id}-report`],
    queryFn: () => fetchSubscriperReport(+id),
  });

  // When opening the dialog:
  const handleOpenPaymentDialog = (billingId: number) => {
    setPaymentBillingId(billingId);
    setPaymentDialogOpen(true);
  };

  // ✅ عرض أثناء التحميل
  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-10 text-blue-600 font-semibold">جاري تحميل التقرير...</div>
      </Layout>
    );
  }

  // ❌ في حال حدوث خطأ
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

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">تقرير المشترك</h1>

        <Card className="p-4 space-y-2">
          <p><span className="text-gray-600">اسم المستخدم:</span> {data.subscriper.username}</p>
          <p><span className="text-gray-600">البريد الإلكتروني:</span> {data.subscriper.email}</p>
          <p><span className="text-gray-600">رقم الهاتف:</span> {data.subscriper.phone}</p>
          <p><span className="text-gray-600">نوع الاشتراك:</span> {data.subscriper.type === "monthly" ? "شهري" : "أسبوعي"}</p>
          <p className="font-semibold text-red-600">المبلغ المستحق: {data.subscriper.subscriperTotalAmount} ش</p>
        </Card>
        

        <div className="space-y-4">
          <h2 className="text-xl font-bold">الفواتير</h2>
          {data.subscriper.billings.length === 0 ? (
            <div className="text-gray-400 text-center">لا توجد فواتير.</div>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {data.subscriper.billings.map((billing: Billing) => (
                <AccordionItem key={billing.id} value={`billing-${billing.id}`} className="border rounded-lg">
                  <AccordionTrigger className="p-4 justify-between text-right">
                    <div>
                      <p className="font-bold mb-1">{billing.id}#</p>
                      <p className="font-medium">
                        الفاتورة من{" "}
                        {new Date(billing.startDate).toLocaleDateString()} إلى{" "}
                        {new Date(billing.endDate).toLocaleDateString()}
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
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-gray-50 space-y-3">
                    {billing.sessions.length === 0 ? (
                      <div className="text-sm text-gray-400">لا توجد جلسات.</div>
                    ) : (
                      billing.sessions.map((session: Session) => (
                        <Card key={session.id} className="p-3 space-y-1">
                          <p><span className="text-gray-600">id:</span> {session.id}</p>
                          <p><span className="text-gray-600">تاريخ البدء:</span> {new Date(session.startAt).toLocaleString()}</p>
                          <p><span className="text-gray-600">الحالة:</span> {session.isActive ? "نشطة" : "منتهية"}</p>
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              setSelectedSessionId(session.id);
                              setShowOrdersDialog(true);
                            }}
                          >
                            عرض الطلبات
                          </Button>
                        </Card>
                      ))
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
      {/* payment dialog */}
      <BillingPaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        paymentBillingId={paymentBillingId}
        onSuccess={()=>{
          queryClient.invalidateQueries({
            queryKey: [`subscriper-${id}-report`]
          });
        }}
      />
      <SessionOrdersDialog
        open={showOrdersDialog}
        onClose={() => setShowOrdersDialog(false)}
        sessionId={selectedSessionId}
      />
    </Layout>
  );
};


export default SubscriperReport;
