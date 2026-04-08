import { useState } from "react";
import { useStaff, type StaffMember } from "@/context/StaffContext";
import { Plus, Edit2, Trash2, X, UserCheck, Clock, UserX } from "lucide-react";
import { toast } from "sonner";

const statusColors: Record<StaffMember["status"], string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  "On Leave": "bg-yellow-500/20 text-yellow-400",
  "Off Duty": "bg-secondary text-muted-foreground",
};

const roleColors: Record<StaffMember["role"], string> = {
  Chef: "text-orange-400",
  Waiter: "text-blue-400",
  Manager: "text-primary",
  Delivery: "text-emerald-400",
  Cashier: "text-yellow-400",
};

export default function AdminStaff() {
  const { staff, addStaff, updateStaff, deleteStaff } = useStaff();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "Waiter" as StaffMember["role"], phone: "", shift: "Morning" as StaffMember["shift"], status: "Active" as StaffMember["status"], attendance: "100" });

  const resetForm = () => { setForm({ name: "", role: "Waiter", phone: "", shift: "Morning", status: "Active", attendance: "100" }); setEditingId(null); setShowForm(false); };

  const handleSubmit = () => {
    if (!form.name || !form.phone) { toast.error("Name and phone required"); return; }
    if (editingId) {
      updateStaff(editingId, { ...form, attendance: Number(form.attendance) });
      toast.success("Updated");
    } else {
      addStaff({ id: "s-" + Date.now(), ...form, attendance: Number(form.attendance), joinedAt: new Date().toISOString().split("T")[0] });
      toast.success("Staff added");
    }
    resetForm();
  };

  const startEdit = (s: StaffMember) => {
    setForm({ name: s.name, role: s.role, phone: s.phone, shift: s.shift, status: s.status, attendance: String(s.attendance) });
    setEditingId(s.id); setShowForm(true);
  };

  const stats = {
    active: staff.filter(s => s.status === "Active").length,
    onLeave: staff.filter(s => s.status === "On Leave").length,
    offDuty: staff.filter(s => s.status === "Off Duty").length,
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-gold/10 rounded-xl p-4 text-center">
          <UserCheck className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
          <p className="font-heading text-2xl font-bold text-foreground">{stats.active}</p>
          <p className="text-muted-foreground text-xs font-body">Active</p>
        </div>
        <div className="bg-card border border-gold/10 rounded-xl p-4 text-center">
          <Clock className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
          <p className="font-heading text-2xl font-bold text-foreground">{stats.onLeave}</p>
          <p className="text-muted-foreground text-xs font-body">On Leave</p>
        </div>
        <div className="bg-card border border-gold/10 rounded-xl p-4 text-center">
          <UserX className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
          <p className="font-heading text-2xl font-bold text-foreground">{stats.offDuty}</p>
          <p className="text-muted-foreground text-xs font-body">Off Duty</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm font-body">{staff.length} team members</p>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/30 hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Staff
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-gold/10 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-foreground">{editingId ? "Edit" : "Add"} Staff</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Phone"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value as StaffMember["role"] }))}
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary">
              {["Chef", "Waiter", "Manager", "Delivery", "Cashier"].map(r => <option key={r}>{r}</option>)}
            </select>
            <select value={form.shift} onChange={e => setForm(p => ({ ...p, shift: e.target.value as StaffMember["shift"] }))}
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary">
              {["Morning", "Evening", "Night"].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as StaffMember["status"] }))}
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary">
              {["Active", "On Leave", "Off Duty"].map(s => <option key={s}>{s}</option>)}
            </select>
            <input value={form.attendance} onChange={e => setForm(p => ({ ...p, attendance: e.target.value }))} placeholder="Attendance %" type="number"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
          </div>
          <button onClick={handleSubmit} className="mt-4 px-6 py-2 rounded-lg text-sm font-bold bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
            {editingId ? "Update" : "Add"} Staff
          </button>
        </div>
      )}

      <div className="space-y-2">
        {staff.map(s => (
          <div key={s.id} className="flex items-center gap-4 bg-card border border-gold/10 rounded-xl p-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-sm">
              {s.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground text-sm">{s.name}</p>
              <p className={`text-xs font-bold ${roleColors[s.role]}`}>{s.role} · {s.shift} Shift</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[s.status]}`}>{s.status}</span>
            <div className="text-right">
              <p className="text-foreground font-bold text-sm">{s.attendance}%</p>
              <p className="text-muted-foreground text-xs font-body">attendance</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => deleteStaff(s.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
