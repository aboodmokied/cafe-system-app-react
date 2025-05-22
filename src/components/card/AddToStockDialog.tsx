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
import { fetchSuppliers } from "@/api/supplier.api";
// import { addStockToCard } from "@/api/card.api";
import { Card as CardType } from "@/types";
import { addToStockCard } from "@/api/card.api";

interface AddToStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: CardType | null;
}

const AddToStockDialog: React.FC<AddToStockDialogProps> = ({ open, onOpenChange, card }) => {
  const queryClient = useQueryClient();
  const [supplierId, setSupplierId] = useState("");
  const [qty, setQty] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [paidPrice, setPaidPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
    initialData: { suppliers: [] },
  });

  const mutation = useMutation({
    mutationFn: addToStockCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      setQty("");
      setSupplierId("");
      setTotalPrice("");
      setPaidPrice("");
      onOpenChange(false);
    },
    onError: (error) => {
      setErrorMsg(error.message||"حدث خطأ أثناء الإضافة. تأكد من صحة البيانات.");
    },
  });

  const handleSubmit = () => {
    if (!card || !supplierId || !qty || !totalPrice || !paidPrice) {
      setErrorMsg("يرجى تعبئة جميع الحقول.");
      return;
    }

    mutation.mutate({
      cardId: Number(card.id),
      supplierId: Number(supplierId),
      qty: Number(qty),
      totalPrice: Number(totalPrice),
      paidPrice: Number(paidPrice),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة للمخزون</DialogTitle>
          <DialogDescription>
            {card?.label && `إضافة كمية جديدة إلى: ${card.label}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-gray-500">جاري تحميل شركات الإمداد...</p>
        ) : isError ? (
          <p className="text-red-500">تعذر تحميل الشركات.</p>
        ) : (
          <select
            className="w-full border rounded px-3 py-2"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">اختر شركة الإمداد</option>
            {data.suppliers.map((s: any) => (
              <option key={s.id} value={s.id}>{s.name} - {s.phone}</option>
            ))}
          </select>
        )}

        <Input
          placeholder="الكمية"
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

        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}

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

export default AddToStockDialog;
