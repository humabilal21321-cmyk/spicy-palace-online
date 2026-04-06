import { useState } from "react";
import { menuItems, categories } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter(item => {
    const matchCat = active === "All" || item.category === active;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gradient-gold mb-3">Our Menu</h1>
          <p className="text-muted-foreground font-body">Discover our culinary masterpieces</p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dishes..." className="w-full bg-card border border-gold/10 rounded-full pl-10 pr-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className={`px-4 py-2 rounded-full font-body text-sm font-bold transition-all ${active === cat ? "bg-gradient-gold text-primary-foreground" : "bg-card border border-gold/10 text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(item => <MenuCard key={item.id} item={item} />)}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body py-12">No dishes found.</p>
        )}
      </div>
    </div>
  );
}
