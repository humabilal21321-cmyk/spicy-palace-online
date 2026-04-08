import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber?: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  notes?: string;
  createdAt: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);
const STORAGE_KEY = "hotspicy_reservations";

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations)); }, [reservations]);

  const addReservation = useCallback((r: Reservation) => setReservations(prev => [r, ...prev]), []);
  const updateReservation = useCallback((id: string, updates: Partial<Reservation>) =>
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r)), []);
  const deleteReservation = useCallback((id: string) => setReservations(prev => prev.filter(r => r.id !== id)), []);

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, updateReservation, deleteReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservations must be used within ReservationProvider");
  return ctx;
};
