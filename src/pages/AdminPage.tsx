import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { LogOut, Package, Clock, CheckCircle, BarChart3, UtensilsCrossed, CalendarDays, Warehouse, Users, MessageSquare, Loader2, Bike } from "lucide-react";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminMenu from "@/components/admin/AdminMenu";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminReservations from "@/components/admin/AdminReservations";
import AdminInventory from "@/components/admin/AdminInventory";
import AdminStaff from "@/components/admin/AdminStaff";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminDelivery from "@/components/admin/AdminDelivery";

const tabs = [
  { id: "orders", label: "Orders", icon: <Package className="h-4 w-4" /> },
  { id: "menu", label: "Menu", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "reservations", label: "Reservations", icon: <CalendarDays className="h-4 w-4" /> },
  { id: "inventory", label: "Inventory", icon: <Warehouse className="h-4 w-4" /> },
  { id: "staff", label: "Staff", icon: <Users className="h-4 w-4" /> },
  { id: "reviews", label: "Reviews", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "delivery", label: "Delivery", icon: <Bike className="h-4 w-4" /> },
] as const;

type TabId = typeof tabs[number]["id"];

export default function AdminPage() {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<TabId>("orders");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin-login");
        return;
      }
      setChecking(false);
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (checking) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-dark">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const revenue = orders.filter(o => o.order_status !== "Cancelled").reduce((s, o) => s + o.total_price, 0);

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold">
            Admin Dashboard
          </motion.h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive font-body text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Orders", value: orders.length, icon: <Package className="h-4 w-4" />, color: "text-primary" },
            { label: "Pending", value: orders.filter(o => o.order_status === "Pending").length, icon: <Clock className="h-4 w-4" />, color: "text-yellow-400" },
            { label: "Delivered", value: orders.filter(o => o.order_status === "Delivered").length, icon: <CheckCircle className="h-4 w-4" />, color: "text-green-400" },
            { label: "Revenue", value: `Rs. ${revenue.toLocaleString()}`, icon: <BarChart3 className="h-4 w-4" />, color: "text-primary" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-gold/10 rounded-xl p-3">
              <div className={`${s.color} mb-1`}>{s.icon}</div>
              <p className="font-heading text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-xs font-body">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "menu" && <AdminMenu />}
          {activeTab === "analytics" && <AdminAnalytics />}
          {activeTab === "reservations" && <AdminReservations />}
          {activeTab === "inventory" && <AdminInventory />}
          {activeTab === "staff" && <AdminStaff />}
          {activeTab === "reviews" && <AdminReviews />}
        </motion.div>
      </div>
    </div>
  );
}
