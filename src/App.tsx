import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CardInventory from "./pages/CardInventory";
import Sessions from "./pages/Sessions";
import POS from "./pages/POS";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RequireAuth from "./auth/RequireAuth";
import LoginPage from "./pages/Login"; 
import { AuthProvider } from "./auth/AuthContext";
import Suppliers from "./pages/Suppliers";
import Subscripers from "./pages/Subscripers";
import SubscriperReport from "./pages/SubscriperReport";
import Revenues from "./pages/Revenues";
import SupplierReport from "./pages/SupplierReport";
import Expenses from "./pages/Expenses";
import CollectionBillings from "./pages/CollectionBillings";
import SalesPoints from "./pages/SalesPoints";
import SalesPointReport from "./pages/SalesPointReport";
import PoinCollectionBillings from "./pages/PointCollectionBilling";
import SupplierCollectionBillings from "./pages/SupplierCollectionBillings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <BrowserRouter> */}
      <HashRouter>
        <AuthProvider>
          <Routes>
            {/* صفحة تسجيل الدخول */}
            <Route path="/login" element={<LoginPage />} />

            {/* صفحات تتطلب تسجيل دخول */}
            <Route path="/" element={<RequireAuth><Sessions /></RequireAuth>} />
            <Route path="/card-inventory" element={<RequireAuth><CardInventory /></RequireAuth>} />
            <Route path="/subscripers" element={<RequireAuth><Subscripers /></RequireAuth>} />
            <Route
              path="/subscripers/:id/report"
              element={
                <RequireAuth>
                  <SubscriperReport />
                </RequireAuth>
              }
            />
            {/* <Route path="/sessions" element={<RequireAuth><Sessions /></RequireAuth>} /> */}
            <Route path="/collection-billings" element={<RequireAuth><CollectionBillings /></RequireAuth>} />
            <Route path="/poin-collection-billings" element={<RequireAuth><PoinCollectionBillings /></RequireAuth>} />
            <Route path="/supplier-collection-billings" element={<RequireAuth><SupplierCollectionBillings /></RequireAuth>} />
            <Route path="/revenues" element={<RequireAuth><Revenues /></RequireAuth>} />
            <Route path="/expenses" element={<RequireAuth><Expenses /></RequireAuth>} />
            <Route path="/pos" element={<RequireAuth><POS /></RequireAuth>} />
            <Route path="/reports" element={<RequireAuth><Reports /></RequireAuth>} />
            <Route path="/suppliers" element={<RequireAuth><Suppliers /></RequireAuth>} />
            <Route path="/sales-points" element={<RequireAuth><SalesPoints /></RequireAuth>} />
            <Route
              path="/suppliers/:id/report"
              element={
                <RequireAuth>
                  <SupplierReport />
                </RequireAuth>
              }
            />
            <Route
              path="/sales-points/:id/report"
              element={
                <RequireAuth>
                  <SalesPointReport />
                </RequireAuth>
              }
            />
            <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            
            {/* صفحة غير موجودة */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        </HashRouter>
      {/* </BrowserRouter> */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
