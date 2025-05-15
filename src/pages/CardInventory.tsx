
import React from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const CardInventory = () => {
  // Sample card inventory data
  const cardCategories = [
    { 
      type: "Internet Cards", 
      total: 120, 
      variants: [
        { name: "2-Hour Card", quantity: 45, price: 5 },
        { name: "4-Hour Card", quantity: 35, price: 8 },
        { name: "8-Hour Card", quantity: 40, price: 15 }
      ]
    },
    { 
      type: "Prepaid Cards", 
      total: 85, 
      variants: [
        { name: "Weekend Pass", quantity: 30, price: 20 },
        { name: "Daily Pass", quantity: 25, price: 12 },
        { name: "VIP Access", quantity: 30, price: 25 }
      ]
    },
    { 
      type: "Subscription Cards", 
      total: 30, 
      variants: [
        { name: "Monthly Card", quantity: 15, price: 50 },
        { name: "Weekly Card", quantity: 15, price: 15 }
      ]
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Card Inventory</h1>
          <Button className="gap-2">
            <PlusCircle size={16} />
            Add New Card
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardCategories.map((category, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="text-lg font-medium mb-2">{category.type}</h3>
              <p className="text-sm text-gray-500 mb-4">Total: {category.total} cards</p>
              
              <div className="space-y-3">
                {category.variants.map((variant, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div>
                      <p className="font-medium">{variant.name}</p>
                      <p className="text-sm text-gray-500">${variant.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{variant.quantity}</p>
                      <p className="text-sm text-gray-500">in stock</p>
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
