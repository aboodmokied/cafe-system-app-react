// pages/sessions.tsx
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SessionCard from "@/components/sessions/SessionCard";
import NewSessionDialog from "@/components/sessions/NewSessionDialog";
import OrdersDialog from "@/components/sessions/OrdersDialog";

interface Order {
  type: string;
  price: number;
}

enum ClientType{
  GUEST="GUEST",
  SUBSCRIPER="SUBSCRIPER"
}

export interface Session {
  id: string;
  username: string;
  clientType:"GUEST"|"SUBSCRIPER";
  startAt: string;
  endAt: string | null;
  isActive:boolean;

  // status: "open" | "closed";
  // orders: Order[];
}

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "S001",
      username: "أحمد محمد",
      startAt: "2025-05-15T10:00:00",
      endAt: null,
      isActive:true,
      clientType:'SUBSCRIPER'
      // orders: [
      //   { type: "طلب 1", price: 15 },
      //   { type: "طلب 2", price: 15 },
      //   { type: "طلب 3", price: 15 }
      // ]
    },
    {
      id: "S003",
      username: "مستخدم زائر",
      startAt: "2025-05-15T09:15:00",
      endAt: "2025-05-15T12:30:00",
      isActive:false,
      clientType:'GUEST'
      // orders: [
      //   { type: "طلب 1", price: 15 },
      //   { type: "طلب 2", price: 15 },
      //   { type: "طلب 3", price: 15 },
      //   { type: "طلب 4", price: 15 }
      // ]
    }
  ]);

  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const openOrders = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setOrdersDialogOpen(true);
  };

  const addSession = (newSession: Session) => {
    setSessions([newSession, ...sessions]);
  };

  const closeSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, status: "closed", endTime: new Date().toISOString() }
          : s
      )
    );
  };

  const updateSessionOrders = (sessionId: string, newOrders: Order[]) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, orders: newOrders } : s))
    );
  };

  const openSessions = sessions.filter((s) => s.isActive);
  const closedSessions = sessions.filter((s) => !s.isActive);

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  // حساب إجمالي المبلغ في بطاقة الجلسة
  const totalDue = (orders: Order[]) =>
    orders.reduce((acc, o) => acc + o.price, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">الجلسات</h1>
          <NewSessionDialog onAddSession={addSession} />
        </div>

        <Tabs defaultValue="open" className="space-y-4">
          <TabsList>
            <TabsTrigger value="open">مفتوحة ({openSessions.length})</TabsTrigger>
            <TabsTrigger value="closed">مغلقة ({closedSessions.length})</TabsTrigger>
            <TabsTrigger value="all">الكل</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="space-y-4">
            {openSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={{
                  ...session,
                  // orders: session.orders.length,
                  // totalDue: totalDue(session.orders)
                }}
                onViewOrders={() => openOrders(session.id)}
                onCloseSession={() => closeSession(session.id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {closedSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={{
                  ...session,
                  // orders: session.orders.length,
                  // totalDue: totalDue(session.orders)
                }}
                onViewOrders={() => openOrders(session.id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={{
                  ...session,
                  // orders: session.orders.length,
                  // totalDue: totalDue(session.orders)
                }}
                onViewOrders={() => openOrders(session.id)}
                onCloseSession={() =>
                  session.isActive && closeSession(session.id)
                }
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* {selectedSession && (
        <OrdersDialog
          open={ordersDialogOpen}
          session={selectedSession}
          onClose={() => setOrdersDialogOpen(false)}
          orders={selectedSession.orders}
          onUpdateSessionOrders={(newOrders) =>
            updateSessionOrders(selectedSession.id, newOrders)
          }
        />
      )} */}
    </Layout>
  );
};

export default SessionsPage;
