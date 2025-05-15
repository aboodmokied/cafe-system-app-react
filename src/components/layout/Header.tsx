
import React from "react";
import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Café Management System</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
            <User size={18} />
          </div>
          <span className="hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
