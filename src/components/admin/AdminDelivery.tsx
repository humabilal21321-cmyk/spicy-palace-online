import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useOrders } from "@/context/OrderContext";
import { toast } from "sonner";
import { Bike, CheckCircle, UserCheck, UserX, Package, Loader2 } from "lucide-react";

interface Rider {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  vehicle_type: string;
  is_available: boolean;
  is_approved: boolean;
  total_deliveries: number;
  total_earnings: number;
}

interface Assignment {
  id: string;
  order_id: string;
  rider_id: string;
  status: string;
  earnings: number;
  order_code?: string;
  rider_name?: string;
}

export default function AdminDelivery() {
  const { orders } = useOrders();
  const [riders, setRiders] = useState<Rider[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedRider, setSelectedRider] = useState("");
  const [earningsAmount, setEarningsAmount] = useState("100");

  const fetchRiders = useCallback(async () => {
    const { data } = await supabase.from("delivery_riders").select("*").order("created_at", { ascending: false });
    if (data) setRiders(data as unknown as Rider[]);
  }, []);

  const fetchAssignments = useCallback(async () => {
    const { data } = await supabase.from("delivery_assignments").select("*, orders(order_code), delivery_riders(name)").order("created_at", { ascending: false });
    if (data) {
      setAssignments(data.map((d: any) => ({
        ...d,
        order_code: d.orders?.order_code,
        rider_name: d.delivery_riders?.name,
      })));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRiders();
    fetchAssignments();
  }, [fetchRiders, fetchAssignments]);

  const approveRider = async (id: string, approve: boolean) => {
    await supabase.from("delivery_riders").update({ is_approved: approve }).eq("id", id);
    toast.success(approve ? "Rider approved" : "Rider rejected");
    fetchRiders();
  };

  const assignOrder = async () => {
    if (!selectedOrder || !selectedRider) { toast.error("Select order and rider"); return; }
    const { error } = await supabase.from("delivery_assignments").insert({
      order_id: selectedOrder,
      rider_id: selectedRider,
      earnings: Number(earningsAmount) || 100,
    });
    if (error) { toast.error("Failed: " + error.message); return; }

    await supabase.from("orders").update({ delivery_status: "assigned" }).eq("id", selectedOrder);
    toast.success("Order assigned to rider");
    setSelectedOrder("");
    setSelectedRider("");
    fetchAssignments();
  };

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  const unassignedOrders = orders.filter(o => o.order_status !== "Cancelled" && o.order_status !== "Delivered" && !assignments.find(a => a.order_id === o.id && a.status !== "cancelled"));
  const availableRiders = riders.filter(r => r.is_approved && r.is_available);

  return (
    <div className="space-y-6">
      {/* Assign Order */}
      <div className="bg-card border border-gold/10 rounded-xl p-5 space-y-4">
        <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" /> Assign Delivery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select value={selectedOrder} onChange={e => setSelectedOrder(e.target.value)}
            className="bg-secondary/50 border border-gold/10 rounded-lg px-3 py-2.5 font-body text-sm text-foreground">
            <option value="">Select Order</option>
            {unassignedOrders.map(o => (
              <option key={o.id} value={o.id}>{o.order_code} - {o.customer_name}</option>
            ))}
          </select>
          <select value={selectedRider} onChange={e => setSelectedRider(e.target.value)}
            className="bg-secondary/50 border border-gold/10 rounded-lg px-3 py-2.5 font-body text-sm text-foreground">
            <option value="">Select Rider</option>
            {availableRiders.map(r => (
              <option key={r.id} value={r.id}>{r.name} ({r.vehicle_type})</option>
            ))}
          </select>
          <input type="number" value={earningsAmount} onChange={e => setEarningsAmount(e.target.value)} placeholder="Earnings (Rs.)"
            className="bg-secondary/50 border border-gold/10 rounded-lg px-3 py-2.5 font-body text-sm text-foreground" />
          <button onClick={assignOrder} className="bg-gradient-gold text-primary-foreground rounded-lg px-4 py-2.5 font-body font-bold text-sm hover:opacity-90 transition-opacity">
            Assign
          </button>
        </div>
      </div>

      {/* Riders */}
      <div className="bg-card border border-gold/10 rounded-xl p-5">
        <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Bike className="h-5 w-5 text-primary" /> Riders ({riders.length})
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {riders.map(r => (
            <div key={r.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
              <div>
                <p className="text-foreground text-sm font-bold font-body">{r.name}</p>
                <p className="text-muted-foreground text-xs font-body">{r.phone} · {r.vehicle_type} · {r.total_deliveries} deliveries</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${r.is_available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {r.is_available ? "Online" : "Offline"}
                </span>
                {!r.is_approved ? (
                  <div className="flex gap-1">
                    <button onClick={() => approveRider(r.id, true)} className="p-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                      <UserCheck className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => approveRider(r.id, false)} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                      <UserX className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-green-400 font-bold">✓ Approved</span>
                )}
              </div>
            </div>
          ))}
          {riders.length === 0 && <p className="text-muted-foreground text-sm font-body text-center py-4">No riders registered yet</p>}
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-card border border-gold/10 rounded-xl p-5">
        <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" /> Assignments
        </h3>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {assignments.slice(0, 20).map(a => (
            <div key={a.id} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
              <div>
                <p className="text-foreground text-sm font-bold font-body">#{a.order_code} → {a.rider_name}</p>
                <p className="text-muted-foreground text-xs font-body">Rs. {a.earnings} earning</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                a.status === "delivered" ? "bg-green-500/20 text-green-400" :
                a.status === "picked_up" ? "bg-blue-500/20 text-blue-400" :
                a.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                "bg-yellow-500/20 text-yellow-400"
              }`}>
                {a.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
          ))}
          {assignments.length === 0 && <p className="text-muted-foreground text-sm font-body text-center py-4">No assignments yet</p>}
        </div>
      </div>
    </div>
  );
}
