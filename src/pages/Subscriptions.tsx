
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
      name: "Ahmed Mohammed",
      type: "Monthly",
      startDate: "2025-04-15",
      endDate: "2025-05-15",
      status: "active",
      sessionsAttended: 12,
      amountDue: 0
    },
    {
      id: 2,
      name: "Fatima Ali",
      type: "Weekly",
      startDate: "2025-05-10",
      endDate: "2025-05-17",
      status: "active",
      sessionsAttended: 3,
      amountDue: 15
    },
    {
      id: 3,
      name: "Omar Abdullah",
      type: "Monthly",
      startDate: "2025-04-01",
      endDate: "2025-05-01",
      status: "expired",
      sessionsAttended: 22,
      amountDue: 0
    },
    {
      id: 4,
      name: "Layla Hassan",
      type: "Weekly",
      startDate: "2025-05-08",
      endDate: "2025-05-15",
      status: "active",
      sessionsAttended: 2,
      amountDue: 0
    }
  ];

  const filteredSubscriptions = activeTab === "all" 
    ? subscriptions 
    : subscriptions.filter(sub => 
        activeTab === "monthly" ? sub.type === "Monthly" : sub.type === "Weekly"
      );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <Button className="gap-2">
            <PlusCircle size={16} />
            New Subscription
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="Search subscribers..."
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <Card key={subscription.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{subscription.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        subscription.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span className="capitalize">{subscription.status}</span>
                      <span>•</span>
                      <span>{subscription.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p className="font-medium">{new Date(subscription.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End Date</p>
                      <p className="font-medium">{new Date(subscription.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Sessions</p>
                      <p className="font-medium">{subscription.sessionsAttended}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount Due</p>
                      <p className="font-medium">${subscription.amountDue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button variant="outline" size="sm">View Details</Button>
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
