import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { menuItems as defaultMenuItems, categories as defaultCategories } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";

export interface ManagedMenuItem extends MenuItem {
  outOfStock?: boolean;
}

interface MenuContextType {
  menuItems: ManagedMenuItem[];
  categories: string[];
  addMenuItem: (item: ManagedMenuItem) => void;
  updateMenuItem: (id: string, updates: Partial<ManagedMenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleOutOfStock: (id: string) => void;
  addCategory: (cat: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);
const STORAGE_KEY = "hotspicy_menu";
const CAT_STORAGE_KEY = "hotspicy_categories";

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<ManagedMenuItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultMenuItems.map(i => ({ ...i, outOfStock: false }));
    } catch { return defaultMenuItems.map(i => ({ ...i, outOfStock: false })); }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(CAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultCategories;
    } catch { return defaultCategories; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems)); }, [menuItems]);
  useEffect(() => { localStorage.setItem(CAT_STORAGE_KEY, JSON.stringify(categories)); }, [categories]);

  const addMenuItem = useCallback((item: ManagedMenuItem) => {
    setMenuItems(prev => [...prev, item]);
  }, []);

  const updateMenuItem = useCallback((id: string, updates: Partial<ManagedMenuItem>) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const toggleOutOfStock = useCallback((id: string) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, outOfStock: !i.outOfStock } : i));
  }, []);

  const addCategory = useCallback((cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev : [...prev, cat]);
  }, []);

  return (
    <MenuContext.Provider value={{ menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem, toggleOutOfStock, addCategory }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
};
