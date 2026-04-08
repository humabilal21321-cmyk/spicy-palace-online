import { useState } from "react";
import { useInventory, type InventoryItem } from "@/context/InventoryContext";
import { Plus, Edit2, Trash2, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminInventory() {
  const { inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useInventory();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", category: "", quantity: "", unit: "kg", minStock: "" });

  const lowStock = inventory.filter(i => i.quantity <= i.minStock);

  const resetForm = () => { setForm({ name: "", category: "", quantity: "", unit: "kg", minStock: "" }); setEditingId(null); setShowForm(false); };

  const handleSubmit = () => {
    if (!form.name || !form.quantity) { toast.error("Name and quantity required"); return; }
    if (editingId) {
      updateInventoryItem(editingId, { ...form, quantity: Number(form.quantity), minStock: Number(form.minStock) });
      toast.success("Updated");
    } else {
      addInventoryItem({ id: "inv-" + Date.now(), ...form, quantity: Number(form.quantity), minStock: Number(form.minStock), lastUpdated: new Date().toISOString() });
      toast.success("Item added");
    }
    resetForm();
  };

  const startEdit = (item: InventoryItem) => {
    setForm({ name: item.name, category: item.category, quantity: String(item.quantity), unit: item.unit, minStock: String(item.minStock) });
    setEditingId(item.id); setShowForm(true);
  };

  return (
    <div>
      {lowStock.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <div>
            <p className="text-red-400 font-bold text-sm">Low Stock Alert!</p>
            <p className="text-red-400/80 text-xs font-body">{lowStock.map(i => i.name).join(", ")} — below minimum levels</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm font-body">{inventory.length} items tracked</p>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/30 hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-gold/10 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-foreground">{editingId ? "Edit" : "Add"} Inventory Item</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Item name"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Category"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} placeholder="Quantity" type="number"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <select value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary">
              {["kg", "liters", "pieces", "packs", "bags"].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <input value={form.minStock} onChange={e => setForm(p => ({ ...p, minStock: e.target.value }))} placeholder="Min. stock level" type="number"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
          </div>
          <button onClick={handleSubmit} className="mt-4 px-6 py-2 rounded-lg text-sm font-bold bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
            {editingId ? "Update" : "Add"} Item
          </button>
        </div>
      )}

      <div className="space-y-2">
        {inventory.map(item => (
          <div key={item.id} className={`flex items-center gap-4 bg-card border rounded-xl p-3 ${item.quantity <= item.minStock ? "border-red-500/30" : "border-gold/10"}`}>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground text-sm">{item.name}</p>
              <p className="text-muted-foreground text-xs font-body">{item.category}</p>
            </div>
            <div className="text-right">
              <p className={`font-heading font-bold text-sm ${item.quantity <= item.minStock ? "text-red-400" : "text-foreground"}`}>
                {item.quantity} {item.unit}
              </p>
              <p className="text-muted-foreground text-xs font-body">min: {item.minStock}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => deleteInventoryItem(item.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
