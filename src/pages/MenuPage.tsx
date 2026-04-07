import { useState, useRef } from "react";
import { menuItems, categories } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = menuItems.filter(item => {
    const matchCat = active === "All" || item.category === active;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

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

        {/* Categories with scroll */}
        <div className="relative mb-10">
          <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-gold/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground md:hidden">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-8 md:px-0 md:flex-wrap md:justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} className={`whitespace-nowrap px-4 py-2 rounded-full font-body text-sm font-bold transition-all shrink-0 ${active === cat ? "bg-gradient-gold text-primary-foreground" : "bg-card border border-gold/10 text-muted-foreground hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-gold/10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground md:hidden">
            <ChevronRight className="h-4 w-4" />
          </button>
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
