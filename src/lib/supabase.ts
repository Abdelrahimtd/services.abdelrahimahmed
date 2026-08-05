import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  name_ar: string;
  category: string;
  category_label: string;
  icon_url: string;
  description: string;
  rating: number;
  in_stock: boolean;
  features: string[];
  plans: Plan[];
  badges: string[];
  tags: string[];
  sort_order: number;
  cost_price: number;
  stock_quantity: number;
  total_sold: number;
}

export interface Plan {
  id: string;
  name: string;
  period: string;
  price: number;
  warranty: boolean;
}

export interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  plan_name: string;
  price: number;
  qty: number;
}
