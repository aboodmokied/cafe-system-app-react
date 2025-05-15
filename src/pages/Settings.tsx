
import React from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الإعدادات</h1>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="users">المستخدمين والصلاحيات</TabsTrigger>
            <TabsTrigger value="system">النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">معلومات المقهى</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cafe-name">اسم المقهى</Label>
                    <Input id="cafe-name" placeholder="أدخل اسم المقهى" defaultValue="المقهى العربي" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">اسم المالك</Label>
                    <Input id="owner-name" placeholder="أدخل اسم المالك" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input id="address" placeholder="أدخل العنوان" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">رقم الاتصال</Label>
                    <Input id="contact" placeholder="أدخل رقم الاتصال" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="أدخل البريد الإلكتروني" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">الرقم الضريبي</Label>
                    <Input id="tax-id" placeholder="أدخل الرقم الضريبي" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">ساعات العمل</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="opening-time">وقت الافتتاح</Label>
                    <Input id="opening-time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closing-time">وقت الإغلاق</Label>
                    <Input id="closing-time" type="time" defaultValue="22:00" />
                  </div>
                </div>
              </div>

              <Button>حفظ التغييرات</Button>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">إدارة المستخدمين</h2>
                <p className="text-gray-500">سيتم عرض إعدادات إدارة المستخدمين هنا.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">تفضيلات النظام</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Switch id="auto-backup" />
                    <div className="space-y-0.5 text-right">
                      <Label htmlFor="auto-backup">النسخ الاحتياطي التلقائي</Label>
                      <p className="text-sm text-gray-500">تمكين النسخ الاحتياطي التلقائي اليومي</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Switch id="notifications" />
                    <div className="space-y-0.5 text-right">
                      <Label htmlFor="notifications">إشعارات البريد الإلكتروني</Label>
                      <p className="text-sm text-gray-500">تلقي تقارير المبيعات اليومية عبر البريد الإلكتروني</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Switch id="dark-mode" />
                    <div className="space-y-0.5 text-right">
                      <Label htmlFor="dark-mode">الوضع الداكن</Label>
                      <p className="text-sm text-gray-500">استخدام السمة الداكنة للتطبيق</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
