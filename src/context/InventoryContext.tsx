import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  lastUpdated: string;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
const STORAGE_KEY = "hotspicy_inventory";

const defaultInventory: InventoryItem[] = [
  { id: "inv-1", name: "Chicken", category: "Meat", quantity: 50, unit: "kg", minStock: 10, lastUpdated: new Date().toISOString() },
  { id: "inv-2", name: "Cooking Oil", category: "Oil", quantity: 30, unit: "liters", minStock: 5, lastUpdated: new Date().toISOString() },
  { id: "inv-3", name: "Flour", category: "Dry Goods", quantity: 100, unit: "kg", minStock: 20, lastUpdated: new Date().toISOString() },
  { id: "inv-4", name: "Cheese", category: "Dairy", quantity: 15, unit: "kg", minStock: 3, lastUpdated: new Date().toISOString() },
  { id: "inv-5", name: "Spice Mix", category: "Spices", quantity: 8, unit: "kg", minStock: 2, lastUpdated: new Date().toISOString() },
  { id: "inv-6", name: "Rice", category: "Dry Goods", quantity: 80, unit: "kg", minStock: 15, lastUpdated: new Date().toISOString() },
];

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : defaultInventory; } catch { return defaultInventory; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory)); }, [inventory]);

  const addInventoryItem = useCallback((item: InventoryItem) => setInventory(prev => [item, ...prev]), []);
  const updateInventoryItem = useCallback((id: string, updates: Partial<InventoryItem>) =>
    setInventory(prev => prev.map(i => i.id === id ? { ...i, ...updates, lastUpdated: new Date().toISOString() } : i)), []);
  const deleteInventoryItem = useCallback((id: string) => setInventory(prev => prev.filter(i => i.id !== id)), []);

  return (
    <InventoryContext.Provider value={{ inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used within InventoryProvider");
  return ctx;
};
