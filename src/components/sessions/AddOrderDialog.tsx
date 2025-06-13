import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCardOrder, addChargingOrder, addOtherOrder } from "@/api/orders.api";
import { fetchCards } from "@/api/card.api";
import { AddCardOrderPayload, AddChargingOrderPayload, AddOtherOrderPayload } from "@/types";
import { Card } from "../ui/card";


interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: number;
}

  const createOrder = async (data: AddCardOrderPayload | AddChargingOrderPayload | AddOtherOrderPayload) => {
  switch (data.type) {
    case "CARD":
      return await addCardOrder(data);
    case "CHARGING":
      return await addChargingOrder(data);
    case "OTHER":
      return await addOtherOrder(data);
    default:
      throw new Error("Invalid order type");
  }
};

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({
  open,
  onOpenChange,
  sessionId
}) => {
  const queryClient = useQueryClient();
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [title, setTitle] = useState("");
  const [cardId, setCardId] = useState("");
  // const [duration, setDuration] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`session-${sessionId}-orders`]
      });
      onOpenChange(false);
    },
    onError: (error: any) => {
      if (
        error.response?.status === 400 &&
        Array.isArray(error.response.data.message)
      ) {
        setErrors(error.response.data.message);
      } else {
        setErrors(["حدث خطأ غير متوقع"]);
      }
    },
  });

  const {
    isError,
    error,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["order-cards"],
    queryFn: fetchCards,
    initialData: {
      cards: [],
    },
  });

  useEffect(() => {
    if (open) {
      setType("");
      setPrice("");
      setSelectedCard(null);
      setTitle("");
      setCardId("");
      // setDuration("");
    }
  }, [open]);

  const handleAdd = () => {
    if (type === "OTHER") {
      if (!title.trim() || !price) return;
      mutation.mutate({ sessionId, type, title, price: +price });
    } else if (type === "CHARGING") {
      // if (!duration) return;
      mutation.mutate({ sessionId, type });
    } else if (type === "CARD") {
      if (!cardId) return;
        mutation.mutate({ sessionId, type,cardId:+cardId });
    } else {
      return;
    }

  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة طلب جديد</DialogTitle>
        </DialogHeader>

        {/* Select Order Type */}
        <select
          className="w-full border rounded px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">اختر نوع الطلب</option>
          <option value="CARD">بطاقة</option>
          <option value="CHARGING">شحن</option>
          <option value="OTHER">أخرى</option>
        </select>

        {/* Conditional Inputs */}
       {type === "CARD" && (
  <>
    {isLoading ? (
      <div className="text-sm text-blue-600 animate-pulse my-2">جاري تحميل البطاقات...</div>
    ) : isError ? (
      <div className="text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded my-2">
        حدث خطأ أثناء تحميل البطاقات. يرجى المحاولة لاحقًا.
      </div>
    ) : (
      <>
        <select
          className="w-full border rounded px-3 py-2 mt-2"
          value={cardId}
          onChange={(e) => {
            setCardId(e.target.value);
            const selected = data.cards.find((c) => c.id == +e.target.value);
            setSelectedCard(selected);
            // setPrice(selected ? String(selected.price) : "");
          }}
        >
          <option value="">اختر نوع البطاقة</option>
          {data.cards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        {selectedCard&&(
         <Card key={selectedCard.id} className="p-6">
                  <h3 className="text-lg font-medium mb-2">{selectedCard.label}</h3>
                  <p className="text-sm text-gray-500 mb-4">الإجمالي: {selectedCard.qty} بطاقة</p>

                  <div className="">
                    <div className="border-t border-gray-100 py-3">
                      <div className="text-right flex gap-2">
                        <p className="text-gray-500">السعر:</p>
                        <p className="font-medium">{selectedCard.price} ش</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 py-3">
                      <div className="text-right flex gap-2">
                        <p className="text-gray-500">المدة:</p>
                        <p className="font-medium">{selectedCard.hours} س</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 py-3">
                      <div className="text-right flex gap-2">
                        <p className="text-gray-500">السرعة:</p>
                        <p className="font-medium">{selectedCard.speed || "غير محددة"}</p>
                      </div>
                    </div>
                  </div>
                </Card>
        )}
        
      </>
    )}
  </>
)}


        {/*type === "CHARGING" && (
          <input
            type="text"
            placeholder="المدة (مثال: 30 يوم)"
            className="w-full border rounded px-3 py-2 mt-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        )*/}

        {type === "OTHER" && (
          <>
            <input
              type="text"
              placeholder="اسم الطلب"
              className="w-full border rounded px-3 py-2 mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="السعر"
              className="w-full border rounded px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </>
        )}
        {/* عرض الأخطاء */}
          {errors.length > 0 && (
            <ul className="bg-red-100 border border-red-300 text-red-700 rounded p-3 text-sm space-y-1">
              {errors.map((err, index) => (
                <li key={index}>• {err}</li>
              ))}
            </ul>
          )}
        <DialogFooter>
          <Button onClick={handleAdd}>إضافة</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
