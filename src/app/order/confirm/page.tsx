"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const WA_PHONE = "201116745020";

function buildWaUrl(code: string, product: string, plan: string, price: string, qty: string, total: string, name: string, phone: string, referralCode?: string, discountPercent?: string, discountAmount?: string, subtotal?: string) {
  const hasReferral = referralCode && discountPercent && discountAmount && subtotal;

  const discountLine = hasReferral
    ? `\n🎟️ Referral Code: ${referralCode}\n💰 Discount (${discountPercent}%): -${parseFloat(discountAmount).toFixed(2)} EGP`
    : "";

  const totalSection = hasReferral
    ? `Subtotal: ${parseFloat(subtotal).toFixed(2)} EGP\nDiscount (${discountPercent}%): -${parseFloat(discountAmount).toFixed(2)} EGP\n✅ Total After Discount: ${parseFloat(total).toFixed(2)} EGP`
    : `Total: ${parseFloat(total).toFixed(2)} EGP`;

  const msg = `* Abdelrahim AI Lab *
================
*New Order*
 Order Code: ${code}
================
*Products:*
${product}
Plan: ${plan}
Price: ${parseFloat(price).toFixed(2)} EGP
Qty: ${qty}
================
*Customer Info:*
Name: ${name || "N/A"}
Phone: ${phone || "N/A"}${discountLine}
================
${totalSection}
================
🔑 كود تفعيل التطبيق الخاص بك هو: ${code}
📱 لتفعيل تطبيق Ai Lab ومتابعة اشتراكك:
قم بتحميل التطبيق واستخدم رقم واتسابك (${phone || "المسجل"}) وكود التفعيل أعلاه للدخول.

Thank you for choosing Abdelrahim AI Lab!`;
  return `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(msg)}`;
}

function ConfirmContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "N/A";
  const product = searchParams.get("product") || "";
  const plan = searchParams.get("plan") || "";
  const price = searchParams.get("price") || "0";
  const qty = searchParams.get("qty") || "1";
  const total = searchParams.get("total") || "0";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";

  // Referral params
  const referralCode = searchParams.get("referral_code") || undefined;
  const discountPercent = searchParams.get("discount_percent") || undefined;
  const discountAmount = searchParams.get("discount_amount") || undefined;
  const subtotal = searchParams.get("subtotal") || undefined;

  const hasReferral = referralCode && discountPercent && discountAmount && subtotal;

  const waUrl = buildWaUrl(code, product, plan, price, qty, total, name, phone, referralCode, discountPercent, discountAmount, subtotal);

  function copyCode() {
    navigator.clipboard.writeText(code);
    const btn = document.getElementById("copyBtn");
    if (btn) {
      btn.textContent = "✓ تم النسخ";
      setTimeout(() => { btn.textContent = "نسخ الكود 📋"; }, 2000);
    }
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-teal mx-auto mb-6 grid place-items-center shadow-[0_0_40px_rgba(14,143,109,0.4)]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black mb-3">شكراً لك! 🎉</h1>
        <p className="text-text-secondary text-base mb-8 leading-relaxed">
          تم تسجيل طلبك بنجاح. أرسل رسالة واتساب لتأكيد الطلب — سيقوم
          فريقنا بتفعيل اشتراكك بعد الدفع.
        </p>

        {/* Status steps */}
        <div className="flex flex-col gap-3 mb-8 text-right">
          <div className="flex items-center justify-between bg-teal-soft border border-teal/20 rounded-xl px-5 py-4">
            <span className="font-bold text-teal text-sm">تم تسجيل طلبك</span>
            <span className="text-teal text-xl">✓</span>
          </div>
          <div className="flex items-center justify-between bg-bg-card border border-border rounded-xl px-5 py-4">
            <span className="text-text-secondary text-sm">أرسل رسالة واتساب للتأكيد</span>
            <span className="text-text-muted text-xl">💬</span>
          </div>
          <div className="flex items-center justify-between bg-bg-card border border-border rounded-xl px-5 py-4">
            <span className="text-text-secondary text-sm">فريقنا بيفعّل اشتراكك بعد الدفع</span>
            <span className="text-text-muted text-xl">🕐</span>
          </div>
        </div>

        {/* Discount summary */}
        {hasReferral && (
          <div className="bg-teal-soft border border-teal/20 rounded-2xl p-5 mb-4 text-right">
            <p className="text-sm font-bold text-teal mb-3">🎟️ تم تطبيق كود الدعوة</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-[family-name:var(--font-mono)] text-text-primary" dir="ltr">{referralCode}</span>
                <span className="text-text-secondary">كود الدعوة</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-[family-name:var(--font-mono)] text-text-primary">{parseFloat(subtotal).toFixed(2)} EGP</span>
                <span className="text-text-secondary">السعر الأصلي</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-[family-name:var(--font-mono)] text-red-400 font-bold">-{parseFloat(discountAmount).toFixed(2)} EGP</span>
                <span className="text-text-secondary">الخصم ({discountPercent}%)</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-teal/10">
                <span className="font-[family-name:var(--font-mono)] text-teal text-lg font-bold">{parseFloat(total).toFixed(2)} EGP</span>
                <span className="text-teal font-bold">✨ الإجمالي بعد الخصم</span>
              </div>
            </div>
          </div>
        )}

        {/* Order code */}
        <div className="bg-bg-card border border-border rounded-2xl p-6 mb-4">
          <p className="text-text-muted text-sm mb-2">كود طلبك</p>
          <p className="font-[family-name:var(--font-mono)] text-3xl font-black text-purple-500 mb-4" dir="ltr">
            {code}
          </p>
          <button
            id="copyBtn"
            onClick={copyCode}
            className="px-5 py-2 rounded-full border border-border text-text-primary text-sm font-bold cursor-pointer hover:border-teal hover:bg-teal-soft transition-colors"
          >
            نسخ الكود 📋
          </button>
        </div>

        <p className="text-text-muted text-xs mb-6">
          📌 احفظ هذا الكود — شاركه مع الدعم إذا احتجت مساعدة.
        </p>

        {/* WhatsApp button - big and prominent */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-5 rounded-2xl bg-[#25D366] text-white font-black text-xl cursor-pointer hover:bg-[#20BD5A] transition-colors shadow-[0_8px_30px_rgba(37,211,102,0.4)] mb-4 no-underline"
        >
          افتح واتساب وأرسل الطلب 💬
        </a>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <Link
            href="/products"
            className="flex-1 py-3 rounded-xl border border-border text-text-primary font-bold text-sm text-center hover:border-teal hover:bg-teal-soft transition-colors no-underline"
          >
            متابعة التسوق 🛒
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 rounded-xl border border-border text-text-primary font-bold text-sm text-center hover:border-teal hover:bg-teal-soft transition-colors no-underline"
          >
            العودة للرئيسية 🏠
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function OrderConfirmPage() {
  return (
    <Suspense fallback={
      <section className="py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-teal/20 mx-auto mb-6 grid place-items-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-teal/40"></div>
        </div>
        <p className="text-text-muted">جاري تحميل تفاصيل الطلب...</p>
      </section>
    }>
      <ConfirmContent />
    </Suspense>
  );
}
