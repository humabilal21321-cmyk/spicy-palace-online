import { useOrders, type Order } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Package, Clock, Truck, CheckCircle, XCircle, ShieldCheck, Trash2, Filter } from "lucide-react";

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

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.orderStatus === filter);

  return (
    <div>
      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filterOptions.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${filter === f ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
            {f} {f !== "All" && `(${orders.filter(o => o.orderStatus === f).length})`}
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
              className={`bg-card border rounded-xl p-5 ${order.orderStatus === "Cancelled" ? "border-red-500/20 opacity-70" : "border-gold/10"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-heading font-bold text-foreground text-lg">{order.id}</p>
                  <p className="text-muted-foreground text-xs font-body">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.orderStatus]}`}>
                    {statusIcons[order.orderStatus]} {order.orderStatus}
                  </div>
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

              {order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {order.orderStatus === "Pending" && (
                    <>
                      <button onClick={() => updateOrderStatus(order.id, "Confirmed")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> Confirm
                      </button>
                      <button onClick={() => updateOrderStatus(order.id, "Cancelled")} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Cancel
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

              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground font-body mr-2 self-center">Set status:</span>
                {allStatuses.map(s => (
                  <button key={s} onClick={() => updateOrderStatus(order.id, s)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${order.orderStatus === s ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
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
