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
import Pagination from "@/components/layout/Pagination";
import SearchBar from "@/components/layout/SearchBar";

const SalesPoints = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["salesPoints",page,searchQuery],
    queryFn: ()=>fetchSalesPoints(page,limit,searchQuery),
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

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-10 text-blue-600 font-semibold">جاري تحميل التقرير...</div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="text-center py-10 text-red-600 font-semibold">
          حدث خطأ أثناء تحميل البيانات
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Button onClick={() => setOpen(true)}>
              <PlusCircle size={16} />
              إضافة نقطة بيع جديدة
            </Button>
            <Link to='/poin-collection-billings'>
              <Button className="bg-red-500 hover:bg-red-300">
                  عرض فواتير تحتاج للتحصيل
              </Button>
            </Link>
          </div>
          
          <h1 className="text-2xl font-bold">نقاط البيع</h1>
        </div>

      <SearchBar
        onSearch={(searchInput)=>{
          setPage(1);
          setSearchQuery(searchInput);
        }}
      />  

        <ul className="space-y-2">
          {data.salesPoints.map((point: SalesPoint) => (
            <li key={point.id} className="border p-3 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-semibold">{point.name}</div>
                <div className="text-sm text-gray-600">📞 {point.phone}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-green-500 text-white hover:bg-green-300"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSelectedPointId(point.id);
                    setCardDialogOpen(true);
                  }}
                >
                  بيع بطاقات
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
      {/* pagination controll */}
      <Pagination
        page={page}
        setPage={setPage}
        pagination={data.pagination}
      />      
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
