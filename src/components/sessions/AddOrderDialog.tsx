// components/sessions/AddOrderDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOtherOrder } from "@/api/orders.api";

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId:number
  // onAddOrder: (order: { type: string; price: number }) => void;
}

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({
  open,
  onOpenChange,
  sessionId
  // onAddOrder,
}) => {
  const queryClient = useQueryClient();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const mutation = useMutation({
      mutationFn: addOtherOrder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`session-${sessionId}-orders`] });
      }
    });

  // عند فتح النافذة نجدد البيانات
  useEffect(() => {
    if (open) {
      setType("");
      setPrice("");
      setTitle("");
    }
  }, [open]);

  const handleAdd = () => {
    if (!type.trim() || !price || isNaN(Number(price)) || !title.trim()) return;
    if(type=='OTHER'){
      mutation.mutate({sessionId,price:+price,type,title})
    }else{
      console.log('Type Not Provided')
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة طلب جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="نوع الطلب"
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="text"
            placeholder="اسم الطلب"
            className="w-full border rounded px-3 py-2"
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
        </div>
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
