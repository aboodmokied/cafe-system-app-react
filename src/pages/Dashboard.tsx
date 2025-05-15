
import React from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { 
  CreditCard, 
  Users, 
  Clock, 
  ShoppingCart 
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    { 
      title: "بطاقات المخزون", 
      value: "235", 
      description: "البطاقات المتوفرة", 
      icon: <CreditCard className="text-purple-500" size={24} /> 
    },
    { 
      title: "الاشتراكات النشطة", 
      value: "72", 
      description: "المشتركين", 
      icon: <Users className="text-blue-500" size={24} /> 
    },
    { 
      title: "الجلسات المفتوحة", 
      value: "18", 
      description: "نشطة حالياً", 
      icon: <Clock className="text-green-500" size={24} /> 
    },
    { 
      title: "مبيعات اليوم", 
      value: "١٢٤٥ ر.س", 
      description: "٢٤ معاملة", 
      icon: <ShoppingCart className="text-orange-500" size={24} /> 
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">نظرة عامة على لوحة التحكم</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between">
                <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">الجلسات الأخيرة</h3>
            <p className="text-gray-500">لا توجد بيانات جلسات متاحة حالياً.</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">المبيعات الأخيرة</h3>
            <p className="text-gray-500">لا توجد بيانات مبيعات متاحة حالياً.</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
