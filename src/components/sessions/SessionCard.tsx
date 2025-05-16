// components/sessions/SessionCard.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Session } from "@/types";
import React from "react";

// interface Session {
//   id: string;
//   client: string;
//   startTime: string;
//   endTime: string | null;
//   status: "open" | "closed";
//   orders: number;
//   totalDue: number;
// }

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
  return (
    <Card className="p-4">
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
          {/* <div>
            <p className="text-gray-500">الطلبات</p>
            <p className="font-medium">{session.orders} طلب</p>
          </div> */}
          {/* <div>
            <p className="text-gray-500">المبلغ</p>
            <p className="font-medium">${session.totalDue}</p>
          </div> */}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onViewOrders}>
            عرض الطلبات
          </Button>
          {session.isActive && (
            <Button variant="default" size="sm" onClick={onCloseSession}>
              إغلاق الجلسة
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;
