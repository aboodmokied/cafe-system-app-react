
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Search } from "lucide-react";

const Subscriptions = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample subscription data
  const subscriptions = [
    {
      id: 1,
      name: "أحمد محمد",
      type: "شهري",
      startDate: "2025-04-15",
      endDate: "2025-05-15",
      status: "نشط",
      sessionsAttended: 12,
      amountDue: 0
    },
    {
      id: 2,
      name: "فاطمة علي",
      type: "أسبوعي",
      startDate: "2025-05-10",
      endDate: "2025-05-17",
      status: "نشط",
      sessionsAttended: 3,
      amountDue: 15
    },
    {
      id: 3,
      name: "عمر عبدالله",
      type: "شهري",
      startDate: "2025-04-01",
      endDate: "2025-05-01",
      status: "منتهي",
      sessionsAttended: 22,
      amountDue: 0
    },
    {
      id: 4,
      name: "ليلى حسن",
      type: "أسبوعي",
      startDate: "2025-05-08",
      endDate: "2025-05-15",
      status: "نشط",
      sessionsAttended: 2,
      amountDue: 0
    }
  ];

  const filteredSubscriptions = activeTab === "all" 
    ? subscriptions 
    : subscriptions.filter(sub => 
        activeTab === "monthly" ? sub.type === "شهري" : sub.type === "أسبوعي"
      );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Button className="gap-2">
            <PlusCircle size={16} />
            اشتراك جديد
          </Button>
          <h1 className="text-2xl font-bold">الاشتراكات</h1>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="pr-10 pl-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="البحث عن المشتركين..."
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="monthly">شهري</TabsTrigger>
            <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <Card key={subscription.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-center">
                    <Button variant="outline" size="sm">عرض التفاصيل</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">المبلغ المستحق</p>
                      <p className="font-medium">{subscription.amountDue} ر.س</p>
                    </div>
                    <div>
                      <p className="text-gray-500">الجلسات</p>
                      <p className="font-medium">{subscription.sessionsAttended}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">تاريخ الانتهاء</p>
                      <p className="font-medium">{new Date(subscription.endDate).toLocaleDateString('ar-SA')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">تاريخ البدء</p>
                      <p className="font-medium">{new Date(subscription.startDate).toLocaleDateString('ar-SA')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">{subscription.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span className="capitalize">{subscription.type}</span>
                      <span>•</span>
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        subscription.status === 'نشط' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span>{subscription.status}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Subscriptions;
