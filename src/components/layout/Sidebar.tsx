
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  Users, 
  Clock, 
  ShoppingCart, 
  BarChart, 
  Settings,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { title: "الرئيسية", icon: <Home size={20} />, path: "/" },
  { title: "بطاقات المخزون", icon: <CreditCard size={20} />, path: "/card-inventory" },
  { title: "الاشتراكات", icon: <Users size={20} />, path: "/subscriptions" },
  { title: "الجلسات", icon: <Clock size={20} />, path: "/sessions" },
  { title: "نقطة البيع", icon: <ShoppingCart size={20} />, path: "/pos" },
  { title: "التقارير", icon: <BarChart size={20} />, path: "/reports" },
  { title: "الإعدادات", icon: <Settings size={20} />, path: "/settings" },
];

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <aside className="w-64 bg-white border-l border-gray-200 h-full">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-center py-4">إدارة المقهى</h1>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => isMobile && onClose && onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
