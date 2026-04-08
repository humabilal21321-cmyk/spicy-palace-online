import { useState } from "react";
import { useMenu, type ManagedMenuItem } from "@/context/MenuContext";
import { Plus, Edit2, Trash2, Ban, Check, Search, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminMenu() {
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem, toggleOutOfStock, addCategory } = useMenu();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", image: "", spicy: false, popular: false });
  const [newCategory, setNewCategory] = useState("");

  const filtered = menuItems.filter(i =>
    (catFilter === "All" || i.category === catFilter) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", category: "", image: "", spicy: false, popular: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price and category are required"); return;
    }
    if (editingId) {
      updateMenuItem(editingId, { ...form, price: Number(form.price) });
      toast.success("Item updated");
    } else {
      const id = "mi-" + Date.now();
      addMenuItem({ id, ...form, price: Number(form.price), outOfStock: false } as ManagedMenuItem);
      toast.success("Item added");
    }
    resetForm();
  };

  const startEdit = (item: ManagedMenuItem) => {
    setForm({ name: item.name, price: String(item.price), description: item.description, category: item.category, image: item.image, spicy: !!item.spicy, popular: !!item.popular });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) { addCategory(newCategory.trim()); setNewCategory(""); toast.success("Category added"); }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items..."
            className="w-full pl-9 pr-4 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/30 hover:bg-primary/30 transition-all">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${catFilter === c ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Add Category */}
      <div className="flex items-center gap-2 mb-6">
        <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="New category..."
          className="px-3 py-1.5 bg-secondary border border-gold/10 rounded-lg text-foreground text-xs font-body focus:outline-none focus:border-primary" />
        <button onClick={handleAddCategory} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30">Add Category</button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-card border border-gold/10 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-foreground">{editingId ? "Edit Item" : "Add New Item"}</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Item name"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="Price (Rs.)" type="number"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary md:col-span-2" />
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary">
              <option value="">Select Category</option>
              {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="Image URL"
              className="px-3 py-2 bg-secondary border border-gold/10 rounded-lg text-foreground text-sm font-body focus:outline-none focus:border-primary" />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-foreground font-body cursor-pointer">
                <input type="checkbox" checked={form.spicy} onChange={e => setForm(p => ({ ...p, spicy: e.target.checked }))} className="accent-primary" /> Spicy
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground font-body cursor-pointer">
                <input type="checkbox" checked={form.popular} onChange={e => setForm(p => ({ ...p, popular: e.target.checked }))} className="accent-primary" /> Popular
              </label>
            </div>
          </div>
          <button onClick={handleSubmit} className="mt-4 px-6 py-2 rounded-lg text-sm font-bold bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all">
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </div>
      )}

      {/* Items Table */}
      <div className="space-y-2">
        {filtered.map(item => (
          <div key={item.id} className={`flex items-center gap-4 bg-card border border-gold/10 rounded-xl p-3 ${item.outOfStock ? "opacity-50" : ""}`}>
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground text-sm truncate">{item.name}</p>
              <p className="text-muted-foreground text-xs font-body">{item.category}</p>
            </div>
            <p className="text-primary font-heading font-bold text-sm whitespace-nowrap">Rs. {item.price}</p>
            {item.outOfStock && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400">Out of Stock</span>}
            <div className="flex items-center gap-1">
              <button onClick={() => toggleOutOfStock(item.id)} title={item.outOfStock ? "Mark Available" : "Mark Out of Stock"}
                className={`p-1.5 rounded-lg transition-colors ${item.outOfStock ? "text-emerald-400 hover:bg-emerald-500/10" : "text-yellow-400 hover:bg-yellow-500/10"}`}>
                {item.outOfStock ? <Check className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
              </button>
              <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => deleteMenuItem(item.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs font-body mt-4">{filtered.length} items shown</p>
    </div>
  );
}
