import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOtherOrder } from "@/api/orders.api";

// Example card types and their expected prices
const cardTypes = [
  { label: "بطاقة 10$", value: "CARD_10", price: 10 },
  { label: "بطاقة 20$", value: "CARD_20", price: 20 },
  { label: "بطاقة 50$", value: "CARD_50", price: 50 }
];

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: number;
}

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({
  open,
  onOpenChange,
  sessionId
}) => {
  const queryClient = useQueryClient();
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [cardType, setCardType] = useState("");
  const [duration, setDuration] = useState("");

  const mutation = useMutation({
    mutationFn: addOtherOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`session-${sessionId}-orders`]
      });
    }
  });

  useEffect(() => {
    if (open) {
      setType("");
      setPrice("");
      setTitle("");
      setCardType("");
      setDuration("");
    }
  }, [open]);

  const handleAdd = () => {
    if (type === "OTHER") {
      if (!title.trim() || !price) return;
      mutation.mutate({ sessionId, type, title, price: +price });
    } else if (type === "CHARGING") {
      if (!duration) return;
      // mutation.mutate({ sessionId, type, duration });
    } else if (type === "CARD") {
      if (!cardType) return;
      const card = cardTypes.find(c => c.value === cardType);
      // mutation.mutate({ sessionId, type, cardType, price: card?.price || 0 });
    } else {
      return;
    }

    onOpenChange(false);
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
            <select
              className="w-full border rounded px-3 py-2 mt-2"
              value={cardType}
              onChange={(e) => {
                setCardType(e.target.value);
                const selected = cardTypes.find(c => c.value === e.target.value);
                setPrice(selected ? String(selected.price) : "");
              }}
            >
              <option value="">اختر نوع البطاقة</option>
              {cardTypes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="السعر المتوقع"
              className="w-full border rounded px-3 py-2"
              value={price}
              readOnly
            />
          </>
        )}

        {type === "CHARGING" && (
          <input
            type="text"
            placeholder="المدة (مثال: 30 يوم)"
            className="w-full border rounded px-3 py-2 mt-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        )}

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
