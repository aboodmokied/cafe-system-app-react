// pages/sessions.tsx
// export interface Session {
//   id: string;
//   username: string;
//   clientType:"GUEST"|"SUBSCRIPER";
//   startAt: string;
//   endAt: string | null;
//   isActive:boolean;

//   // status: "open" | "closed";
//   // orders: Order[];
// }
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SessionCard from "@/components/sessions/SessionCard";
import NewSessionDialog from "@/components/sessions/NewSessionDialog";
import OrdersDialog from "@/components/sessions/OrdersDialog";
import { fetchSessions, openNewSession } from "@/api/sessions.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Session } from "@/types";
import { Loader2 } from "lucide-react"; // For spinner icon

interface Order {
  type: string;
  price: number;
}

const SessionsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions
  });

  const mutation = useMutation({
    mutationFn: openNewSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    }
  });

  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const openOrders = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setOrdersDialogOpen(true);
  };

  const addSession = (newSession: Pick<Session, "username" | "clientType">) => {
    if (!newSession.clientType || !newSession.username) return;
    mutation.mutate(newSession);
  };

  const closeSession = (sessionId: string) => {
    // implementation coming soon
  };

  const updateSessionOrders = (sessionId: string, newOrders: Order[]) => {
    // implementation coming soon
  };

  const totalDue = (orders: Order[]) =>
    orders.reduce((acc, o) => acc + o.price, 0);

  const selectedSession = data?.sessions.find((s) => s.id === selectedSessionId);

  // Loading UI
  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">جاري تحميل الجلسات...</p>
        </div>
      </Layout>
    );
  }

  // Error UI
  if (isError) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <p className="text-destructive text-lg font-semibold">حدث خطأ أثناء تحميل الجلسات</p>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      </Layout>
    );
  }

  const openSessions = data.sessions.filter((s) => s.isActive);
  const closedSessions = data.sessions.filter((s) => !s.isActive);

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
                session={session}
                onViewOrders={() => openOrders(session.id)}
                onCloseSession={() => closeSession(session.id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {closedSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewOrders={() => openOrders(session.id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {data.sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewOrders={() => openOrders(session.id)}
                onCloseSession={() =>
                  session.isActive && closeSession(session.id)
                }
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Future: Orders Dialog */}
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
