import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, customer_phone } = body;

    if (!code) {
      return NextResponse.json({ valid: false, message: "كود الدعوة مطلوب" });
    }

    const cleanCode = code.trim().toUpperCase();

    // Look up referral code in referral_wallets
    const { data: wallet, error: walletError } = await supabase
      .from("referral_wallets")
      .select("*")
      .eq("code", cleanCode)
      .maybeSingle();

    if (walletError || !wallet) {
      return NextResponse.json({ valid: false, message: "كود الدعوة غير صحيح" });
    }

    // Prevent using own referral code
    if (customer_phone) {
      const normalizedCustomer = normalizePhone(customer_phone);
      if (wallet.phone === normalizedCustomer) {
        return NextResponse.json({ valid: false, message: "لا يمكنك استخدام كود الدعوة الخاص بك" });
      }
    }

    // Fetch referral config (discount percent)
    let discountPercent = 5.0;
    let rewardAmount = 10.0;
    const { data: config } = await supabase
      .from("system_settings")
      .select("value")
      .eq("key", "referral_config")
      .maybeSingle();

    if (config?.value) {
      discountPercent = config.value.discount_percent ?? 5.0;
      rewardAmount = config.value.reward_amount ?? 10.0;
    }

    return NextResponse.json({
      valid: true,
      discount_percent: discountPercent,
      reward_amount: rewardAmount,
      referrer_phone: wallet.phone,
      message: `تم تطبيق خصم ${discountPercent}% بنجاح!`,
    });
  } catch (err) {
    console.error("Validate referral error:", err);
    return NextResponse.json({ valid: false, message: "حدث خطأ أثناء التحقق" });
  }
}

function normalizePhone(phone: string): string {
  let p = phone.replace(/\D/g, "");
  if (p.startsWith("0")) p = "2" + p;
  if (!p.startsWith("20") && p.length === 10) p = "20" + p;
  return p;
}
