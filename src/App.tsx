import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { MenuProvider } from "@/context/MenuContext";
import { ReservationProvider } from "@/context/ReservationContext";
import { InventoryProvider } from "@/context/InventoryContext";
import { StaffProvider } from "@/context/StaffContext";
import { ReviewProvider } from "@/context/ReviewContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MenuProvider>
        <CartProvider>
          <OrderProvider>
            <ReservationProvider>
              <InventoryProvider>
                <StaffProvider>
                  <ReviewProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Navbar />
                      <CartSidebar />
                      <WhatsAppButton />
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/admin-login" element={<AdminLoginPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <Footer />
                    </BrowserRouter>
                  </ReviewProvider>
                </StaffProvider>
              </InventoryProvider>
            </ReservationProvider>
          </OrderProvider>
        </CartProvider>
      </MenuProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
