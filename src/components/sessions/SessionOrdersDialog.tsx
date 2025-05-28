import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/api/orders.api";
import { Order } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  sessionId: number;
};

const SessionOrdersDialog = ({ open, onClose, sessionId }: Props) => {
    // get orders
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [`session-${sessionId}-orders`],
        queryFn: ()=>fetchOrders(sessionId),
        initialData:{
        orders:[]
        }
    });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>طلبات الجلسة #{sessionId}</DialogTitle>
        </DialogHeader>

        {data.orders.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto text-sm">
            {data.orders.map((order: Order) => (
              <div key={order.id} className="border p-2 rounded">
                <p><span className="text-gray-600">نوع الطلب:</span> {
                        order.type === 'OTHER'
                        ? order.otherOrder.title
                        : order.type === 'CHARGING'
                        ? "شحن"
                        : order.type === 'CARD'
                        ? "بطاقة إنترنت"
                        : order.type
                }</p>
                <p><span className="text-gray-600">السعر:</span> {order.price} ش</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">لا توجد طلبات لهذه الجلسة.</p>
        )}

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>إغلاق</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionOrdersDialog;
