import { UtensilsCrossed, MapPin, Phone, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-gold/10 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-bold text-gradient-gold">Walkano</span>
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Delicious fast food delivered to your doorstep. Dine-in, takeaway & delivery in Rawalpindi & Islamabad.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-bold text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-muted-foreground hover:text-primary text-sm font-body transition-colors">Home</Link>
            <Link to="/menu" className="text-muted-foreground hover:text-primary text-sm font-body transition-colors">Menu</Link>
            <Link to="/checkout" className="text-muted-foreground hover:text-primary text-sm font-body transition-colors">Order Now</Link>
            <Link to="/admin-login" className="text-muted-foreground hover:text-primary text-sm font-body transition-colors">Admin</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold text-foreground mb-4">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground font-body">
            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Shop #1&2, PZ Commercial, Gulshanabad, Adyala Road, Rawalpindi</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" /> 0326-0759528 | 0315-5955613</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@walkano.pk</p>
            <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 11:00 AM – 1:00 AM</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gold/10 text-center text-xs text-muted-foreground font-body">
        © 2026 Walkano. All rights reserved.
      </div>
    </footer>
  );
}
