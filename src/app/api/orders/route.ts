import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateOrderCode(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `AAL-${date}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      product_id,
      product_name,
      plan_name,
      price,
      qty,
      total,
      customer_name,
      customer_phone,
      referral_code,
      discount_amount,
      final_total,
    } = body;

    if (!product_id || !product_name || !plan_name || !price || !qty || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const items = [
      {
        product_id,
        product_name,
        plan_name,
        price,
        qty,
      },
    ];

    // Generate order_code server-side as fallback
    const order_code = generateOrderCode();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_code,
        items,
        total: final_total ?? total,
        status: "pending",
        customer_name: customer_name || "",
        customer_phone: customer_phone || "",
        ...(referral_code ? { referral_code } : {}),
        ...(discount_amount ? { discount_amount } : {}),
      })
      .select("order_code")
      .single();

    if (error) {
      console.error("Order creation error:", error);
      // Still return a code even if DB fails, so user can proceed
      return NextResponse.json({ order_code, warning: error.message });
    }

    return NextResponse.json({ order_code: data.order_code });
  } catch (err) {
    console.error("Order API error:", err);
    // Generate a fallback code so the flow never breaks
    const fallback_code = generateOrderCode();
    return NextResponse.json({ order_code: fallback_code, warning: "API error" });
  }
}
