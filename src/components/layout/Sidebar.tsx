
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  Users, 
  Clock, 
  ShoppingCart, 
  BarChart, 
  Settings 
} from "lucide-react";

const navItems = [
  { title: "Dashboard", icon: <Home size={20} />, path: "/" },
  { title: "Card Inventory", icon: <CreditCard size={20} />, path: "/card-inventory" },
  { title: "Subscriptions", icon: <Users size={20} />, path: "/subscriptions" },
  { title: "Sessions", icon: <Clock size={20} />, path: "/sessions" },
  { title: "Point of Sale", icon: <ShoppingCart size={20} />, path: "/pos" },
  { title: "Reports", icon: <BarChart size={20} />, path: "/reports" },
  { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-center py-4">Café Management</h1>
      </div>
      <nav className="px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
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
