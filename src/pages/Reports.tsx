
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, FileText } from "lucide-react";

const Reports = () => {
  const [dateRange, setDateRange] = useState("today");

  // Sample report data
  const salesData = [
    { 
      id: "T001", 
      date: "2025-05-15", 
      time: "10:15 AM", 
      items: ["Coffee (2)", "2-Hour Card (1)"], 
      staff: "Ahmed", 
      total: 12.00, 
      status: "paid" 
    },
    { 
      id: "T002", 
      date: "2025-05-15", 
      time: "11:30 AM", 
      items: ["Tea (1)", "Sandwich (1)", "4-Hour Card (1)"], 
      staff: "Fatima", 
      total: 15.50, 
      status: "paid" 
    },
    { 
      id: "T003", 
      date: "2025-05-14", 
      time: "4:45 PM", 
      items: ["Coffee (3)", "Cake (2)"], 
      staff: "Omar", 
      total: 18.50, 
      status: "unpaid" 
    }
  ];

  const todayData = salesData.filter(item => item.date === "2025-05-15");
  const allData = salesData;

  const getReportData = () => {
    switch (dateRange) {
      case "today":
        return todayData;
      case "week":
      case "month":
      default:
        return allData;
    }
  };

  const calculateTotal = (data: typeof salesData) => {
    return data.reduce((total, item) => total + item.total, 0).toFixed(2);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar size={16} />
              Select Date Range
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
            <TabsTrigger value="sessions">Session Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-lg font-medium">Sales Summary</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={dateRange === "today" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDateRange("today")}
                  >
                    Today
                  </Button>
                  <Button 
                    variant={dateRange === "week" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDateRange("week")}
                  >
                    This Week
                  </Button>
                  <Button 
                    variant={dateRange === "month" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setDateRange("month")}
                  >
                    This Month
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-2xl font-bold">${calculateTotal(getReportData())}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="text-2xl font-bold">{getReportData().length}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Card Sales</p>
                  <p className="text-2xl font-bold">13</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2 font-medium">Transaction ID</th>
                      <th className="pb-2 font-medium">Date & Time</th>
                      <th className="pb-2 font-medium">Items</th>
                      <th className="pb-2 font-medium">Staff</th>
                      <th className="pb-2 font-medium">Total</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getReportData().map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="py-3 text-sm">{transaction.id}</td>
                        <td className="py-3 text-sm">{transaction.date}<br/>{transaction.time}</td>
                        <td className="py-3 text-sm">
                          <ul className="list-disc pl-4">
                            {transaction.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3 text-sm">{transaction.staff}</td>
                        <td className="py-3 text-sm">${transaction.total.toFixed(2)}</td>
                        <td className="py-3 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            transaction.status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm">
                          <Button variant="ghost" size="sm">
                            <FileText size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-6">Inventory Report</h2>
              <p className="text-gray-500">Inventory report content will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-6">Session Report</h2>
              <p className="text-gray-500">Session report content will be displayed here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
