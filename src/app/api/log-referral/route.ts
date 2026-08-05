import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      referrer_phone,
      referee_phone,
      order_code,
      discount_amount,
      reward_amount,
    } = body;

    if (!referrer_phone || !referee_phone || !order_code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const normReferrer = normalizePhone(referrer_phone);
    const normReferee = normalizePhone(referee_phone);

    // Insert referral log
    const { error: logError } = await supabase.from("referral_logs").insert({
      referrer_phone: normReferrer,
      referee_phone: normReferee,
      order_code,
      discount_amount: discount_amount || 0,
      reward_amount: reward_amount || 10,
      status: "pending",
    });

    if (logError) {
      console.error("Referral log insert error:", logError);
      return NextResponse.json(
        { error: logError.message },
        { status: 500 }
      );
    }

    // Update referrer's pending_balance
    const { data: wallet } = await supabase
      .from("referral_wallets")
      .select("pending_balance")
      .eq("phone", normReferrer)
      .maybeSingle();

    if (wallet) {
      await supabase
        .from("referral_wallets")
        .update({
          pending_balance:
            (wallet.pending_balance || 0) + (reward_amount || 10),
        })
        .eq("phone", normReferrer);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Log referral error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function normalizePhone(phone: string): string {
  let p = phone.replace(/\D/g, "");
  if (p.startsWith("0")) p = "2" + p;
  if (!p.startsWith("20") && p.length === 10) p = "20" + p;
  return p;
}
