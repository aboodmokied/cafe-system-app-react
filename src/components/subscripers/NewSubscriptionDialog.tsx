import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { createSubscriper } from "@/api/subscriper.api";


const NewSubscriptionDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState<'weekly'|'monthly'>("monthly");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn:createSubscriper,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscripers"] });
      setErrors([]);
      setName("");
      setType("monthly");
      setPhone("");
      setEmail("");
      setOpen(false);
    },
    onError: (error: any) => {
      if (
        error.response?.status === 400 &&
        Array.isArray(error.response.data.message)
      ) {
        setErrors(error.response.data.message);
      } else {
        setErrors(["حدث خطأ أثناء حفظ الاشتراك"]);
      }
    },
  });

  const handleSave = () => {
    const newErrors = [];

    if (!name.trim()) newErrors.push("الرجاء إدخال الاسم");
    if (!phone.trim()) newErrors.push("الرجاء إدخال رقم الهاتف");
    if (!email.trim()) newErrors.push("الرجاء إدخال البريد الإلكتروني");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({
      email,
      phone,
      type,
      username:name
    });
  };

  const handleDialogClose = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setName("");
      setType("monthly");
      setPhone("");
      setEmail("");
      setErrors([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={16} />
          اشتراك جديد
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة اشتراك جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="اسم المشترك"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value as "weekly" | "monthly")}
          >
            <option value="monthly">شهري</option>
            <option value="weekly">أسبوعي</option>
          </select>

          <Input
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.length > 0 && (
            <ul className="bg-red-100 border border-red-300 text-red-700 rounded p-3 text-sm space-y-1">
              {errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={false}>
            {false ? "جارٍ الحفظ..." : "حفظ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSubscriptionDialog;
