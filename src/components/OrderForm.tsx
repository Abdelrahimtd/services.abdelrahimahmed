"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Plan } from "@/lib/supabase";
import { useCart } from "./CartProvider";

export default function OrderForm({ product }: { product: Product }) {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(product.plans[0]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  // Referral code state
  const [referralCode, setReferralCode] = useState("");
  const [validatingCode, setValidatingCode] = useState(false);
  const [referralValid, setReferralValid] = useState(false);
  const [referralMessage, setReferralMessage] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [referrerPhone, setReferrerPhone] = useState("");
  const [rewardAmount, setRewardAmount] = useState(10);

  const rawTotal = selectedPlan.price * qty;
  const discountAmount = referralValid ? rawTotal * (discountPercent / 100) : 0;
  const finalTotal = rawTotal - discountAmount;

  async function validateReferral() {
    const code = referralCode.trim();
    if (!code) return;

    setValidatingCode(true);
    setReferralMessage("");

    try {
      const res = await fetch("/api/validate-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, customer_phone: customerPhone }),
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

  async function handleOrder() {
    if (!showForm) {
      setShowForm(true);
      return;
    }

    setLoading(true);

    // Build WhatsApp message with referral info
    const discountLine = referralValid
      ? `\n🎟️ Referral Code: ${referralCode.trim().toUpperCase()}\n💰 Discount (${discountPercent}%): -${discountAmount.toFixed(2)} EGP`
      : "";
    const totalLabel = referralValid ? "Total After Discount" : "Total";

    const waMsg = `* Abdelrahim AI Lab *
================
*New Order*
================
*Products:*
${product.name_ar}
Plan: ${selectedPlan.name}
Price: ${selectedPlan.price.toFixed(2)} EGP
Qty: ${qty}
================
*Customer Info:*
Name: ${customerName || "N/A"}
Phone: ${customerPhone || "N/A"}${discountLine}
================
${referralValid ? `Subtotal: ${rawTotal.toFixed(2)} EGP\nDiscount (${discountPercent}%): -${discountAmount.toFixed(2)} EGP\n✅ ${totalLabel}: ${finalTotal.toFixed(2)} EGP` : `Total: ${rawTotal.toFixed(2)} EGP`}
================
Thank you for choosing Abdelrahim AI Lab!`;
    const waUrl = `https://wa.me/201116745020?text=${encodeURIComponent(waMsg)}`;

    // Open WhatsApp NOW (same click — popup allowed!)
    window.open(waUrl, "_blank");

    // Now create order in background
    let orderCode = "N/A";
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          product_name: product.name_ar,
          plan_id: selectedPlan.id,
          plan_name: selectedPlan.name,
          price: selectedPlan.price,
          qty,
          total: rawTotal,
          customer_name: customerName,
          customer_phone: customerPhone,
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
            referee_phone: customerPhone,
            order_code: orderCode,
            discount_amount: discountAmount,
            reward_amount: rewardAmount,
          }),
        }).catch(() => {}); // fire-and-forget
      }
    } catch {
      // continue without order code
    }

    // Redirect to confirmation page
    const params = new URLSearchParams({
      code: orderCode,
      product: product.name_ar,
      plan: selectedPlan.name,
      price: String(selectedPlan.price),
      qty: String(qty),
      total: String(finalTotal),
      name: customerName,
      phone: customerPhone,
      ...(referralValid
        ? {
            referral_code: referralCode.trim().toUpperCase(),
            discount_percent: String(discountPercent),
            discount_amount: String(discountAmount),
            subtotal: String(rawTotal),
          }
        : {}),
    });

    setLoading(false);
    router.push(`/order/confirm?${params.toString()}`);
  }

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-6 sticky top-20">
      <h3 className="text-sm font-extrabold mb-4 uppercase tracking-wider text-text-secondary">
        اختر الباقة
      </h3>

      {/* Plan options */}
      <div className="flex flex-col gap-2 mb-4">
        {product.plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`flex items-center justify-between p-4 rounded-xl border-[1.5px] cursor-pointer transition-all text-right ${
              selectedPlan.id === plan.id
                ? "border-teal bg-teal-soft"
                : "border-border hover:border-teal hover:bg-teal-soft"
            }`}
          >
            <div>
              <div className="font-bold text-sm">{plan.name}</div>
              <div className="text-xs text-text-muted">{plan.period}</div>
              {plan.warranty && (
                <div className="text-xs text-teal flex items-center gap-1 mt-0.5">
                  🛡 ضمان كامل
                </div>
              )}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-lg font-bold text-teal whitespace-nowrap">
              EGP {plan.price}
            </div>
          </button>
        ))}
      </div>

      {/* Total / Discount Display */}
      <div className="py-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-text-muted text-sm">السعر الإجمالي</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-bg-input rounded-full p-1">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-8 h-8 rounded-full bg-bg-card text-text-primary text-lg grid place-items-center border-none cursor-pointer hover:bg-teal-soft"
              >
                -
              </button>
              <span className="font-[family-name:var(--font-mono)] text-sm min-w-[24px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 rounded-full bg-bg-card text-text-primary text-lg grid place-items-center border-none cursor-pointer hover:bg-teal-soft"
              >
                +
              </button>
            </div>
            <span className={`font-[family-name:var(--font-mono)] text-2xl font-bold ${referralValid ? "text-text-muted line-through text-lg" : "text-teal"}`}>
              EGP {rawTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Discount breakdown */}
        {referralValid && (
          <div className="mt-3 p-3 bg-teal-soft rounded-xl border border-teal/20 space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">🏷️ الخصم ({discountPercent}%)</span>
              <span className="font-[family-name:var(--font-mono)] font-bold text-red-400">
                -{discountAmount.toFixed(2)} EGP
              </span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1.5 border-t border-teal/10">
              <span className="text-teal font-bold">✨ الإجمالي بعد الخصم</span>
              <span className="font-[family-name:var(--font-mono)] text-xl font-bold text-teal">
                EGP {finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Customer info form */}
      {showForm && (
        <div className="mb-4 p-4 bg-bg-input rounded-xl border border-border">
          <h4 className="text-sm font-bold mb-3 text-text-secondary">معلومات العميل</h4>
          <input
            type="text"
            placeholder="الاسم"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text-primary text-sm outline-none focus:border-teal mb-2"
          />
          <input
            type="tel"
            placeholder="رقم الواتساب"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text-primary text-sm outline-none focus:border-teal"
          />
        </div>
      )}

      {/* Referral Code Section */}
      {showForm && (
        <div className="mb-4 p-4 bg-bg-input rounded-xl border border-border">
          <h4 className="text-sm font-bold mb-3 text-text-secondary">🎟️ كود الدعوة</h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="مثال: REF-45020"
              value={referralCode}
              onChange={(e) => {
                setReferralCode(e.target.value);
                if (referralValid) clearReferral();
              }}
              disabled={referralValid}
              className="flex-1 bg-bg-card border border-border rounded-lg px-3 py-2.5 text-text-primary text-sm outline-none focus:border-teal font-[family-name:var(--font-mono)] uppercase disabled:opacity-60"
              dir="ltr"
            />
            {referralValid ? (
              <button
                onClick={clearReferral}
                className="px-4 py-2.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-bold cursor-pointer border border-red-500/30 hover:bg-red-500/30 transition-colors whitespace-nowrap"
              >
                إلغاء ✕
              </button>
            ) : (
              <button
                onClick={validateReferral}
                disabled={validatingCode || !referralCode.trim()}
                className="px-4 py-2.5 rounded-lg bg-teal text-text-primary text-sm font-bold cursor-pointer border-none hover:bg-teal/80 transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {validatingCode ? "..." : "تحقق ✓"}
              </button>
            )}
          </div>
          {referralMessage && (
            <p className={`text-xs mt-2 font-bold ${referralValid ? "text-teal" : "text-red-400"}`}>
              {referralMessage}
            </p>
          )}
        </div>
      )}

      {/* Order button */}
      <div className="flex flex-col gap-2.5 mt-4">
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full py-3 rounded-full bg-teal text-text-primary font-bold text-sm cursor-pointer hover:bg-teal/80 transition-colors shadow-[0_4px_16px_var(--color-teal-glow)] disabled:opacity-60"
        >
          {loading ? "جاري الإنشاء..." : showForm ? "💬 اطلب عبر واتساب" : "اطلب الآن"}
        </button>
        <button
          onClick={() => addItem({
            product_id: product.id,
            product_name: product.name_ar,
            icon_url: product.icon_url,
            plan_name: selectedPlan.name,
            price: selectedPlan.price,
            qty,
          })}
          className="w-full py-3 rounded-full border border-border text-text-primary font-bold text-sm cursor-pointer hover:border-teal hover:bg-teal-soft transition-colors"
        >
          أضف للسلة 🛒
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="flex items-center gap-1.5 bg-bg-input border border-border rounded-xl px-3 py-2 text-xs text-text-secondary">
          🛡 حساب جاهز
        </div>
        <div className="flex items-center gap-1.5 bg-bg-input border border-border rounded-xl px-3 py-2 text-xs text-text-secondary">
          🛡 ضمان كامل
        </div>
        <div className="flex items-center gap-1.5 bg-bg-input border border-border rounded-xl px-3 py-2 text-xs text-text-secondary">
          ⭐ {product.plans.length} خطط
        </div>
        <div className="flex items-center gap-1.5 bg-bg-input border border-border rounded-xl px-3 py-2 text-xs text-text-secondary">
          💬 دعم واتساب
        </div>
      </div>
    </div>
  );
}
