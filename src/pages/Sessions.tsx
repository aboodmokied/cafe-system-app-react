// pages/sessions.tsx
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SessionCard from "@/components/sessions/SessionCard";
import NewSessionDialog from "@/components/sessions/NewSessionDialog";
import OrdersDialog from "@/components/sessions/OrdersDialog";
import { closeSession, fetchSessions, openNewSession } from "@/api/sessions.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Session } from "@/types";
import { Loader2 } from "lucide-react"; // For spinner icon
import Pagination from "@/components/layout/Pagination";
import SessionOrdersDialog from "@/components/sessions/SessionOrdersDialog";


const SessionsPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('open');
  const limit = 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['sessions',page,status],
    queryFn: ()=>fetchSessions(page,limit,status)
  });

      

  const [ordersDialogOpen, setOrdersDialogOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

  const openOrders = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    setOrdersDialogOpen(true);
  };


  const handleCloseSession = (sessionId: number) => {
    // implementation coming soon
  };


  const onTabChange=(newTab:string)=>{
    setPage(1);
    setStatus(newTab);
  }

  const selectedSession = data?.sessions?.find((s) => s.id === selectedSessionId);

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


  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <NewSessionDialog />
          <h1 className="text-2xl font-bold">الجلسات</h1>
        </div>

        <Tabs value={status} onValueChange={onTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="open">مفتوحة</TabsTrigger>
            <TabsTrigger value="closed">مغلقة</TabsTrigger>
            <TabsTrigger value="all">الكل</TabsTrigger>
          </TabsList>

          <TabsContent value={status} className="space-y-4">
            {data.sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewOrders={() => openOrders(session.id)}
                onCloseSession={() =>{
                  queryClient.invalidateQueries({ queryKey: ['sessions',page,status] });
                }
              }
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        pagination={data.pagination}
      />    
      {selectedSession && selectedSession.isActive &&(
        <OrdersDialog
          open={ordersDialogOpen}
          sessionId={selectedSession.id}
          onClose={() => setOrdersDialogOpen(false)}
        />
        )
      }

      {selectedSession && !selectedSession.isActive &&(
        <SessionOrdersDialog
          open={ordersDialogOpen}
          sessionId={selectedSession.id}
          onClose={() => setOrdersDialogOpen(false)}
        />
        )
      }
    </Layout>
  );
};

export default SessionsPage;
