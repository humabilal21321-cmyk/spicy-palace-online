import { Flame, Plus, Ban } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { ManagedMenuItem } from "@/context/MenuContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function MenuCard({ item }: { item: ManagedMenuItem }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    if (item.outOfStock) {
      toast.error(`${item.name} is currently out of stock`);
      return;
    }
    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-card border border-gold/10 rounded-xl overflow-hidden group hover:glow-gold transition-shadow duration-300 ${item.outOfStock ? "opacity-60" : ""}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-gradient-gold text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">Popular</span>
        )}
        {item.spicy && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-spicy/90 text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
            <Flame className="h-3 w-3" /> Spicy
          </span>
        )}
        {item.outOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="flex items-center gap-1.5 bg-red-500/90 text-white text-sm font-bold px-4 py-2 rounded-full">
              <Ban className="h-4 w-4" /> Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-bold text-foreground text-lg">{item.name}</h3>
        <p className="text-muted-foreground text-sm font-body mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-heading text-xl font-bold">Rs. {item.price}</span>
          <button onClick={handleAdd} disabled={item.outOfStock}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold font-body transition-opacity ${item.outOfStock ? "bg-secondary text-muted-foreground cursor-not-allowed" : "bg-gradient-gold text-primary-foreground hover:opacity-90"}`}>
            <Plus className="h-4 w-4" /> {item.outOfStock ? "Unavailable" : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
