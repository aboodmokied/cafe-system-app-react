import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { supplierBillingPayment } from "@/api/supplier.api";

interface SupplierBillingPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentBillingId: number | null;
  onSuccess?: () => void;
}



export const SupplierBillingPaymentDialog = ({
  open,
  onOpenChange,
  paymentBillingId,
  onSuccess,
}: SupplierBillingPaymentDialogProps) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const paymentMutation = useMutation({
    mutationFn: supplierBillingPayment,
    onSuccess: () => {
      onOpenChange(false);
      setPaymentAmount(0);
      setError(null);
      onSuccess?.();
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message[0] || error.message || "حدث خطأ أثناء عملية الدفع");
    },
  });

  const handleConfirm = () => {
    if (!paymentBillingId) return;
    
    // Reset error
    setError(null);
    
    // Validate input
    if (paymentAmount <= 0) {
      setError("يجب أن يكون المبلغ أكبر من الصفر");
      return;
    }
    
    paymentMutation.mutate({ 
        supplierBillingId:paymentBillingId,
        amount:paymentAmount
     });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>تسديد فاتورة #{paymentBillingId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="أدخل المبلغ المدفوع"
              value={paymentAmount}
              onChange={(e) => {
                setPaymentAmount(+e.target.value);
                setError(null);
              }}
              disabled={paymentMutation.isPending}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>

        <DialogFooter>
            <div className="flex justify-end items-center gap-2">
                
                <Button 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    disabled={paymentMutation.isPending}
                >
                    إلغاء
                </Button>
                <Button
                    onClick={handleConfirm}
                    disabled={paymentMutation.isPending}
                >
                    {paymentMutation.isPending ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        جاري المعالجة...
                    </span>
                    ) : (
                    "تأكيد الدفع"
                    )}
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};