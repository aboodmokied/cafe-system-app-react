
import React from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const CardInventory = () => {
  // Sample card inventory data
  const cardCategories = [
    { 
      type: "بطاقات الإنترنت", 
      total: 120, 
      variants: [
        { name: "بطاقة ٢ ساعة", quantity: 45, price: 5 },
        { name: "بطاقة ٤ ساعات", quantity: 35, price: 8 },
        { name: "بطاقة ٨ ساعات", quantity: 40, price: 15 }
      ]
    },
    { 
      type: "بطاقات مسبقة الدفع", 
      total: 85, 
      variants: [
        { name: "تصريح نهاية الأسبوع", quantity: 30, price: 20 },
        { name: "تصريح يومي", quantity: 25, price: 12 },
        { name: "دخول VIP", quantity: 30, price: 25 }
      ]
    },
    { 
      type: "بطاقات الاشتراك", 
      total: 30, 
      variants: [
        { name: "بطاقة شهرية", quantity: 15, price: 50 },
        { name: "بطاقة أسبوعية", quantity: 15, price: 15 }
      ]
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button className="gap-2">
            <PlusCircle size={16} />
            إضافة بطاقة جديدة
          </Button>
          <h1 className="text-2xl font-bold">بطاقات المخزون</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardCategories.map((category, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="text-lg font-medium mb-2">{category.type}</h3>
              <p className="text-sm text-gray-500 mb-4">الإجمالي: {category.total} بطاقة</p>
              
              <div className="space-y-3">
                {category.variants.map((variant, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div className="text-right">
                      <p className="font-medium">{variant.quantity}</p>
                      <p className="text-sm text-gray-500">متوفر</p>
                    </div>
                    <div>
                      <p className="font-medium">{variant.name}</p>
                      <p className="text-sm text-gray-500">{variant.price} ر.س</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CardInventory;
