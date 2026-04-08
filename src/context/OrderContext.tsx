import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  total_price: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  booking_date: string | null;
  booking_time: string | null;
  created_at: string;
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, "id" | "created_at">) => Promise<Order | null>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function parseOrder(row: any): Order {
  return {
    id: row.id,
    order_code: row.order_code,
    customer_name: row.customer_name,
    phone: row.phone,
    address: row.address,
    city: row.city,
    items: (row.items as OrderItem[]) || [],
    total_price: row.total_price,
    payment_method: row.payment_method,
    payment_status: row.payment_status,
    order_status: row.order_status,
    booking_date: row.booking_date,
    booking_time: row.booking_time,
    created_at: row.created_at,
  };
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setOrders(data.map(parseOrder));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();

    // Real-time subscription
    const channel = supabase
      .channel("orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  const addOrder = useCallback(async (order: Omit<Order, "id" | "created_at">): Promise<Order | null> => {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_code: order.order_code,
        customer_name: order.customer_name,
        phone: order.phone,
        address: order.address,
        city: order.city,
        items: order.items as unknown as Json,
        total_price: order.total_price,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        order_status: order.order_status,
        booking_date: order.booking_date,
        booking_time: order.booking_time,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add order:", error);
      return null;
    }
    return data ? parseOrder(data) : null;
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: string) => {
    await supabase.from("orders").update({ order_status: status }).eq("id", id);
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    await supabase.from("orders").delete().eq("id", id);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading, addOrder, updateOrderStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
