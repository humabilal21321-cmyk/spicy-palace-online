import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Hidden";
  createdAt: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (r: Review) => void;
  updateReviewStatus: (id: string, status: Review["status"]) => void;
  deleteReview: (id: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);
const STORAGE_KEY = "hotspicy_reviews";

const defaultReviews: Review[] = [
  { id: "r-1", customerName: "Usman", rating: 5, comment: "Best rolls in the city! Boom Boom Roll is amazing 🔥", status: "Approved", createdAt: "2026-04-01T10:00:00Z" },
  { id: "r-2", customerName: "Sara", rating: 4, comment: "Loved the chicken karahi. Will order again!", status: "Approved", createdAt: "2026-04-02T14:30:00Z" },
  { id: "r-3", customerName: "Anonymous", rating: 2, comment: "Delivery was late.", status: "Pending", createdAt: "2026-04-03T18:00:00Z" },
  { id: "r-4", customerName: "Ali", rating: 5, comment: "Zinger burger is better than any fast food chain!", status: "Pending", createdAt: "2026-04-05T12:00:00Z" },
];

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : defaultReviews; } catch { return defaultReviews; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews)); }, [reviews]);

  const addReview = useCallback((r: Review) => setReviews(prev => [r, ...prev]), []);
  const updateReviewStatus = useCallback((id: string, status: Review["status"]) =>
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r)), []);
  const deleteReview = useCallback((id: string) => setReviews(prev => prev.filter(r => r.id !== id)), []);

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReviewStatus, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
};
