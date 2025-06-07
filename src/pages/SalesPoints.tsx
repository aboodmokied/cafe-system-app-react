import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { PlusCircle } from "lucide-react";
import { SalesPoint } from "@/types";
import { Link } from "react-router-dom";
import { addNewSalesPoint, fetchSalesPoints } from "@/api/point.api";
import AddCardToPoinDialog from "@/components/sales-point/AddCardToPoinDialog";

const SalesPoints = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["salesPoints"],
    queryFn: fetchSalesPoints,
    initialData: { salesPoints: [] },
  });

  const mutation = useMutation({
    mutationFn: addNewSalesPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesPoints"] });
      setName("");
      setPhone("");
      setOpen(false);
      setErrors([]);
    },
    onError: (error: any) => {
      if (error.status === 400) {
        setErrors(error.response?.data?.message || [error.message]);
      } else {
        setErrors(["حدث خطأ أثناء الإضافة."]);
      }
    },
  });

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      setErrors(["يجب إدخال الاسم ورقم الهاتف."]);
      return;
    }
    mutation.mutate({ name, phone });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button onClick={() => setOpen(true)}>
            <PlusCircle size={16} />
            إضافة نقطة بيع جديدة
          </Button>
          <h1 className="text-2xl font-bold">نقاط البيع</h1>
        </div>

        {isLoading && <p>جاري التحميل...</p>}
        {isError && <p className="text-red-500">حدث خطأ أثناء جلب نقاط البيع.</p>}

        <ul className="space-y-2">
          {data.salesPoints.map((point: SalesPoint) => (
            <li key={point.id} className="border p-3 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-semibold">{point.name}</div>
                <div className="text-sm text-gray-600">📞 {point.phone}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSelectedPointId(point.id);
                    setCardDialogOpen(true);
                  }}
                >
                  أضف بطاقات
                </Button>
                <Link to={`/sales-points/${point.id}/report`}>
                  <Button variant="outline" size="sm">عرض التقرير</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة نقطة بيع جديدة</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="اسم نقطة البيع"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors([]);
              }}
            />
            <Input
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors([]);
              }}
            />
            {errors.length > 0 && (
              <ul className="text-red-500 text-sm mt-2 list-disc pr-4">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
            <DialogFooter>
              <Button onClick={handleSubmit}>حفظ</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {selectedPointId !== null && (
        <AddCardToPoinDialog
          open={cardDialogOpen}
          onOpenChange={(open) => {
            setCardDialogOpen(open);
            if (!open) setSelectedPointId(null);
          }}
          salesPointId={selectedPointId}
        />
      )}

    </Layout>
  );
};

export default SalesPoints;
