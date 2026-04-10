import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      toast.error("You don't have admin access");
      setLoading(false);
      return;
    }

    toast.success("Welcome, Admin!");
    navigate("/admin");
    setLoading(false);
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-dark">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleLogin}
        className="bg-card border border-gold/10 rounded-xl p-8 w-full max-w-sm mx-4 space-y-6"
      >
        <div className="text-center">
          <Lock className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm font-body mt-1">Sign in with your admin account</p>
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-secondary/50 border border-gold/10 rounded-lg pl-10 pr-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-secondary/50 border border-gold/10 rounded-lg pl-10 pr-10 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : "Login"}
        </button>
      </motion.form>
    </div>
  );
}
