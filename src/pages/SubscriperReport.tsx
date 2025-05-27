import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
// import SessionOrdersDialog from "./SessionOrdersDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SubscriperReport = () => {
  const [expandedBillingId, setExpandedBillingId] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showOrdersDialog, setShowOrdersDialog] = useState(false);

   const { id } = useParams<{ id: string }>();

  if (!id) return <div className="text-red-500">لا يوجد معرف مشترك.</div>;
  // بيانات وهمية للتجربة
  const subscriper = {
    id: 1,
    username: "محمد أحمد",
    email: "mohamed@example.com",
    phone: "01012345678",
    type: "شهري",
    totalPrice:19,
    billings: [
      {
        id: 101,
        startDate: "2025-04-01",
        endDate: "2025-04-30",
        isPaid: true,
        sessions: [
          {
            id: 1001,
            username: "جلسة الصباح",
            startAt: "2025-04-02 08:00",
            endAt: "2025-04-02 09:30",
            orders: [
              { id: 1, price: 50 },
              { id: 2, price: 30 },
            ],
          },
          {
            id: 1002,
            username: "جلسة المساء",
            startAt: "2025-04-04 19:00",
            endAt: null,
            orders: [],
          },
        ],
      },
      {
        id: 102,
        startDate: "2025-05-01",
        endDate: "2025-05-31",
        isPaid: false,
        sessions: [
          {
            id: 1003,
            username: "جلسة إضافية",
            startAt: "2025-05-05 10:00",
            endAt: "2025-05-05 11:00",
            orders: [{ id: 3, price: 40 }],
          },
        ],
      },
    ],
  };

   return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">تقرير المشترك</h1>

        <Card className="p-4 space-y-2">
          <p><span className="text-gray-600">اسم المستخدم:</span> {subscriper.username}</p>
          <p><span className="text-gray-600">البريد الإلكتروني:</span> {subscriper.email}</p>
          <p><span className="text-gray-600">رقم الهاتف:</span> {subscriper.phone}</p>
          <p><span className="text-gray-600">نوع الاشتراك:</span> {subscriper.type === "monthly" ? "شهري" : "أسبوعي"}</p>
          <p className="font-semibold text-green-600">الإجمالي المدفوع: {subscriper.totalPrice} ش</p>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">الفواتير</h2>
          {subscriper.billings.length === 0 ? (
            <div className="text-gray-400 text-center">لا توجد فواتير.</div>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {subscriper.billings.map((billing: any) => (
                <AccordionItem key={billing.id} value={`billing-${billing.id}`} className="border rounded-lg">
                  <AccordionTrigger className="p-4 justify-between text-right">
                    <div>
                      <p className="font-medium">
                        الفاتورة من{" "}
                        {new Date(billing.startDate).toLocaleDateString()} إلى{" "}
                        {new Date(billing.endDate).toLocaleDateString()}
                      </p>
                      <p className={`text-sm ${billing.isPaid ? "text-green-600" : "text-red-500"}`}>
                        {billing.isPaid ? "مدفوعة" : "غير مدفوعة"}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-gray-50 space-y-3">
                    {billing.sessions.length === 0 ? (
                      <div className="text-sm text-gray-400">لا توجد جلسات.</div>
                    ) : (
                      billing.sessions.map((session: any) => (
                        <Card key={session.id} className="p-3 space-y-1">
                          <p><span className="text-gray-600">id:</span> {session.id}</p>
                          <p><span className="text-gray-600">تاريخ البدء:</span> {new Date(session.startAt).toLocaleString()}</p>
                          <p><span className="text-gray-600">الحالة:</span> {session.isActive ? "نشطة" : "منتهية"}</p>
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              setSelectedSession(session);
                            //   setOpenOrdersDialog(true);
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

      {/* <SessionOrdersDialog
        open={openOrdersDialog}
        onOpenChange={setOpenOrdersDialog}
        session={selectedSession}
      /> */}
    </Layout>
  );
//   return (
//     <div className="space-y-6">
//       {/* معلومات المشترك */}
//       <Card className="p-4">
//         <h2 className="text-xl font-bold mb-2">بيانات المشترك</h2>
//         <p><strong>الاسم:</strong> {subscriper.username}</p>
//         <p><strong>البريد:</strong> {subscriper.email}</p>
//         <p><strong>الهاتف:</strong> {subscriper.phone}</p>
//         <p><strong>نوع الاشتراك:</strong> {subscriper.type}</p>
//       </Card>
      
//     {/* إجمالي السعر */}
//         <Card className="p-4">
//             <h2 className="text-xl font-bold mb-2">الإجمالي الكلي للطلبات</h2>
//             <p className="text-lg font-medium text-green-600">{subscriper.totalPrice} ش</p>
//         </Card>  
//       {/* الفواتير */}
//       {subscriper.billings.map((billing) => (
//         <Card key={billing.id} className="p-4 space-y-2">
//           <div className="flex justify-between items-center">
//             <div>
//               <p><strong>الفاتورة #{billing.id}</strong></p>
//               <p><strong>من:</strong> {billing.startDate}</p>
//               <p><strong>إلى:</strong> {billing.endDate}</p>
//               <p><strong>مدفوعة:</strong> {billing.isPaid ? "نعم" : "لا"}</p>
//             </div>
//             <Button
//               variant="outline"
//               onClick={() =>
//                 setExpandedBillingId(expandedBillingId === billing.id ? null : billing.id)
//               }
//             >
//               {expandedBillingId === billing.id ? (
//                 <>
//                   <ChevronUp size={16} />
//                   إخفاء الجلسات
//                 </>
//               ) : (
//                 <>
//                   <ChevronDown size={16} />
//                   عرض الجلسات
//                 </>
//               )}
//             </Button>
//           </div>

//           {/* الجلسات */}
//           {expandedBillingId === billing.id && (
//             <div className="space-y-2 border-t pt-3">
//               {billing.sessions.map((session) => (
//                 <div key={session.id} className="border rounded p-3">
//                   <p><strong>الاسم:</strong> {session.username}</p>
//                   <p><strong>البداية:</strong> {session.startAt}</p>
//                   <p><strong>النهاية:</strong> {session.endAt || "جارٍ..."}</p>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => {
//                       setSelectedSession(session);
//                       setShowOrdersDialog(true);
//                     }}
//                   >
//                     عرض الطلبات
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       ))}

//       {/* نافذة منبثقة لعرض الطلبات */}
//       {/* {selectedSession && (
//         <SessionOrdersDialog
//           open={showOrdersDialog}
//           onOpenChange={setShowOrdersDialog}
//           session={selectedSession}
//         />
//       )} */}
//     </div>
//   );
};

export default SubscriperReport;
