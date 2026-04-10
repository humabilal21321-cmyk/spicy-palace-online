import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useDelivery } from "@/context/DeliveryContext";
import { motion } from "framer-motion";
import { Bike, Package, CheckCircle, DollarSign, Clock, MapPin, Phone, LogOut, Loader2, Power, TruckIcon, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function DeliveryDashboard() {
  const navigate = useNavigate();
  const { rider, assignments, loading, toggleAvailability, updateAssignmentStatus } = useDelivery();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/delivery-login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "rider");

      if (!roles || roles.length === 0) { navigate("/delivery-login"); return; }
      setChecking(false);
    };
    check();
  }, [navigate]);

  if (checking || loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-dark">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!rider) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-dark">
        <p className="text-muted-foreground font-body">Rider profile not found. Please contact admin.</p>
      </div>
    );
  }

  const activeOrders = assignments.filter(a => a.status !== "delivered" && a.status !== "cancelled");
  const completedOrders = assignments.filter(a => a.status === "delivered");
  const totalEarnings = assignments.filter(a => a.status === "delivered").reduce((s, a) => s + a.earnings, 0);

  const handleStatusUpdate = async (id: string, status: string) => {
    await updateAssignmentStatus(id, status);
    const labels: Record<string, string> = {
      picked_up: "Pickup confirmed!",
      delivered: "Delivery confirmed!",
      cancelled: "Order cancelled",
    };
    toast.success(labels[status] || "Status updated");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/delivery-login");
  };

  const statusColors: Record<string, string> = {
    assigned: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    picked_up: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    delivered: "bg-green-500/20 text-green-400 border-green-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{rider.name}</h1>
            <p className="text-muted-foreground text-sm font-body flex items-center gap-1">
              <Bike className="h-3.5 w-3.5" /> {rider.vehicle_type} Rider
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleAvailability}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                rider.is_available
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }`}>
              <Power className="h-3.5 w-3.5" /> {rider.is_available ? "Online" : "Offline"}
            </button>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive p-2">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!rider.is_approved && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 text-center">
            <p className="text-yellow-400 font-body text-sm font-bold">⏳ Account pending approval from admin</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Active", value: activeOrders.length, icon: <Package className="h-4 w-4" />, color: "text-primary" },
            { label: "Delivered", value: completedOrders.length, icon: <CheckCircle className="h-4 w-4" />, color: "text-green-400" },
            { label: "Earnings", value: `Rs. ${totalEarnings.toLocaleString()}`, icon: <DollarSign className="h-4 w-4" />, color: "text-primary" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-gold/10 rounded-xl p-3 text-center">
              <div className={`${s.color} mb-1 flex justify-center`}>{s.icon}</div>
              <p className="font-heading text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-xs font-body">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Active Orders */}
        <h2 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <TruckIcon className="h-5 w-5 text-primary" /> Active Deliveries
        </h2>

        {activeOrders.length === 0 ? (
          <div className="bg-card border border-gold/10 rounded-xl p-8 text-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground font-body text-sm">No active deliveries right now</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {activeOrders.map(a => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-gold/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-foreground text-sm">
                    #{a.order?.order_code || "—"}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${statusColors[a.status]}`}>
                    {a.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>

                {a.order && (
                  <div className="space-y-1 text-sm font-body">
                    <p className="text-foreground flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {a.order.address}, {a.order.city}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {a.order.phone}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {format(new Date(a.assigned_at), "hh:mm a")}
                    </p>
                    <p className="text-primary font-bold">Rs. {a.order.total_price?.toLocaleString()}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {a.status === "assigned" && (
                    <button onClick={() => handleStatusUpdate(a.id, "picked_up")}
                      className="flex-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2 rounded-lg text-xs font-bold hover:bg-blue-500/30 transition-colors">
                      ✅ Confirm Pickup
                    </button>
                  )}
                  {a.status === "picked_up" && (
                    <button onClick={() => handleStatusUpdate(a.id, "delivered")}
                      className="flex-1 bg-green-500/20 text-green-400 border border-green-500/30 py-2 rounded-lg text-xs font-bold hover:bg-green-500/30 transition-colors">
                      ✅ Confirm Delivery
                    </button>
                  )}
                  {a.status !== "delivered" && a.status !== "cancelled" && (
                    <button onClick={() => handleStatusUpdate(a.id, "cancelled")}
                      className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-500/30 transition-colors">
                      Cancel
                    </button>
                  )}
                </div>

                {a.earnings > 0 && (
                  <p className="text-xs text-green-400 font-body font-bold">💰 Earning: Rs. {a.earnings.toLocaleString()}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Completed Orders */}
        <h2 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" /> Delivery History
        </h2>

        {completedOrders.length === 0 ? (
          <div className="bg-card border border-gold/10 rounded-xl p-6 text-center">
            <p className="text-muted-foreground font-body text-sm">No completed deliveries yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {completedOrders.slice(0, 10).map(a => (
              <div key={a.id} className="bg-card border border-gold/10 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-bold font-heading">#{a.order?.order_code}</p>
                  <p className="text-muted-foreground text-xs font-body">
                    {a.delivered_at ? format(new Date(a.delivered_at), "dd MMM, hh:mm a") : "—"}
                  </p>
                </div>
                <span className="text-green-400 text-sm font-bold font-body">
                  Rs. {a.earnings.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
