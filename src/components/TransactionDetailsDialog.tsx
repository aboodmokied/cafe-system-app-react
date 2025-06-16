// components/revenue/RevenueDetailsDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Props {
  transaction: any | null;
  onClose: () => void;
}

const TransactionDetailsDialog: React.FC<Props> = ({ transaction, onClose }) => {
  return (
    <Dialog open={!!transaction} onOpenChange={onClose}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>تفاصيل المستخدم</DialogTitle>
        </DialogHeader>
        {transaction && (
          <div className="text-sm space-y-2 text-right">
            <p>
              <span className="text-gray-500">التاريخ:</span>{" "}
              {format(new Date(transaction.date), "yyyy-MM-dd HH:mm")}
            </p>
            <p>
              <span className="text-gray-500">المصدر:</span>{" "}
              {transaction.type === "SUBSCRIPER"
                ? "من مشترك"
                : transaction.type === "GUEST"
                ? "من زائر"
                : "من نقطة بيع"}
            </p>
            <p>
              <span className="text-gray-500">الإجمالي:</span>{" "}
              <span className="text-green-600 font-bold">{transaction.amount} ش</span>
            </p>
            {/* يمكنك إضافة بيانات إضافية هنا إن وجدت */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsDialog;
