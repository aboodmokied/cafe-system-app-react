
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        {/* Mobile sidebar toggle button */}
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="fixed z-50 bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu size={24} />
          </button>
        )}
        
        {/* Sidebar - only visible on desktop or when toggled on mobile */}
        <div className={`${isMobile ? 'fixed inset-0' : ''} ${isMobile && !showSidebar ? 'hidden' : ''}`}>
          {isMobile && showSidebar && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40" 
              onClick={() => setShowSidebar(false)}
              aria-label="إغلاق القائمة الجانبية"
            />
          )}
          <div className={`${isMobile ? 'z-50 relative' : ''} h-full`}>
            <Sidebar onClose={() => setShowSidebar(false)} />
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
