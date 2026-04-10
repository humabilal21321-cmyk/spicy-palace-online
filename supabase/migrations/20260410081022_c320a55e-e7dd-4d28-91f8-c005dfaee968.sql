
-- Add 'rider' to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'rider';

-- Delivery riders profile table
CREATE TABLE public.delivery_riders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT NOT NULL DEFAULT 'Bike',
  is_available BOOLEAN NOT NULL DEFAULT false,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  total_earnings NUMERIC NOT NULL DEFAULT 0,
  total_deliveries INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_riders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Riders can view own profile" ON public.delivery_riders
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Riders can update own profile" ON public.delivery_riders
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Riders can insert own profile" ON public.delivery_riders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all riders" ON public.delivery_riders
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update riders" ON public.delivery_riders
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Delivery assignments table
CREATE TABLE public.delivery_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  rider_id UUID NOT NULL REFERENCES public.delivery_riders(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'picked_up', 'delivered', 'cancelled')),
  earnings NUMERIC NOT NULL DEFAULT 0,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Riders can view own assignments" ON public.delivery_assignments
  FOR SELECT TO authenticated
  USING (rider_id IN (SELECT id FROM public.delivery_riders WHERE user_id = auth.uid()));

CREATE POLICY "Riders can update own assignments" ON public.delivery_assignments
  FOR UPDATE TO authenticated
  USING (rider_id IN (SELECT id FROM public.delivery_riders WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all assignments" ON public.delivery_assignments
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert assignments" ON public.delivery_assignments
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add delivery_status to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_status TEXT NOT NULL DEFAULT 'pending';

-- Triggers for updated_at
CREATE TRIGGER update_delivery_riders_updated_at
  BEFORE UPDATE ON public.delivery_riders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_delivery_assignments_updated_at
  BEFORE UPDATE ON public.delivery_assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for assignments
ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_assignments;
