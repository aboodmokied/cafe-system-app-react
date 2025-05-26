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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Session, Subscriper } from "@/types";
import { openNewSession } from "@/api/sessions.api";
import { fetchSubscriberByName } from "@/api/subscriper.api";

const NewSessionDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("SUBSCRIPER");
  const [errors, setErrors] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: openNewSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      setErrors([]);
      setClientName("");
      setClientType("SUBSCRIPER");
      setOpen(false);
    },
    onError: (error: any) => {
      if (
        error.response?.status === 400 &&
        Array.isArray(error.response.data.message)
      ) {
        setErrors(error.response.data.message);
      } else {
        setErrors(["حدث خطأ غير متوقع"]);
      }
    },
  });

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [`subscriper-${clientName}`],
    queryFn: () => fetchSubscriberByName(clientName),
    initialData: {
      subscriper: null,
    },
    enabled: false,
    retry: false,
  });

  const handleAdd = () => {
    if (!clientType || !clientName) return;

    if (clientType === "SUBSCRIPER") {
      if (data.subscriper) {
        mutation.mutate({
          clientType,
          username: clientName,
          subscriperId: data.subscriper.id,
        });
      }
    } else if (clientType === "GUEST") {
      mutation.mutate({
        clientType,
        username: clientName,
      });
    }

    // setClientName("");
    // setClientType("SUBSCRIPER");
    // setOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setClientName("");
      setClientType("SUBSCRIPER");
      setErrors([]);
      queryClient.removeQueries({ queryKey: [`subscriper-${clientName}`] });
    }
  };

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={16} />
          جلسة جديدة
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة جلسة جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="text"
            required
            placeholder="اسم العميل"
            className="w-full border rounded px-3 py-2"
            value={clientName}
            onChange={handleClientNameChange}
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
          >
            <option value="SUBSCRIPER">مشترك</option>
            <option value="GUEST">زائر</option>
          </select>

          {clientType === "SUBSCRIPER" && (
            <>
              <Button
                variant="outline"
                className="w-full"
                disabled={!clientName.trim()}
                onClick={() => {
                  if (clientName.trim()) refetch();
                }}
              >
                {isFetching ? "جارٍ البحث..." : "بحث عن المشترك"}
              </Button>

              <div className="bg-gray-100 rounded p-3 text-sm">
                {isFetching ? (
                  <p>جارٍ تحميل بيانات المشترك...</p>
                ) : isError ? (
                  <p className="text-red-500">لا يوجد مشترك بهذا الاسم</p>
                ) : data.subscriper ? (
                  <div>
                    <p>
                      <strong>الهاتف:</strong> {data.subscriper.phone}
                    </p>
                    <p>
                      <strong>البريد الإلكتروني:</strong> {data.subscriper.email}
                    </p>
                    <p>
                      <strong>نوع الاشتراك:</strong> {data.subscriper.type}
                    </p>
                  </div>
                ) : (
                  <p>أدخل اسم العميل ثم اضغط "بحث"</p>
                )}
              </div>
            </>
          )}

          {/* عرض الأخطاء */}
          {errors.length > 0 && (
            <ul className="bg-red-100 border border-red-300 text-red-700 rounded p-3 text-sm space-y-1">
              {errors.map((err, index) => (
                <li key={index}>• {err}</li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button
            disabled={clientType === "SUBSCRIPER" && !data.subscriper}
            onClick={handleAdd}
          >
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSessionDialog;
