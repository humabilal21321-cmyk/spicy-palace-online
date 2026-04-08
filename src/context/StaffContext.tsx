import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface StaffMember {
  id: string;
  name: string;
  role: "Chef" | "Waiter" | "Manager" | "Delivery" | "Cashier";
  phone: string;
  shift: "Morning" | "Evening" | "Night";
  status: "Active" | "On Leave" | "Off Duty";
  attendance: number; // percentage
  joinedAt: string;
}

interface StaffContextType {
  staff: StaffMember[];
  addStaff: (s: StaffMember) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);
const STORAGE_KEY = "hotspicy_staff";

const defaultStaff: StaffMember[] = [
  { id: "s-1", name: "Ahmed Khan", role: "Chef", phone: "03001234567", shift: "Morning", status: "Active", attendance: 95, joinedAt: "2024-01-15" },
  { id: "s-2", name: "Ali Raza", role: "Waiter", phone: "03009876543", shift: "Evening", status: "Active", attendance: 88, joinedAt: "2024-03-10" },
  { id: "s-3", name: "Hassan Ali", role: "Delivery", phone: "03005556677", shift: "Night", status: "Active", attendance: 92, joinedAt: "2024-06-01" },
  { id: "s-4", name: "Bilal Shah", role: "Cashier", phone: "03002223344", shift: "Morning", status: "On Leave", attendance: 78, joinedAt: "2024-08-20" },
];

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : defaultStaff; } catch { return defaultStaff; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(staff)); }, [staff]);

  const addStaff = useCallback((s: StaffMember) => setStaff(prev => [s, ...prev]), []);
  const updateStaff = useCallback((id: string, updates: Partial<StaffMember>) =>
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s)), []);
  const deleteStaff = useCallback((id: string) => setStaff(prev => prev.filter(s => s.id !== id)), []);

  return (
    <StaffContext.Provider value={{ staff, addStaff, updateStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error("useStaff must be used within StaffProvider");
  return ctx;
};
