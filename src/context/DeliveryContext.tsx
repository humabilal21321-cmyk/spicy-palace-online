import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DeliveryRider {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  vehicle_type: string;
  is_available: boolean;
  is_approved: boolean;
  total_earnings: number;
  total_deliveries: number;
  created_at: string;
}

export interface DeliveryAssignment {
  id: string;
  order_id: string;
  rider_id: string;
  status: string;
  earnings: number;
  assigned_at: string;
  picked_up_at: string | null;
  delivered_at: string | null;
  order?: any;
}

interface DeliveryContextType {
  rider: DeliveryRider | null;
  assignments: DeliveryAssignment[];
  loading: boolean;
  fetchRider: () => Promise<void>;
  fetchAssignments: () => Promise<void>;
  toggleAvailability: () => Promise<void>;
  updateAssignmentStatus: (id: string, status: string) => Promise<void>;
  registerAsRider: (name: string, phone: string, vehicleType: string) => Promise<boolean>;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rider, setRider] = useState<DeliveryRider | null>(null);
  const [assignments, setAssignments] = useState<DeliveryAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRider = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("delivery_riders")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!error && data) setRider(data as unknown as DeliveryRider);
    setLoading(false);
  }, []);

  const fetchAssignments = useCallback(async () => {
    if (!rider) return;
    const { data } = await supabase
      .from("delivery_assignments")
      .select("*, orders(*)")
      .eq("rider_id", rider.id)
      .order("created_at", { ascending: false });

    if (data) {
      setAssignments(data.map((d: any) => ({
        ...d,
        order: d.orders,
      })));
    }
  }, [rider]);

  useEffect(() => { fetchRider(); }, [fetchRider]);
  useEffect(() => { if (rider) fetchAssignments(); }, [rider, fetchAssignments]);

  useEffect(() => {
    if (!rider) return;
    const channel = supabase
      .channel("delivery-assignments-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "delivery_assignments" }, () => {
        fetchAssignments();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [rider, fetchAssignments]);

  const toggleAvailability = useCallback(async () => {
    if (!rider) return;
    const { error } = await supabase
      .from("delivery_riders")
      .update({ is_available: !rider.is_available })
      .eq("id", rider.id);
    if (!error) setRider(prev => prev ? { ...prev, is_available: !prev.is_available } : null);
  }, [rider]);

  const updateAssignmentStatus = useCallback(async (id: string, status: string) => {
    const updates: any = { status };
    if (status === "picked_up") updates.picked_up_at = new Date().toISOString();
    if (status === "delivered") updates.delivered_at = new Date().toISOString();

    await supabase.from("delivery_assignments").update(updates).eq("id", id);
    fetchAssignments();
  }, [fetchAssignments]);

  const registerAsRider = useCallback(async (name: string, phone: string, vehicleType: string): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { error } = await supabase.from("delivery_riders").insert({
      user_id: session.user.id,
      name,
      phone,
      vehicle_type: vehicleType,
    });

    if (error) return false;
    await fetchRider();
    return true;
  }, [fetchRider]);

  return (
    <DeliveryContext.Provider value={{ rider, assignments, loading, fetchRider, fetchAssignments, toggleAvailability, updateAssignmentStatus, registerAsRider }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery must be used within DeliveryProvider");
  return ctx;
};
