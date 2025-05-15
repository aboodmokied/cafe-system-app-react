
import React from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

const Sessions = () => {
  // Sample sessions data
  const sessions = [
    {
      id: "S001",
      client: "Ahmed Mohammed (Subscriber)",
      startTime: "2025-05-15T10:00:00",
      endTime: null,
      status: "open",
      orders: 3,
      totalDue: 45
    },
    {
      id: "S002",
      client: "Fatima Ali (Subscriber)",
      startTime: "2025-05-15T11:30:00",
      endTime: null,
      status: "open",
      orders: 1,
      totalDue: 15
    },
    {
      id: "S003",
      client: "Guest User",
      startTime: "2025-05-15T09:15:00",
      endTime: "2025-05-15T12:30:00",
      status: "closed",
      orders: 4,
      totalDue: 60
    },
    {
      id: "S004",
      client: "Omar Abdullah (Subscriber)",
      startTime: "2025-05-14T16:00:00",
      endTime: "2025-05-14T19:45:00",
      status: "closed",
      orders: 5,
      totalDue: 78
    }
  ];

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const openSessions = sessions.filter(session => session.status === "open");
  const closedSessions = sessions.filter(session => session.status === "closed");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Sessions</h1>
          <Button className="gap-2">
            <PlusCircle size={16} />
            New Session
          </Button>
        </div>

        <Tabs defaultValue="open" className="space-y-4">
          <TabsList>
            <TabsTrigger value="open">
              Open Sessions ({openSessions.length})
            </TabsTrigger>
            <TabsTrigger value="closed">
              Closed Sessions ({closedSessions.length})
            </TabsTrigger>
            <TabsTrigger value="all">All Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="space-y-4">
            {openSessions.map(session => (
              <Card key={session.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{session.id}</h3>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Open
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{session.client}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Time</p>
                      <p className="font-medium">
                        {formatDate(session.startTime)} at {formatTime(session.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Orders</p>
                      <p className="font-medium">{session.orders} items</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount Due</p>
                      <p className="font-medium">${session.totalDue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View Orders</Button>
                    <Button variant="default" size="sm">Close Session</Button>
                  </div>
                </div>
              </Card>
            ))}
            {openSessions.length === 0 && (
              <p className="text-center text-gray-500 py-8">No open sessions found</p>
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {closedSessions.map(session => (
              <Card key={session.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{session.id}</h3>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        Closed
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{session.client}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Start Time</p>
                      <p className="font-medium">{formatTime(session.startTime)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End Time</p>
                      <p className="font-medium">{session.endTime && formatTime(session.endTime)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Orders</p>
                      <p className="font-medium">{session.orders} items</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p className="font-medium">${session.totalDue}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
            {closedSessions.length === 0 && (
              <p className="text-center text-gray-500 py-8">No closed sessions found</p>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {sessions.map(session => (
              <Card key={session.id} className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{session.id}</h3>
                      <span className={`${
                        session.status === 'open' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      } text-xs px-2 py-1 rounded-full`}>
                        {session.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{session.client}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(session.startTime)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-medium">
                        {formatTime(session.startTime)}
                        {session.endTime ? ` - ${formatTime(session.endTime)}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Orders</p>
                      <p className="font-medium">{session.orders} items</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">${session.totalDue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {session.status === 'open' && (
                      <Button variant="default" size="sm">Close Session</Button>
                    )}
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

export default Sessions;
