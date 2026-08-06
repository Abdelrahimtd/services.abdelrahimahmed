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

    const order_code = generateOrderCode();

    const notesParts: string[] = [];
    if (referral_code) notesParts.push(`Referral Code: ${referral_code}`);
    if (discount_amount) notesParts.push(`Discount: ${discount_amount} EGP`);
    const notes = notesParts.join(" | ");

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_code,
        items,
        total: final_total ?? total,
        status: "pending",
        customer_name: customer_name || "",
        customer_phone: customer_phone || "",
        notes,
      })
      .select("order_code")
      .single();

    if (error) {
      console.error("Order creation error:", error);
      const { data: retryData, error: retryErr } = await supabase
        .from("orders")
        .insert({
          order_code,
          items,
          total: final_total ?? total,
          status: "pending",
          customer_name: customer_name || "",
          customer_phone: customer_phone || "",
        })
        .select("order_code")
        .single();

      if (retryErr) {
        console.error("Order creation retry error:", retryErr);
        return NextResponse.json({ error: retryErr.message }, { status: 500 });
      }

      return NextResponse.json({ order_code: retryData.order_code });
    }

    return NextResponse.json({ order_code: data.order_code });
  } catch (err: any) {
    console.error("Order API error:", err);
    return NextResponse.json({ error: err?.message || "API error" }, { status: 500 });
  }
}
