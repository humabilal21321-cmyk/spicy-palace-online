import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bike, Eye, EyeOff, Mail, Lock, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function DeliveryLoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("Bike");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { toast.error(error.message); setLoading(false); return; }

    // Check rider role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "rider");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      toast.error("No rider access. Please sign up as a rider first.");
      setLoading(false);
      return;
    }

    toast.success("Welcome, Rider!");
    navigate("/delivery");
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) { toast.error("Name and phone are required"); return; }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { toast.error(error.message); setLoading(false); return; }
    if (!data.user) { toast.error("Signup failed"); setLoading(false); return; }

    // Add rider role
    await supabase.from("user_roles").insert({ user_id: data.user.id, role: "rider" as any });

    // Create rider profile
    await supabase.from("delivery_riders").insert({
      user_id: data.user.id,
      name,
      phone,
      vehicle_type: vehicle,
    });

    toast.success("Account created! Please verify your email, then log in.");
    setMode("login");
    setLoading(false);
  };

  const inputClass = "w-full bg-secondary/50 border border-gold/10 rounded-lg pl-10 pr-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-dark">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={mode === "login" ? handleLogin : handleSignup}
        className="bg-card border border-gold/10 rounded-xl p-8 w-full max-w-sm mx-4 space-y-5"
      >
        <div className="text-center">
          <Bike className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {mode === "login" ? "Rider Login" : "Rider Sign Up"}
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-1">
            {mode === "login" ? "Sign in to your delivery account" : "Create your rider account"}
          </p>
        </div>

        {mode === "signup" && (
          <>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required className={inputClass} />
            </div>
            <div className="relative">
              <Bike className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (+92...)" required className={inputClass} />
            </div>
            <select value={vehicle} onChange={e => setVehicle(e.target.value)} className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Bicycle">Bicycle</option>
            </select>
          </>
        )}

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className={inputClass} />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-secondary/50 border border-gold/10 rounded-lg pl-10 pr-10 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Please wait...</> : mode === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-muted-foreground font-body">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary font-bold hover:underline">
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.form>
    </div>
  );
}
