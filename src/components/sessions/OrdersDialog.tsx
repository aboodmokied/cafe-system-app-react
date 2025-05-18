// components/sessions/OrdersDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AddOrderDialog from "./AddOrderDialog";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/api/orders.api";



interface Props {
  open: boolean;
  sessionId: number;
  onClose: () => void;
  // onUpdateSessionOrders: (orders: Order[]) => void;
  // orders: Order[];
}

const OrdersDialog: React.FC<Props> = ({
  open,
  sessionId,
  onClose,
  // onUpdateSessionOrders,
  // orders
}) => {
  // const [orderPrices, setOrderPrices] = useState<Order[]>(orders || []);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`session-${sessionId}-orders`],
    queryFn: ()=>fetchOrders(sessionId),
    initialData:{
      orders:[]
    }
  });
  
  const [addOrderOpen, setAddOrderOpen] = useState(false);

  // useEffect(() => {
  //   setOrderPrices(orders || []);
  // }, [orders]);

  const handlePriceChange = (index: number, value: string) => {
    const newOrders = [...data.orders];
    const price = parseFloat(value);
    if (!isNaN(price)) {
      newOrders[index].price = price;
      // setOrderPrices(newOrders);
      // onUpdateSessionOrders(newOrders);
    }
  };

  const handleAddOrder = (order: Order) => {
    const newOrders = [...data.orders, order];
    // setOrderPrices(newOrders);
    // onUpdateSessionOrders(newOrders);
  };

  // حذف طلب بناءً على الإندكس
  const handleDeleteOrder = (index: number) => {
    const newOrders = data.orders.filter((_, i) => i !== index);
    // setOrderPrices(newOrders);
    // onUpdateSessionOrders(newOrders);
  };

  const totalPrice = data.orders.reduce((acc, o) => acc + o.price, 0);

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle>الطلبات للجلسة {sessionId}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.orders.length === 0 && <p>لا توجد طلبات</p>}
            {data.orders.map((order:Order, index) => (
              <div
                key={index}
                className="border p-2 rounded flex justify-between items-center text-sm gap-2"
              >
                <span className="font-semibold">{order.type || `طلب رقم ${index + 1}`}</span>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-24 text-end"
                  value={order.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteOrder(index)}
                >
                  حذف
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button variant="secondary" onClick={() => setAddOrderOpen(true)}>
              + إضافة طلب
            </Button>
            <div className="text-sm font-medium">
              الإجمالي: ${totalPrice.toFixed(2)}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={onClose}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة إضافة طلب منفصلة */}
      <AddOrderDialog
        open={addOrderOpen}
        onOpenChange={setAddOrderOpen}
        sessionId={sessionId}
      />
    </>
  );
};

export default OrdersDialog;
