import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Clock, MapPin, Phone, Mail, UtensilsCrossed, ArrowRight, CalendarDays, Truck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { menuItems } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import { toast } from "sonner";

const testimonials = [
  { name: "Ahmed Khan", text: "The Zinger Burger is absolutely amazing! Best fast food in Rawalpindi. Taste is always consistent.", rating: 5 },
  { name: "Sara Malik", text: "Great food and affordable prices. The loaded fries are to die for! Delivery could be a bit faster though.", rating: 4 },
  { name: "Usman Ali", text: "Chicken Tikka Pizza is my favorite — perfectly spiced. Family Feast deal is great value for money.", rating: 5 },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
];

export default function HomePage() {
  const featured = menuItems.filter(i => i.popular).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1920&h=1080&fit=crop" alt="Hot & Spicy fast food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              <span className="text-gradient-gold">Hot & Spicy</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Delicious Fast Food Delivered to Your Doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity">
                View Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/menu" className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-body font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                Order Now <ShoppingBag className="h-4 w-4" />
              </Link>
              <a href="#reservation" className="inline-flex items-center justify-center gap-2 border border-gold/30 text-foreground px-8 py-3 rounded-lg font-body font-bold hover:bg-secondary transition-colors">
                Reserve Table <CalendarDays className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Bar */}
      <section className="py-6 bg-card border-y border-gold/10">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: UtensilsCrossed, label: "Dine-In" },
            { icon: ShoppingBag, label: "Takeaway" },
            { icon: Truck, label: "Delivery" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 text-muted-foreground font-body">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-3">Featured Dishes</h2>
            <p className="text-muted-foreground font-body">Our most popular picks, loved by thousands</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-body font-bold hover:underline">
              View Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=500&fit=crop" alt="Hot & Spicy restaurant" className="rounded-xl glow-gold" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-6">Our Story</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              <strong className="text-foreground">Hot & Spicy</strong> was born from a simple idea — bring the tastiest, most affordable fast food to the people of Rawalpindi and Islamabad.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              From our signature Zinger Burgers to our loaded pizzas, every item is crafted with fresh ingredients and bold flavors. We believe great food shouldn't cost a fortune — and that's the Hot & Spicy promise: unbeatable taste at unbeatable prices, whether you dine in, take away, or order delivery.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <UtensilsCrossed className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-heading font-bold text-2xl text-foreground">200+</span>
                <p className="text-xs text-muted-foreground font-body">Menu Items</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-heading font-bold text-2xl text-foreground">30K+</span>
                <p className="text-xs text-muted-foreground font-body">Happy Customers</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-heading font-bold text-2xl text-foreground">30 min</span>
                <p className="text-xs text-muted-foreground font-body">Avg Delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-3">What Our Customers Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card border border-gold/10 rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}
                  {Array.from({ length: 5 - t.rating }).map((_, j) => <Star key={`e-${j}`} className="h-4 w-4 text-muted" />)}
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-primary font-heading font-bold text-sm">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <ReservationSection />

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-3">Gallery</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="overflow-hidden rounded-xl">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-48 md:h-64 object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-6">Find Us</h2>
            <div className="space-y-4 font-body text-muted-foreground">
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> Shop #1&2, PZ Commercial, MR1, Gulshanabad, Adyala Road, Near Bank Al Habib, Rawalpindi</p>
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> 0326-0759528 | 0315-5955613 | 0315-5955183</p>
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> info@hotspicy.pk</p>
              <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> 11:00 AM – 1:00 AM (Daily)</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-gold/10 h-64 md:h-auto">
            <iframe
              title="Hot & Spicy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.5!2d73.047!3d33.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM2JzAwLjAiTiA3M8KwMDInNDkuMiJF!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ReservationSection() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success(`Table reserved for ${form.guests} guests on ${form.date} at ${form.time}. We'll confirm shortly!`);
    setForm({ name: "", phone: "", date: "", time: "", guests: "2" });
  };

  return (
    <section id="reservation" className="py-20">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-3">Reserve a Table</h2>
          <p className="text-muted-foreground font-body">Book your spot for a great dining experience</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="bg-card border border-gold/10 rounded-xl p-6 space-y-4">
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full Name" className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Phone Number (+92...)" className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={form.guests} onChange={e => setForm(p => ({ ...p, guests: e.target.value }))} className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(n => <option key={n} value={n}>{n} Guests</option>)}
          </select>
          <button type="submit" className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity">
            Reserve Now
          </button>
        </form>
      </div>
    </section>
  );
}
