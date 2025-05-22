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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, stopChargingOrder } from "@/api/orders.api";
import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'


interface Props {
  open: boolean;
  sessionId: number;
  onClose: () => void;
  // onUpdateSessionOrders: (orders: Order[]) => void;
  // orders: Order[];
}

const getDuration = (start: Date) => {
  const ms = Date.now() - new Date(start).getTime()
  const minutes = Math.floor(ms / 60000)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} ساعة و ${remainingMinutes} دقيقة`
}

const formatMinutesToHoursAndMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} ساعة و ${minutes} دقيقة`;
};

const OrdersDialog: React.FC<Props> = ({
  open,
  sessionId,
  onClose,
  // onUpdateSessionOrders,
  // orders
}) => {
  const queryClient = useQueryClient();

  // get orders
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`session-${sessionId}-orders`],
    queryFn: ()=>fetchOrders(sessionId),
    initialData:{
      orders:[]
    }
  });
  
  // close charging order
  const mutation = useMutation({
    mutationFn: stopChargingOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`session-${sessionId}-orders`]
      });
    }
  });

  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const [stoppingIndex, setStoppingIndex] = useState<number | null>(null)
  const [priceInput, setPriceInput] = useState<string>('')

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
  const handleStopCharging = (index: number) => {
    setStoppingIndex(index)
    setPriceInput('') // إعادة تعيين حقل السعر
  }

  const handleSavePrice=(orderId:number,price:string)=>{
    mutation.mutate({
      orderId,
      price:+price,
      endAt:new Date()
    });
  }

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
      {data.orders.map((order: Order) => {
        const isCharging = order.type === 'CHARGING'
        const isActive = isCharging && !(order.chargingOrder.endAt)
        const isStopping = stoppingIndex === order.id

      return (
        <div
          key={order.id}
          className="border p-3 rounded text-sm space-y-2 bg-white shadow-sm"
        >
          {/* عنوان الطلب */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {order.type === 'OTHER'
                ? order.otherOrder.title
                : order.type === 'CHARGING'
                ? "شحن"
                : order.type === 'CARD'
                ? "بطاقة إنترنت"
                : order.type}
            </span>
            <div className="flex gap-2">
                {isCharging && isActive && !isStopping && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleStopCharging(order.id)}
                >
                  إيقاف
                </Button>
              )}

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteOrder(order.id)}
              >
                حذف
              </Button>
            </div>    
            
          </div>

          {/*  عنوان البطاقة */}
          {
            order.type=="CARD"&&(
              <div className="text-xs font-semibold">
                عنوان البطاقة: {order.cardOrder.cardId}
              </div>
            )
          }
          
          {/* السعر */}
          <div className="text-xs font-semibold">
            {isCharging && !order.price ? (
              'سيتم احتساب السعر بناءً على مدة الشحن'
            ) : (
              `السعر: ${order.price || 'لم يتم تحديده بعد'}`
            )}
          </div>

          {/* مدة الشحن */}
          {isCharging && isActive && (
            <div className="text-xs text-gray-600">
              بدأ منذ: {formatDistanceToNow(new Date(order.chargingOrder.startAt), { locale: ar })}
            </div>
          )}

           {isCharging && !isActive &&(
              <div className="text-xs text-gray-600">
                تم الشحن لمدة: {formatMinutesToHoursAndMinutes(order.chargingOrder.durationMinutes)}
              </div>
            )
          }

          {/* تفاصيل إيقاف الشحن */}
          {isStopping && (
            <div className="mt-2 space-y-2 border-t pt-2 text-xs">
              <div>⏱️ مدة الشحن: {getDuration(order.chargingOrder.startAt)}</div>
              <div className="flex items-center gap-2">
                <label htmlFor={`price-${order.id}`} className="whitespace-nowrap">
                  السعر:
                </label>
                <input
                  id={`price-${order.id}`}
                  type="number"
                  className="border rounded px-2 py-1 w-32 text-end"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    handleSavePrice(order.id, priceInput)
                    setStoppingIndex(null)
                  }}
                >
                  حفظ السعر
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setStoppingIndex(null)
                  }}
                >
                  الغاء
                </Button>
              </div>
            </div>
          )}
        </div>
          )
        })}
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
