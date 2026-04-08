import { useOrders } from "@/context/OrderContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";

const COLORS = ["hsl(var(--primary))", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export default function AdminAnalytics() {
  const { orders } = useOrders();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const activeOrders = orders.filter(o => o.orderStatus !== "Cancelled");
  const totalRevenue = activeOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = activeOrders.length ? Math.round(totalRevenue / activeOrders.length) : 0;

  // Group by date
  const revenueByDate: Record<string, number> = {};
  activeOrders.forEach(o => {
    const d = new Date(o.createdAt);
    let key: string;
    if (period === "daily") key = d.toLocaleDateString();
    else if (period === "weekly") {
      const week = Math.ceil(d.getDate() / 7);
      key = `Week ${week}, ${d.toLocaleDateString("en", { month: "short" })}`;
    } else key = d.toLocaleDateString("en", { month: "short", year: "numeric" });
    revenueByDate[key] = (revenueByDate[key] || 0) + o.total;
  });
  const revenueData = Object.entries(revenueByDate).map(([name, revenue]) => ({ name, revenue }));

  // Top items
  const itemCounts: Record<string, number> = {};
  activeOrders.forEach(o => o.items.forEach(i => { itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity; }));
  const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value }));

  // Status distribution
  const statusCounts: Record<string, number> = {};
  orders.forEach(o => { statusCounts[o.orderStatus] = (statusCounts[o.orderStatus] || 0) + 1; });
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: <DollarSign className="h-5 w-5" />, color: "text-primary" },
          { label: "Total Orders", value: orders.length, icon: <ShoppingBag className="h-5 w-5" />, color: "text-emerald-400" },
          { label: "Avg Order Value", value: `Rs. ${avgOrderValue.toLocaleString()}`, icon: <TrendingUp className="h-5 w-5" />, color: "text-yellow-400" },
          { label: "Active Orders", value: activeOrders.length, icon: <Users className="h-5 w-5" />, color: "text-blue-400" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-gold/10 rounded-xl p-4">
            <div className={`${s.color} mb-2`}>{s.icon}</div>
            <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-muted-foreground text-xs font-body">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Period Filter */}
      <div className="flex items-center gap-2 mb-6">
        {(["daily", "weekly", "monthly"] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all capitalize ${period === p ? "border-primary bg-primary/20 text-primary" : "border-gold/10 text-muted-foreground hover:border-primary/40"}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-card border border-gold/10 rounded-xl p-5 mb-6">
        <h3 className="font-heading font-bold text-foreground mb-4">Revenue Trend</h3>
        {revenueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-muted-foreground text-sm font-body text-center py-12">No revenue data yet</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Items */}
        <div className="bg-card border border-gold/10 rounded-xl p-5">
          <h3 className="font-heading font-bold text-foreground mb-4">Top Selling Items</h3>
          {topItems.length > 0 ? (
            <div className="space-y-3">
              {topItems.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-body font-bold truncate">{item.name}</p>
                    <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(item.value / topItems[0].value) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-primary font-bold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-muted-foreground text-sm font-body text-center py-8">No data yet</p>}
        </div>

        {/* Order Status Pie */}
        <div className="bg-card border border-gold/10 rounded-xl p-5">
          <h3 className="font-heading font-bold text-foreground mb-4">Order Status Distribution</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-muted-foreground text-sm font-body text-center py-8">No data yet</p>}
        </div>
      </div>
    </div>
  );
}
