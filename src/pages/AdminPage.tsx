import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { LogOut, Package, Clock, Truck, CheckCircle, XCircle, ShieldCheck, BarChart3, UtensilsCrossed, CalendarDays, Warehouse, Users, MessageSquare, AlertCircle } from "lucide-react";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminMenu from "@/components/admin/AdminMenu";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminReservations from "@/components/admin/AdminReservations";
import AdminInventory from "@/components/admin/AdminInventory";
import AdminStaff from "@/components/admin/AdminStaff";
import AdminReviews from "@/components/admin/AdminReviews";

const tabs = [
  { id: "orders", label: "Orders", icon: <Package className="h-4 w-4" /> },
  { id: "menu", label: "Menu", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "reservations", label: "Reservations", icon: <CalendarDays className="h-4 w-4" /> },
  { id: "inventory", label: "Inventory", icon: <Warehouse className="h-4 w-4" /> },
  { id: "staff", label: "Staff", icon: <Users className="h-4 w-4" /> },
  { id: "reviews", label: "Reviews", icon: <MessageSquare className="h-4 w-4" /> },
] as const;

type TabId = typeof tabs[number]["id"];

export default function AdminPage() {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<TabId>("orders");

  useEffect(() => {
    if (sessionStorage.getItem("hotspicy_admin") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("hotspicy_admin");
    navigate("/admin-login");
  };

  const revenue = orders.filter(o => o.order_status !== "Cancelled").reduce((s, o) => s + o.total_price, 0);

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold">
            Admin Dashboard
          </motion.h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive font-body text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Quick Stats */}
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

        {/* Tabs */}
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

        {/* Tab Content */}
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
