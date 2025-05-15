
import React from "react";
import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline">المدير</span>
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
            <User size={18} />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">نظام إدارة المقهى</h2>
      </div>
    </header>
  );
};

export default Header;
