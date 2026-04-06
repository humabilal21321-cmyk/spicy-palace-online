import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, total, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-gold/20 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gold/10">
              <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground font-body">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 bg-secondary/50 rounded-lg p-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-bold text-sm text-foreground truncate">{item.name}</h4>
                        <p className="text-primary text-sm font-bold">Rs. {item.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-bold text-foreground w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => removeItem(item.id)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gold/10 space-y-3">
                  <div className="flex justify-between font-heading text-lg">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary font-bold">Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={clearCart} className="flex-1 py-2.5 rounded-lg border border-gold/30 text-foreground font-body text-sm hover:bg-secondary transition-colors">
                      Clear Cart
                    </button>
                    <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="flex-1 py-2.5 rounded-lg bg-gradient-gold text-primary-foreground font-body text-sm font-bold text-center hover:opacity-90 transition-opacity">
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
