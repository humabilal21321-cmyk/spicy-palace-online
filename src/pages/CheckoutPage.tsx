import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Order } from "@/context/OrderContext";

type Status = "form" | "success";

const paymentMethods = ["Cash on Delivery", "Credit/Debit Card", "PayFast", "Stripe", "JazzCash", "Easypaisa"];
const cities = ["Rawalpindi", "Islamabad"];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Rawalpindi" });
  const [payment, setPayment] = useState("Cash on Delivery");
  const [status, setStatus] = useState<Status>("form");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    if (items.length === 0) return;

    const id = "HS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const order: Order = {
      id,
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      items: [...items],
      total,
      paymentMethod: payment,
      paymentStatus: payment === "Cash on Delivery" ? "Pending" : "Paid",
      orderStatus: "Pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    // Send WhatsApp notification to admin
    const itemsList = items.map(i => `${i.name} x${i.quantity}`).join(", ");
    const whatsappMsg = encodeURIComponent(
      `🔔 New Order!\nOrder ID: ${id}\nCustomer: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}\nItems: ${itemsList}\nTotal: Rs. ${total.toLocaleString()}\nPayment: ${payment}`
    );
    window.open(`https://wa.me/92300123457?text=${whatsappMsg}`, "_blank");

    setOrderId(id);
    setStatus("success");
    clearCart();
  };

  if (status === "success") {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-dark">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-gold/10 rounded-xl p-8 max-w-md w-full mx-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground font-body mb-1">Order ID: <strong className="text-primary">{orderId}</strong></p>
          <p className="text-muted-foreground font-body mb-1">Payment: {payment}</p>
          <p className="text-muted-foreground font-body mb-2">Estimated delivery: <strong className="text-foreground">25-40 minutes</strong></p>
          <p className="text-muted-foreground font-body text-sm mb-6">Your order has been successfully placed. Our team will contact you shortly.</p>
          <Link to="/menu" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity">
            <ArrowLeft className="h-4 w-4" /> Order More
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-8 text-center">Checkout</h1>

          {items.length === 0 && status === "form" ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body mb-4">Your cart is empty</p>
              <Link to="/menu" className="text-primary font-body font-bold hover:underline">Browse Menu</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-5 gap-8">
              <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
                <div className="bg-card border border-gold/10 rounded-xl p-6 space-y-4">
                  <h3 className="font-heading font-bold text-foreground text-lg">Delivery Details</h3>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full Name" required className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Phone Number (+92...)" required className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Full Delivery Address" required className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <select value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="bg-card border border-gold/10 rounded-xl p-6 space-y-3">
                  <h3 className="font-heading font-bold text-foreground text-lg">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map(m => (
                      <button key={m} type="button" onClick={() => setPayment(m)} className={`px-3 py-2.5 rounded-lg font-body text-sm border transition-all ${payment === m ? "border-primary bg-primary/10 text-primary font-bold" : "border-gold/10 text-muted-foreground hover:border-primary/30"}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full bg-gradient-gold text-primary-foreground py-3.5 rounded-lg font-body font-bold text-lg hover:opacity-90 transition-opacity">
                  Place Order — Rs. {total.toLocaleString()}
                </button>
              </form>

              <div className="md:col-span-2">
                <div className="bg-card border border-gold/10 rounded-xl p-6 sticky top-24">
                  <h3 className="font-heading font-bold text-foreground text-lg mb-4">Order Summary</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm font-body">
                        <span className="text-foreground">{item.name} × {item.quantity}</span>
                        <span className="text-muted-foreground">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gold/10 pt-3 flex justify-between font-heading font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
