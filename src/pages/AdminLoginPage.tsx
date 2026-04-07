import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASS = "hotspicy2026";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      sessionStorage.setItem("hotspicy_admin", "true");
      toast.success("Welcome, Admin!");
      navigate("/admin");
    } else {
      toast.error("Incorrect password");
    }
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
          <p className="text-muted-foreground text-sm font-body mt-1">Enter admin password to continue</p>
        </div>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-secondary/50 border border-gold/10 rounded-lg px-4 py-3 pr-10 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <button type="submit" className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-body font-bold hover:opacity-90 transition-opacity">
          Login
        </button>
      </motion.form>
    </div>
  );
}
