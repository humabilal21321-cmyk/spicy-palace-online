import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Star, Users, Clock, MapPin, Phone, Mail, ChefHat, ArrowRight, CalendarDays } from "lucide-react";
import { useState } from "react";
import { menuItems } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import { toast } from "sonner";

const testimonials = [
  { name: "Ahmed Khan", text: "Best BBQ in Rawalpindi! The seekh kababs are unmatched. Truly a luxury dining experience.", rating: 5 },
  { name: "Sara Malik", text: "The ambiance, the flavors, the service — everything is perfect. Our family's favorite restaurant.", rating: 5 },
  { name: "Usman Ali", text: "Chicken Karahi here is absolutely divine. The Kallisto story makes dining here even more special.", rating: 5 },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
];

export default function HomePage() {
  const featured = menuItems.filter(i => i.popular).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop" alt="Hot & Spicy cuisine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/75" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Flame className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4">
              <span className="text-gradient-gold">Hot & Spicy</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Rawalpindi's premier luxury dining experience. Savor authentic flavors crafted with passion and the finest ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#reservation" className="inline-flex items-center justify-center gap-2 border border-gold/30 text-foreground px-8 py-3 rounded-lg font-body font-bold hover:bg-secondary transition-colors">
                Reserve a Table <CalendarDays className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-3">Featured Dishes</h2>
            <p className="text-muted-foreground font-body">Our most loved creations, handpicked for you</p>
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

      {/* About / KALLISTO Story */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop" alt="Restaurant interior" className="rounded-xl glow-gold" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-6">The KALLISTO Story</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Born from a passion for bringing the most beautiful flavors to Rawalpindi, <strong className="text-foreground">KALLISTO</strong> — meaning "most beautiful" in Greek — is the philosophy behind Hot & Spicy.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Every dish is a masterpiece, crafted by our award-winning chefs using traditional recipes passed down through generations, elevated with modern culinary techniques. From the sizzling grills to the aromatic karahis, we bring you Pakistan's soul on a plate.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <ChefHat className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-heading font-bold text-2xl text-foreground">15+</span>
                <p className="text-xs text-muted-foreground font-body">Expert Chefs</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-heading font-bold text-2xl text-foreground">50K+</span>
                <p className="text-xs text-muted-foreground font-body">Happy Customers</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-heading font-bold text-2xl text-foreground">10+</span>
                <p className="text-xs text-muted-foreground font-body">Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-3">What Our Guests Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card border border-gold/10 rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}
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
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> Saddar Road, Rawalpindi, Punjab, Pakistan</p>
              <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> +92 300 1234567</p>
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> info@hotandspicy.pk</p>
              <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> 12:00 PM – 12:00 AM (Daily)</p>
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
          <p className="text-muted-foreground font-body">Secure your spot for an unforgettable dining experience</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="bg-card border border-gold/10 rounded-xl p-6 space-y-4">
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full Name" className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Phone Number" className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
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
