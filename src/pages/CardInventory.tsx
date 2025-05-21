import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card as CardType } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import AddNewCardDialog from "@/components/card/AddNewCardDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "@/api/card.api";

const CardInventory = () => {
  const [openAddStockDialog, setOpenAddStockDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [openAddCard, setOpenAddCard] = useState(false);

  const {
    isError,
    error,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    initialData: {
      cards: [],
    },
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-x-2">
          <Button onClick={() => setOpenAddCard(true)} className="gap-2">
            <PlusCircle size={16} />
            إضافة بطاقة جديدة
          </Button>
          <h1 className="text-2xl font-bold">مخزون البطاقات</h1>
        </div>

        {/* تحميل البيانات */}
        {isLoading ? (
          <div className="flex justify-center py-20 text-gray-500">جاري تحميل البيانات...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            حدث خطأ أثناء تحميل البيانات: {error?.message || "يرجى المحاولة لاحقاً"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.cards.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                لا توجد بطاقات حالياً.
              </div>
            ) : (
              data.cards.map((c: CardType) => (
                <Card key={c.id} className="p-6">
                  <h3 className="text-lg font-medium mb-2">{c.label}</h3>
                  <p className="text-sm text-gray-500 mb-4">الإجمالي: {c.qty} بطاقة</p>

                  <div className="">
                    <div className="border-t border-gray-100 py-3">
                      <div className="text-right flex gap-2">
                        <p className="text-gray-500">السعر:</p>
                        <p className="font-medium">{c.price} ش</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 py-3">
                      <div className="text-right flex gap-2">
                        <p className="text-gray-500">المدة:</p>
                        <p className="font-medium">{c.hours} س</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 py-3">
                      <div className="text-right flex gap-2">
                        <p className="text-gray-500">السرعة:</p>
                        <p className="font-medium">{c.speed || "غير محددة"}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 py-3">
                      <Button
                        className="gap-2 mx-auto flex"
                        onClick={() => {
                          setSelectedCard(c);
                          setOpenAddStockDialog(true);
                        }}
                      >
                        <PlusCircle size={16} />
                        اضف للمخزون
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Dialog: إضافة بطاقة جديدة */}
      <AddNewCardDialog
        openAddCard={openAddCard}
        setOpenAddCard={setOpenAddCard}
        onAdd={(newCard) => {
          // أضف البطاقة الجديدة للمخزون هنا
          console.log("تمت إضافة البطاقة:", newCard);
        }}
      />

      {/* Dialog: إضافة للمخزون */}
      <Dialog open={openAddStockDialog} onOpenChange={setOpenAddStockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة للمخزون</DialogTitle>
            <DialogDescription>
              {selectedCard?.label && `إضافة كمية جديدة إلى: ${selectedCard.label}`}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm text-gray-600">نموذج تحديد الكمية هنا...</div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CardInventory;
