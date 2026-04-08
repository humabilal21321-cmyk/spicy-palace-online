import { useOrders, type Order } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Package, Clock, Truck, CheckCircle, XCircle, ShieldCheck, Trash2, Filter, MessageCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Confirmed: "bg-emerald-500/20 text-emerald-400",
  Preparing: "bg-blue-500/20 text-blue-400",
  "Out for Delivery": "bg-orange-500/20 text-orange-400",
  Delivered: "bg-green-500/20 text-green-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

const statusIcons: Record<string, React.ReactNode> = {
  Pending: <Clock className="h-4 w-4" />,
  Confirmed: <ShieldCheck className="h-4 w-4" />,
  Preparing: <Package className="h-4 w-4" />,
  "Out for Delivery": <Truck className="h-4 w-4" />,
  Delivered: <CheckCircle className="h-4 w-4" />,
  Cancelled: <XCircle className="h-4 w-4" />,
};

const allStatuses = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
type FilterStatus = "All" | string;
const filterOptions: FilterStatus[] = ["All", ...allStatuses];

function whatsappCustomer(order: Order, message?: string) {
  const phone = order.phone.replace(/[^0-9]/g, "");
  const formattedPhone = phone.startsWith("0") ? "92" + phone.slice(1) : phone.startsWith("92") ? phone : "92" + phone;
  const items = order.items.map(i => `${i.name} x${i.quantity}`).join(", ");
  const msg = message || `Hi ${order.customer_name}! Your order ${order.order_code} has been ${order.order_status}.\n\nItems: ${items}\nTotal: Rs. ${order.total_price.toLocaleString()}\n\nThank you for ordering from Hot & Spicy! 🌶️`;
  window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`, "_blank");
}

export default function AdminOrders() {
  const { orders, loading, updateOrderStatus, deleteOrder } = useOrders();
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.order_status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filterOptions.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${filter === f ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
            {f} {f !== "All" && `(${orders.filter(o => o.order_status === f).length})`}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-body">
          {filter === "All" ? "No orders yet." : `No ${filter} orders.`}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`bg-card border rounded-xl p-5 ${order.order_status === "Cancelled" ? "border-red-500/20 opacity-70" : "border-gold/10"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-heading font-bold text-foreground text-lg">{order.order_code}</p>
                  <p className="text-muted-foreground text-xs font-body">{new Date(order.created_at).toLocaleString()}</p>
                  {order.booking_date && (
                    <p className="text-primary text-xs font-body mt-0.5">
                      📅 Booking: {order.booking_date} {order.booking_time || ""}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[order.order_status] || ""}>
                    {statusIcons[order.order_status]} {order.order_status}
                  </Badge>
                  <button
                    onClick={() => whatsappCustomer(order)}
                    className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/10 transition-colors"
                    title="WhatsApp Customer"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  {confirmDelete === order.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => { deleteOrder(order.id); setConfirmDelete(null); }} className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/30">Yes</button>
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
                  <p className="text-foreground font-body text-sm font-bold">{order.customer_name}</p>
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
                  <p className="text-foreground font-body text-sm">{order.payment_method}</p>
                  <p className={`text-xs font-bold mt-0.5 ${order.payment_status === "Paid" ? "text-green-400" : "text-yellow-400"}`}>{order.payment_status}</p>
                  <p className="text-primary font-heading font-bold text-lg mt-1">Rs. {order.total_price.toLocaleString()}</p>
                </div>
              </div>

              {/* Quick action buttons */}
              {order.order_status !== "Cancelled" && order.order_status !== "Delivered" && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {order.order_status === "Pending" && (
                    <>
                      <button onClick={() => { updateOrderStatus(order.id, "Confirmed"); }} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> Confirm
                      </button>
                      <button onClick={() => updateOrderStatus(order.id, "Cancelled")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Cancel
                      </button>
                    </>
                  )}
                  {order.order_status === "Confirmed" && (
                    <button onClick={() => updateOrderStatus(order.id, "Preparing")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center gap-1">
                      <Package className="h-3.5 w-3.5" /> Start Preparing
                    </button>
                  )}
                  {order.order_status === "Preparing" && (
                    <button onClick={() => updateOrderStatus(order.id, "Out for Delivery")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-all flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" /> Send for Delivery
                    </button>
                  )}
                  {order.order_status === "Out for Delivery" && (
                    <button onClick={() => updateOrderStatus(order.id, "Delivered")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> Mark Delivered
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const msg = `Hi ${order.customer_name}! Your order ${order.order_code} status: ${order.order_status}. We'll keep you updated!\n\nHot & Spicy 🌶️`;
                      whatsappCustomer(order, msg);
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center gap-1"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Notify via WhatsApp
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground font-body mr-2 self-center">Set status:</span>
                {allStatuses.map(s => (
                  <button key={s} onClick={() => updateOrderStatus(order.id, s)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${order.order_status === s ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
