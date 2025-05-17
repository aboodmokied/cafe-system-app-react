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
import { Session } from "@/types";

interface Props {
  onAddSession: (newSession:Pick<Session,"username"|"clientType">) => void;
}

const NewSessionDialog: React.FC<Props> = ({ onAddSession }) => {
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("SUBSCRIPER"); // القيمة الافتراضية

  const handleAdd = async() => {
    
    if (!clientName) return;
    onAddSession({username:clientName,clientType:clientType});
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
            required
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
            <option value="SUBSCRIPER">مشترك</option>
            <option value="GUESS">زائر</option>
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
