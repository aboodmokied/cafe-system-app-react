import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { PlusCircle } from "lucide-react";
import { addNewSupplier, fetchSuppliers } from "@/api/supplier.api";
import { Supplier } from "@/types";
import { Link } from "react-router-dom";

const Suppliers = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
    initialData: { suppliers: [] },
  });

  const mutation = useMutation({
    mutationFn: addNewSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      setName("");
      setPhone("");
      setOpen(false);
      setErrors([]);
    },
    onError: (error:any) => {
        if(error.status==400){ // validation error
            setErrors(error.response?.data?.message||[error.message])
        }else{
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
            إضافة شركة جديدة
        </Button>
        <h1 className="text-2xl font-bold">شركات الإمداد</h1>
      </div>

      {isLoading && <p>جاري التحميل...</p>}
      {isError && <p className="text-red-500">حدث خطأ أثناء جلب الشركات.</p>}

      <ul className="space-y-2">
        {data.suppliers.map((supplier: Supplier) => (
          <li key={supplier.id} className="border p-3 rounded flex items-center justify-between">
            <div>
                <div className="font-semibold">{supplier.name}</div>
                <div className="text-sm text-gray-600">📞 {supplier.phone}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Link to={`/suppliers/${supplier.id}/report`}>عرض التقرير</Link>            
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة شركة جديدة</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="اسم الشركة"
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
    </Layout>
  );
};

export default Suppliers;