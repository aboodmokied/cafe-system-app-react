import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SessionExpiredDialog: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-2">انتهت الجلسة</Dialog.Title>
          <Dialog.Description className="text-gray-700 mb-4">
            انتهت الجلسة، حاول تسجيل الدخول مجددًا.
          </Dialog.Description>
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                حسناً
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SessionExpiredDialog;
