import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders, type Order } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { LogOut, Package, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react";

const statusColors: Record<Order["orderStatus"], string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Preparing: "bg-blue-500/20 text-blue-400",
  "Out for Delivery": "bg-orange-500/20 text-orange-400",
  Delivered: "bg-green-500/20 text-green-400",
};

const statusIcons: Record<Order["orderStatus"], React.ReactNode> = {
  Pending: <Clock className="h-4 w-4" />,
  Preparing: <Package className="h-4 w-4" />,
  "Out for Delivery": <Truck className="h-4 w-4" />,
  Delivered: <CheckCircle className="h-4 w-4" />,
};

const allStatuses: Order["orderStatus"][] = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

export default function AdminPage() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrders();

  useEffect(() => {
    if (sessionStorage.getItem("hotspicy_admin") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("hotspicy_admin");
    navigate("/admin-login");
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === "Pending").length,
    preparing: orders.filter(o => o.orderStatus === "Preparing").length,
    delivered: orders.filter(o => o.orderStatus === "Delivered").length,
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-3xl font-bold text-gradient-gold">
            Admin Dashboard
          </motion.h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive font-body text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, icon: <Package className="h-5 w-5" />, color: "text-primary" },
            { label: "Pending", value: stats.pending, icon: <Clock className="h-5 w-5" />, color: "text-yellow-400" },
            { label: "Preparing", value: stats.preparing, icon: <AlertCircle className="h-5 w-5" />, color: "text-blue-400" },
            { label: "Delivered", value: stats.delivered, icon: <CheckCircle className="h-5 w-5" />, color: "text-green-400" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-gold/10 rounded-xl p-4">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-xs font-body">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body">
            No orders yet. Orders will appear here when customers place them.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-gold/10 rounded-xl p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-heading font-bold text-foreground text-lg">{order.id}</p>
                    <p className="text-muted-foreground text-xs font-body">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.orderStatus]}`}>
                    {statusIcons[order.orderStatus]}
                    {order.orderStatus}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-1">Customer</p>
                    <p className="text-foreground font-body text-sm font-bold">{order.customerName}</p>
                    <p className="text-muted-foreground font-body text-xs">{order.phone}</p>
                    <p className="text-muted-foreground font-body text-xs">{order.address}, {order.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-1">Items</p>
                    {order.items.map(item => (
                      <p key={item.id} className="text-foreground font-body text-xs">
                        {item.name} × {item.quantity} — Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body mb-1">Payment</p>
                    <p className="text-foreground font-body text-sm">{order.paymentMethod}</p>
                    <p className="text-primary font-heading font-bold text-lg mt-1">Rs. {order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground font-body mr-2 self-center">Update:</span>
                  {allStatuses.map(s => (
                    <button
                      key={s}
                      onClick={() => updateOrderStatus(order.id, s)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                        order.orderStatus === s
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-gold/10 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
