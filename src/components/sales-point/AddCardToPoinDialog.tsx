import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCards, removeFromStockCard } from "@/api/card.api"; // تأكد من وجود هذا الـ API
import { Card } from "@/types";

interface AddCardToPoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salesPointId: number;
}

const AddCardToPoinDialog: React.FC<AddCardToPoinDialogProps> = ({ open, onOpenChange, salesPointId }) => {
  const queryClient = useQueryClient();

  const [cardId, setCardId] = useState("");
  const [qty, setQty] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paidPrice, setPaidPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    initialData: { cards: [] },
  });

  const mutation = useMutation({
    mutationFn: removeFromStockCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`sales-point-${salesPointId}-report`] });
      setCardId("");
      setQty("");
      setTotalPrice("");
      setPaidPrice("");
      onOpenChange(false);
    },
    onError: () => {
      setErrorMsg("فشل في إضافة البيانات. تأكد من إدخال معلومات صحيحة.");
    },
  });

  const handleSubmit = () => {
    if (!cardId || !qty || !totalPrice || !paidPrice) {
      setErrorMsg("يرجى تعبئة جميع الحقول.");
      return;
    }

    mutation.mutate({
      cardId: Number(cardId),
      pointId:salesPointId,
      qty: Number(qty),
      totalPrice: Number(totalPrice),
      paidPrice: Number(paidPrice),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة بيع بطاقات</DialogTitle>
          <DialogDescription>إضافة بطاقة مباعة جديدة لنقطة البيع.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-gray-500">جاري تحميل أنواع البطاقات...</p>
        ) : isError ? (
          <p className="text-red-500 text-sm">تعذر تحميل البطاقات.</p>
        ) : (
          <select
            className="w-full border rounded px-3 py-2"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
          >
            <option value="">اختر نوع البطاقة</option>
            {data.cards.map((card: Card) => (
              <option key={card.id} value={card.id}>
                {card.label} - {card.speed} - {card.hours} ساعة
              </option>
            ))}
          </select>
        )}

        <Input
          placeholder="عدد البطاقات"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <Input
          placeholder="السعر الإجمالي"
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
        <Input
          placeholder="السعر المدفوع"
          type="number"
          value={paidPrice}
          onChange={(e) => setPaidPrice(e.target.value)}
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <DialogFooter>
          <Button onClick={handleSubmit}>إضافة</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardToPoinDialog;
