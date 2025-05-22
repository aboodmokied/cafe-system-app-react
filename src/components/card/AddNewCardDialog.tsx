import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCard } from "@/api/card.api";

const AddNewCardDialog = ({
  openAddCard,
  setOpenAddCard,
}: {
  openAddCard: boolean;
  setOpenAddCard: any;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      setForm({ label: "", price: 0, hours: 0, speed: "" });
      setOpenAddCard(false);
    },
    onError: (error: any) => {
        if(error?.status==400){
            console.log(error.response.data.message)
            setErrors(error.response?.data?.message || ['حدث خطأ ما'])
        }else{
            setErrors(error.message || ['حدث خطأ ما'])
        }
    },
  });

  const [form, setForm] = useState({
    label: "",
    price: 0,
    // qty: 0,
    hours: 0,
    speed: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
  const errs: string[] = [];
  if (!form.label) errs.push("العنوان مطلوب");
  if (!form.price) errs.push("السعر مطلوب");
  // if (!form.qty) errs.push("العدد مطلوب");
  if (!form.hours) errs.push("المدة مطلوبة");
  return errs;
};

  const handleSubmit = () => {
    const validationErrors = validate();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
    }
    setErrors([]);
    mutation.mutate({
      label: form.label,
      hours: +form.hours,
      price: +form.price,
      // qty: +form.qty,
      speed: form.speed,
    });
  };
  return (
    <Dialog open={openAddCard} onOpenChange={setOpenAddCard}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة بطاقة جديدة</DialogTitle>
          <DialogDescription>قم بإدخال بيانات البطاقة الجديدة.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-right">
          <div>
            <Label htmlFor="label">عنوان البطاقة</Label>
            <Input id="label" value={form.label} onChange={(e) => handleChange("label", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="price">السعر</Label>
            <Input id="price" type="number" step=".5" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
          </div>
          {/* <div>
            <Label htmlFor="qty">العدد</Label>
            <Input id="qty" type="number" value={form.qty} onChange={(e) => handleChange("qty", e.target.value)} />
          </div> */}
          <div>
            <Label htmlFor="hours">المدة (بالساعات)</Label>
            <Input id="hours" type="number" value={form.hours} onChange={(e) => handleChange("hours", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="speed">السرعة (اختياري)</Label>
            <Select value={form.speed} onValueChange={(value) => handleChange("speed", value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر السرعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1g">1G</SelectItem>
                <SelectItem value="2g">2G</SelectItem>
                <SelectItem value="3g">3G</SelectItem>
                <SelectItem value="4g">4G</SelectItem>
                <SelectItem value="5g">5G</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ مربع الأخطاء */}
          
          {errors.length > 0 && (
            <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded text-sm space-y-1">
                {errors.map((err, i) => (
                <div key={i}>• {err}</div>
                ))}
            </div>
            )}

          <div className="pt-2">
            <Button onClick={handleSubmit} className="w-full">
              حفظ البطاقة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCardDialog;
