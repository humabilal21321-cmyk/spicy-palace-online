import { useState } from "react";
import { useReservations, type Reservation } from "@/context/ReservationContext";
import { Plus, Check, X, Clock, CalendarDays, Users, Trash2 } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<Reservation["status"], string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Confirmed: "bg-emerald-500/20 text-emerald-400",
  Cancelled: "bg-red-500/20 text-red-400",
  Completed: "bg-blue-500/20 text-blue-400",
};

export default function AdminReservations() {
  const { reservations, addReservation, updateReservation, deleteReservation } = useReservations();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customerName: "", phone: "", date: "", time: "", guests: "2", tableNumber: "", notes: "" });
  const [filter, setFilter] = useState<"All" | Reservation["status"]>("All");

  const filtered = filter === "All" ? reservations : reservations.filter(r => r.status === filter);

  const handleSubmit = () => {
    if (!form.customerName || !form.phone || !form.date || !form.time) {
      toast.error("Please fill required fields"); return;
    }
    addReservation({
      id: "RES-" + Date.now(),
      ...form,
      guests: Number(form.guests),
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
    setForm({ customerName: "", phone: "", date: "", time: "", guests: "2", tableNumber: "", notes: "" });
    setShowForm(false);
    toast.success("Reservation added");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {(["All", "Pending", "Confirmed", "Cancelled", "Completed"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === s ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
              {s} {s !== "All" && `(${reservations.filter(r => r.status === s).length})`}
            </button>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/30 hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-gold/10 rounded-xl p-5 mb-6">
          <h3 className="font-heading font-bold text-foreground mb-4">New Reservation</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))} placeholder="Customer Name *"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Phone *"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} type="date"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} type="time"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))} placeholder="Guests" type="number"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.tableNumber} onChange={e => setForm(p => ({ ...p, tableNumber: e.target.value }))} placeholder="Table Number (optional)"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Notes (optional)"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary md:col-span-2" />
          </div>
          <button onClick={handleSubmit} className="mt-4 px-6 py-2 rounded-lg text-sm font-bold bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
            Add Reservation
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center py-20 text-muted-foreground font-body">No reservations found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className="bg-card border border-gold/10 rounded-xl p-4 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <p className="font-heading font-bold text-foreground">{r.customerName}</p>
                <p className="text-muted-foreground text-xs font-body">{r.phone}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-body">
                <CalendarDays className="h-3.5 w-3.5" /> {r.date}
                <Clock className="h-3.5 w-3.5 ml-2" /> {r.time}
                <Users className="h-3.5 w-3.5 ml-2" /> {r.guests}
              </div>
              {r.tableNumber && <span className="text-xs font-bold text-primary">Table {r.tableNumber}</span>}
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[r.status]}`}>{r.status}</span>
              <div className="flex items-center gap-1">
                {r.status === "Pending" && (
                  <>
                    <button onClick={() => updateReservation(r.id, { status: "Confirmed" })} className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10"><Check className="h-4 w-4" /></button>
                    <button onClick={() => updateReservation(r.id, { status: "Cancelled" })} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"><X className="h-4 w-4" /></button>
                  </>
                )}
                {r.status === "Confirmed" && (
                  <button onClick={() => updateReservation(r.id, { status: "Completed" })} className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/10"><Check className="h-4 w-4" /></button>
                )}
                <button onClick={() => deleteReservation(r.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
