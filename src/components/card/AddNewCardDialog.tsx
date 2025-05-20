import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AddNewCardDialog = ({ onAdd,openAddCard,setOpenAddCard }: { openAddCard:boolean,setOpenAddCard:any,onAdd: (card: any) => void }) => {
//   const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    label: "",
    price: "",
    qty: "",
    hours: "",
    speed: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.label) newErrors.label = "العنوان مطلوب";
    if (!form.price) newErrors.price = "السعر مطلوب";
    if (!form.qty) newErrors.qty = "العدد مطلوب";
    if (!form.hours) newErrors.hours = "المدة مطلوبة";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({ ...form, id: Date.now(), price: +form.price, qty: +form.qty, hours: +form.hours });
    setForm({ label: "", price: "", qty: "", hours: "", speed: "" });
    setOpenAddCard(false)
  };

  return (
    <Dialog open={openAddCard} onOpenChange={setOpenAddCard}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={16} />
          إضافة بطاقة جديدة
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة بطاقة جديدة</DialogTitle>
          <DialogDescription>قم بإدخال بيانات البطاقة الجديدة.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-right">
          <div>
            <Label htmlFor="label">عنوان البطاقة</Label>
            <Input id="label" value={form.label} onChange={(e) => handleChange("label", e.target.value)} />
            {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
          </div>
          <div>
            <Label htmlFor="price">السعر</Label>
            <Input id="price" type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div>
            <Label htmlFor="qty">العدد</Label>
            <Input id="qty" type="number" value={form.qty} onChange={(e) => handleChange("qty", e.target.value)} />
            {errors.qty && <p className="text-red-500 text-sm mt-1">{errors.qty}</p>}
          </div>
          <div>
            <Label htmlFor="hours">المدة (بالساعات)</Label>
            <Input id="hours" type="number" value={form.hours} onChange={(e) => handleChange("hours", e.target.value)} />
            {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours}</p>}
          </div>
          <div>
            <Label htmlFor="speed">السرعة (اختياري)</Label>
            <Select value={form.speed} onValueChange={(value) => handleChange("speed", value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر السرعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3g">3G</SelectItem>
                <SelectItem value="4g">4G</SelectItem>
                <SelectItem value="5g">5G</SelectItem>
              </SelectContent>
            </Select>
          </div>
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