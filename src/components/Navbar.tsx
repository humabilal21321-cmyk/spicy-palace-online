import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Featured Dishes", href: "/#featured" },
  { name: "About", href: "/#about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Reservation", href: "/#reservation" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname !== "/") {
        window.location.href = href;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-7 w-7 text-primary" />
          <span className="font-heading text-xl md:text-2xl font-bold text-gradient-gold">Hot & Spicy</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            link.href.startsWith("/#") ? (
              <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-sm font-body tracking-wide text-foreground/80 hover:text-primary transition-colors">
                {link.name}
              </button>
            ) : (
              <Link key={link.name} to={link.href} className="text-sm font-body tracking-wide text-foreground/80 hover:text-primary transition-colors">
                {link.name}
              </Link>
            )
          ))}
          <button onClick={() => setIsCartOpen(true)} className="relative text-foreground/80 hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative text-foreground/80">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-background border-t border-gold/10 overflow-hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                link.href.startsWith("/#") ? (
                  <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-left text-foreground/80 hover:text-primary transition-colors font-body">
                    {link.name}
                  </button>
                ) : (
                  <Link key={link.name} to={link.href} onClick={() => setMobileOpen(false)} className="text-foreground/80 hover:text-primary transition-colors font-body">
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
