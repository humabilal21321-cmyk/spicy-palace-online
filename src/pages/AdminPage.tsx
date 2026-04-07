import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders, type Order } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { LogOut, Package, Clock, Truck, CheckCircle, AlertCircle, XCircle, ShieldCheck, Trash2, Filter } from "lucide-react";

const statusColors: Record<Order["orderStatus"], string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Confirmed: "bg-emerald-500/20 text-emerald-400",
  Preparing: "bg-blue-500/20 text-blue-400",
  "Out for Delivery": "bg-orange-500/20 text-orange-400",
  Delivered: "bg-green-500/20 text-green-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

const statusIcons: Record<Order["orderStatus"], React.ReactNode> = {
  Pending: <Clock className="h-4 w-4" />,
  Confirmed: <ShieldCheck className="h-4 w-4" />,
  Preparing: <Package className="h-4 w-4" />,
  "Out for Delivery": <Truck className="h-4 w-4" />,
  Delivered: <CheckCircle className="h-4 w-4" />,
  Cancelled: <XCircle className="h-4 w-4" />,
};

const allStatuses: Order["orderStatus"][] = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

type FilterStatus = "All" | Order["orderStatus"];
const filterOptions: FilterStatus[] = ["All", ...allStatuses];

export default function AdminPage() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("hotspicy_admin") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("hotspicy_admin");
    navigate("/admin-login");
  };

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.orderStatus === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === "Pending").length,
    confirmed: orders.filter(o => o.orderStatus === "Confirmed").length,
    preparing: orders.filter(o => o.orderStatus === "Preparing").length,
    outForDelivery: orders.filter(o => o.orderStatus === "Out for Delivery").length,
    delivered: orders.filter(o => o.orderStatus === "Delivered").length,
    cancelled: orders.filter(o => o.orderStatus === "Cancelled").length,
  };

  const revenue = orders
    .filter(o => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Total Orders", value: stats.total, icon: <Package className="h-5 w-5" />, color: "text-primary" },
            { label: "Pending", value: stats.pending, icon: <Clock className="h-5 w-5" />, color: "text-yellow-400" },
            { label: "Confirmed", value: stats.confirmed, icon: <ShieldCheck className="h-5 w-5" />, color: "text-emerald-400" },
            { label: "Preparing", value: stats.preparing, icon: <AlertCircle className="h-5 w-5" />, color: "text-blue-400" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-gold/10 rounded-xl p-4">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-xs font-body">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Out for Delivery", value: stats.outForDelivery, icon: <Truck className="h-5 w-5" />, color: "text-orange-400" },
            { label: "Delivered", value: stats.delivered, icon: <CheckCircle className="h-5 w-5" />, color: "text-green-400" },
            { label: "Cancelled", value: stats.cancelled, icon: <XCircle className="h-5 w-5" />, color: "text-red-400" },
            { label: "Revenue", value: `Rs. ${revenue.toLocaleString()}`, icon: <Package className="h-5 w-5" />, color: "text-primary" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-gold/10 rounded-xl p-4">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className="font-heading text-2xl font-bold text-foreground">{typeof s.value === 'number' ? s.value : s.value}</p>
              <p className="text-muted-foreground text-xs font-body">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filterOptions.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                filter === f
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-gold/10 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {f} {f !== "All" && `(${orders.filter(o => o.orderStatus === f).length})`}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body">
            {filter === "All" ? "No orders yet. Orders will appear here when customers place them." : `No ${filter} orders.`}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-card border rounded-xl p-5 ${order.orderStatus === "Cancelled" ? "border-red-500/20 opacity-70" : "border-gold/10"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-heading font-bold text-foreground text-lg">{order.id}</p>
                    <p className="text-muted-foreground text-xs font-body">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.orderStatus]}`}>
                      {statusIcons[order.orderStatus]}
                      {order.orderStatus}
                    </div>
                    {/* Delete button */}
                    {confirmDelete === order.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => { deleteOrder(order.id); setConfirmDelete(null); }} className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/30">Yes, Delete</button>
                        <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded bg-secondary text-muted-foreground text-xs font-bold hover:bg-secondary/80">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDelete(order.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete Order">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
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
                    <p className={`text-xs font-bold mt-0.5 ${order.paymentStatus === "Paid" ? "text-green-400" : "text-yellow-400"}`}>{order.paymentStatus}</p>
                    <p className="text-primary font-heading font-bold text-lg mt-1">Rs. {order.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                {order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {order.orderStatus === "Pending" && (
                      <>
                        <button onClick={() => updateOrderStatus(order.id, "Confirmed")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5" /> Confirm Order
                        </button>
                        <button onClick={() => updateOrderStatus(order.id, "Cancelled")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all flex items-center gap-1">
                          <XCircle className="h-3.5 w-3.5" /> Cancel Order
                        </button>
                      </>
                    )}
                    {order.orderStatus === "Confirmed" && (
                      <button onClick={() => updateOrderStatus(order.id, "Preparing")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" /> Start Preparing
                      </button>
                    )}
                    {order.orderStatus === "Preparing" && (
                      <button onClick={() => updateOrderStatus(order.id, "Out for Delivery")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-all flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5" /> Send for Delivery
                      </button>
                    )}
                    {order.orderStatus === "Out for Delivery" && (
                      <button onClick={() => updateOrderStatus(order.id, "Delivered")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> Mark Delivered
                      </button>
                    )}
                  </div>
                )}

                {/* All Status Options */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground font-body mr-2 self-center">Set status:</span>
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
