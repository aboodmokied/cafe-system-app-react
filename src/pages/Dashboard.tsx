
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
      title: "Card Inventory", 
      value: "235", 
      description: "Cards in stock", 
      icon: <CreditCard className="text-purple-500" size={24} /> 
    },
    { 
      title: "Active Subscriptions", 
      value: "72", 
      description: "Subscribers", 
      icon: <Users className="text-blue-500" size={24} /> 
    },
    { 
      title: "Open Sessions", 
      value: "18", 
      description: "Currently active", 
      icon: <Clock className="text-green-500" size={24} /> 
    },
    { 
      title: "Today's Sales", 
      value: "$1,245", 
      description: "24 transactions", 
      icon: <ShoppingCart className="text-orange-500" size={24} /> 
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Sessions</h3>
            <p className="text-gray-500">No sessions data available yet.</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
            <p className="text-gray-500">No sales data available yet.</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
