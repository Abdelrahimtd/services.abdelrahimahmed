"use client";

import { useCart } from "./CartProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  trackInitiateCheckout,
  trackPlaceAnOrder,
  trackPurchase,
} from "@/lib/tiktok";

export default function CartSidebar() {
  const { items, removeItem, total, count, isOpen, closeCart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Referral code state
  const [referralCode, setReferralCode] = useState("");
  const [validatingCode, setValidatingCode] = useState(false);
  const [referralValid, setReferralValid] = useState(false);
  const [referralMessage, setReferralMessage] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [referrerPhone, setReferrerPhone] = useState("");
  const [rewardAmount, setRewardAmount] = useState(10);

  const discountAmount = referralValid ? total * (discountPercent / 100) : 0;
  const finalTotal = total - discountAmount;

  async function validateReferral() {
    const code = referralCode.trim();
    if (!code) return;

    setValidatingCode(true);
    setReferralMessage("");

    try {
      const res = await fetch("/api/validate-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.valid) {
        setReferralValid(true);
        setDiscountPercent(data.discount_percent);
        setReferrerPhone(data.referrer_phone);
        setRewardAmount(data.reward_amount);
        setReferralMessage(`✅ ${data.message}`);
      } else {
        setReferralValid(false);
        setDiscountPercent(0);
        setReferrerPhone("");
        setReferralMessage(`❌ ${data.message}`);
      }
    } catch {
      setReferralValid(false);
      setReferralMessage("❌ حدث خطأ أثناء التحقق");
    } finally {
      setValidatingCode(false);
    }
  }

  function clearReferral() {
    setReferralCode("");
    setReferralValid(false);
    setReferralMessage("");
    setDiscountPercent(0);
    setReferrerPhone("");
  }

  async function checkout() {
    if (!items.length) return;
    setLoading(true);

    const contents = items.map((i) => ({
      content_id: i.product_id,
      content_name: `${i.product_name} - ${i.plan_name}`,
      content_type: "product",
    }));

    trackInitiateCheckout({
      contents,
      value: finalTotal,
      currency: "EGP",
    });

    trackPlaceAnOrder({
      contents,
      value: finalTotal,
      currency: "EGP",
    });

    trackPurchase({
      contents,
      value: finalTotal,
      currency: "EGP",
    });

    // Build items summary
    const itemsSummary = items.map(
      (i) => `${i.product_name} (${i.plan_name} × ${i.qty})`
    ).join(", ");

    let orderCode = "N/A";
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: items[0].product_id,
          product_name: items.map((i) => i.product_name).join(", "),
          plan_name: items.map((i) => i.plan_name).join(", "),
          price: total,
          qty: count,
          total,
          customer_name: "",
          customer_phone: "",
          referral_code: referralValid ? referralCode.trim().toUpperCase() : undefined,
          discount_amount: referralValid ? discountAmount : undefined,
          final_total: referralValid ? finalTotal : undefined,
        }),
      });
      const data = await res.json();
      if (data.order_code) orderCode = data.order_code;

      // Log referral usage if code was applied
      if (referralValid && referrerPhone && orderCode !== "N/A") {
        fetch("/api/log-referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referrer_phone: referrerPhone,
            referee_phone: "",
            order_code: orderCode,
            discount_amount: discountAmount,
            reward_amount: rewardAmount,
          }),
        }).catch(() => {}); // fire-and-forget
      }
    } catch {
      // continue
    }

    // Build WhatsApp message with referral info
    const discountLine = referralValid
      ? `\n🎟️ Referral Code: ${referralCode.trim().toUpperCase()}\n💰 Discount (${discountPercent}%): -${discountAmount.toFixed(2)} EGP`
      : "";

    const waMsg = `* Abdelrahim AI Lab *
==================
New Order
Order Code: ${orderCode !== "N/A" ? orderCode : ""}
==================
Products:
${items.map((i) => `${i.product_name} (${i.plan_name} × ${i.qty})`).join("\n")}${discountLine}
==================
${referralValid ? `Subtotal: ${total.toFixed(2)} EGP\nDiscount (${discountPercent}%): -${discountAmount.toFixed(2)} EGP\n✅ Total After Discount: ${finalTotal.toFixed(2)} EGP` : `Total: ${total.toFixed(2)} EGP`}
==================
🔑 كود تفعيل التطبيق الخاص بك هو: ${orderCode}
📱 لتفعيل تطبيق Ai Lab ومتابعة اشتراكك:
قم بتحميل التطبيق واستخدم رقم واتسابك وكود التفعيل أعلاه للدخول.

Thank you for choosing Abdelrahim AI Lab!`;
    const waUrl = `https://wa.me/201116745020?text=${encodeURIComponent(waMsg)}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");

    const params = new URLSearchParams({
      code: orderCode,
      product: itemsSummary,
      plan: items.map((i) => i.plan_name).join(", "),
      price: String(total),
      qty: String(count),
      total: String(finalTotal),
      name: "",
      phone: "",
      ...(referralValid
        ? {
            referral_code: referralCode.trim().toUpperCase(),
            discount_percent: String(discountPercent),
            discount_amount: String(discountAmount),
            subtotal: String(total),
          }
        : {}),
    });

    clearCart();
    clearReferral();
    closeCart();
    setLoading(false);
    router.push(`/order/confirm?${params.toString()}`);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[200] transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-[380px] max-w-[90vw] h-screen bg-bg-card z-[210] flex flex-col border-e border-border transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-border">
          <h3 className="font-extrabold text-lg">سلة التسوق</h3>
          <button onClick={closeCart} className="text-text-secondary text-2xl bg-transparent border-none cursor-pointer hover:text-text-primary">
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {count === 0 ? (
            <p className="text-text-muted text-center py-12">السلة فاضية</p>
          ) : (
            items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-border">
                <div className="w-10 h-10 rounded-[10px] bg-bg-input grid place-items-center overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.icon_url} alt="" className="w-[22px] h-[22px] object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{item.product_name}</div>
                  <div className="text-xs text-text-muted">{item.plan_name}</div>
                </div>
                <div className="font-[family-name:var(--font-mono)] text-sm text-teal font-bold whitespace-nowrap">
                  EGP {item.price * item.qty}
                </div>
                <button
                  onClick={() => removeItem(i)}
                  className="text-text-muted bg-transparent border-none cursor-pointer text-lg px-1 hover:text-red"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {count > 0 && (
          <div className="px-6 py-5 border-t border-border">
            {/* Referral Code Input */}
            <div className="mb-4 p-3 bg-bg-input rounded-xl border border-border">
              <p className="text-xs font-bold text-text-secondary mb-2">🎟️ كود الدعوة</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="REF-XXXXX"
                  value={referralCode}
                  onChange={(e) => {
                    setReferralCode(e.target.value);
                    if (referralValid) clearReferral();
                  }}
                  disabled={referralValid}
                  className="flex-1 bg-bg-card border border-border rounded-lg px-2.5 py-2 text-text-primary text-xs outline-none focus:border-teal font-[family-name:var(--font-mono)] uppercase disabled:opacity-60"
                  dir="ltr"
                />
                {referralValid ? (
                  <button
                    onClick={clearReferral}
                    className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold cursor-pointer border border-red-500/30 hover:bg-red-500/30 transition-colors whitespace-nowrap"
                  >
                    ✕
                  </button>
                ) : (
                  <button
                    onClick={validateReferral}
                    disabled={validatingCode || !referralCode.trim()}
                    className="px-3 py-2 rounded-lg bg-teal text-text-primary text-xs font-bold cursor-pointer border-none hover:bg-teal/80 transition-colors disabled:opacity-40 whitespace-nowrap"
                  >
                    {validatingCode ? "..." : "تحقق"}
                  </button>
                )}
              </div>
              {referralMessage && (
                <p className={`text-[10px] mt-1.5 font-bold ${referralValid ? "text-teal" : "text-red-400"}`}>
                  {referralMessage}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-muted text-sm">الإجمالي</span>
              <strong className={`font-[family-name:var(--font-mono)] text-xl ${referralValid ? "text-text-muted line-through text-base" : "text-teal"}`}>
                EGP {total}
              </strong>
            </div>

            {/* Discount breakdown */}
            {referralValid && (
              <div className="mb-3 p-2.5 bg-teal-soft rounded-lg border border-teal/20 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-secondary">🏷️ خصم ({discountPercent}%)</span>
                  <span className="font-[family-name:var(--font-mono)] font-bold text-red-400">
                    -{discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1.5 border-t border-teal/10">
                  <span className="text-teal font-bold">✨ بعد الخصم</span>
                  <span className="font-[family-name:var(--font-mono)] text-lg font-bold text-teal">
                    EGP {finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={checkout}
              disabled={loading}
              className="w-full py-3 rounded-full bg-teal text-text-primary font-bold cursor-pointer hover:bg-teal/80 transition-colors shadow-[0_4px_16px_var(--color-teal-glow)] disabled:opacity-60"
            >
              {loading ? "جاري الإنشاء..." : "أكمل الطلب ←"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
