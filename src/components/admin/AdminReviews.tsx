import { useReviews, type Review } from "@/context/ReviewContext";
import { Star, Check, EyeOff, Trash2 } from "lucide-react";

const statusColors: Record<Review["status"], string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Approved: "bg-emerald-500/20 text-emerald-400",
  Hidden: "bg-secondary text-muted-foreground",
};

export default function AdminReviews() {
  const { reviews, updateReviewStatus, deleteReview } = useReviews();

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === "Pending").length,
    avgRating: reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0",
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-gold/10 rounded-xl p-4 text-center">
          <p className="font-heading text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-muted-foreground text-xs font-body">Total Reviews</p>
        </div>
        <div className="bg-card border border-gold/10 rounded-xl p-4 text-center">
          <p className="font-heading text-2xl font-bold text-yellow-400">{stats.pending}</p>
          <p className="text-muted-foreground text-xs font-body">Pending</p>
        </div>
        <div className="bg-card border border-gold/10 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <p className="font-heading text-2xl font-bold text-foreground">{stats.avgRating}</p>
          </div>
          <p className="text-muted-foreground text-xs font-body">Avg Rating</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center py-20 text-muted-foreground font-body">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className={`bg-card border border-gold/10 rounded-xl p-4 ${r.status === "Hidden" ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">{r.customerName}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-secondary"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[r.status]}`}>{r.status}</span>
                  <span className="text-muted-foreground text-xs font-body">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-foreground text-sm font-body mb-3">{r.comment}</p>
              <div className="flex items-center gap-2">
                {r.status !== "Approved" && (
                  <button onClick={() => updateReviewStatus(r.id, "Approved")}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                )}
                {r.status !== "Hidden" && (
                  <button onClick={() => updateReviewStatus(r.id, "Hidden")}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-secondary text-muted-foreground border border-gold/10 hover:bg-secondary/80 flex items-center gap-1">
                    <EyeOff className="h-3.5 w-3.5" /> Hide
                  </button>
                )}
                <button onClick={() => deleteReview(r.id)}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 flex items-center gap-1">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
