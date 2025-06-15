// components/sessions/SessionCard.tsx
import { closeSession } from "@/api/sessions.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Session } from "@/types";
import { useMutation } from "@tanstack/react-query";
import React from "react";


interface Props {
  session: Session;
  onViewOrders: () => void;
  onCloseSession?: () => void;
}

const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();

const SessionCard: React.FC<Props> = ({ session, onViewOrders, onCloseSession }) => {
  // close session
  const {mutate,isPending} = useMutation({
    mutationFn: (sessionId: number) => closeSession(sessionId),
    onSuccess: () => {
      toast({
        title: "تم إغلاق الجلسة",
        description: `تم إغلاق الجلسة رقم ${session.id} بنجاح.`,
        variant: "default",
      });
      onCloseSession?.();
    },
    onError: (err:any) => {
      const message =
        err?.response?.data?.message?.[0] ||
        err?.response?.data?.message ||
        err?.message ||
        "حدث خطأ أثناء إغلاق الجلسة.";

      toast({
        title: "خطأ في إغلاق الجلسة",
        description: message,
        variant: "destructive",
      });
    },
  });
  return (
    <Card className="p-4" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">{session.id}</h3>
            <span
              className={`${
                session.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              } text-xs px-2 py-1 rounded-full`}
            >
              {session.isActive ? "مفتوحة" : "مغلقة"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{session.username}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <p className="text-gray-500">التاريخ</p>
            <p className="font-medium">{formatDate(session.startAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">الوقت</p>
            <p className="font-medium">
              {formatTime(session.startAt)}
              {session.endAt ? ` - ${formatTime(session.endAt)}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onViewOrders}>
            عرض الطلبات
          </Button>
          {session.isActive && (
            <Button variant="default" disabled={isPending} size="sm" onClick={()=>mutate(session.id)}>
              إغلاق الجلسة
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;
