import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import authAxios from "@/api/authAxios";

interface Props {
  onAddSession: (session: any) => void;
}

const NewSessionDialog: React.FC<Props> = ({ onAddSession }) => {
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("مشترك"); // القيمة الافتراضية

  const handleAdd = async() => {
    
    if (!clientName) return;
    const client = `${clientName} (${clientType})`;

    onAddSession({
      id: "S" + Math.floor(Math.random() * 10000).toString().padStart(3, "0"),
      client,
      startTime: new Date().toISOString(),
      endTime: null,
      status: "open",
      orders: [],
      totalDue: 0,
    });
    authAxios.post('/session',{
      username:'abood mokk',
      clientType:'GUEST'
    });
    setClientName("");
    setClientType("مشترك");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            placeholder="اسم العميل"
            className="w-full border rounded px-3 py-2"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <select
            className="w-full border rounded px-3 py-2"
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
          >
            <option value="مشترك">مشترك</option>
            <option value="زائر">زائر</option>
          </select>
        </div>
        <DialogFooter>
          <Button onClick={handleAdd}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSessionDialog;
