"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/supabase";
import { trackAddToWishlist, trackClickButton } from "@/lib/tiktok";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [wished, setWished] = useState(false);
  const price = product.plans[0]?.price ?? 0;

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
    trackAddToWishlist({
      id: product.id,
      name: product.name_ar,
      type: "product",
      value: price,
      currency: "EGP",
    });
  }

  function handleCtaClick(action: string) {
    trackClickButton(action, {
      id: product.id,
      name: product.name_ar,
      type: "product",
      value: price,
      currency: "EGP",
    });
  }

  return (
    <article
      className="group relative bg-gradient-to-b from-[#132238]/90 via-[#0F1B2B]/85 to-[#0A131F]/95 rounded-2xl p-4 sm:p-4.5 border border-white/[0.07] hover:border-teal/40 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(14,143,109,0.22)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden animate-fade-in-up backdrop-blur-xl"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top Ambient Glow on Hover */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-teal/0 group-hover:via-teal to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />

      <div>
        {/* Header: Icon + Category + Wishlist */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#162536] border border-white/[0.08] grid place-items-center overflow-hidden flex-shrink-0 group-hover:scale-105 group-hover:border-teal/30 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.icon_url} alt="" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex flex-wrap gap-1 min-w-0">
              <span className="text-[10px] font-bold font-[family-name:var(--font-mono)] px-2 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20 tracking-wider">
                {product.category_label}
              </span>
              {product.tags.length > 0 && (
                <span className="text-[10px] font-bold font-[family-name:var(--font-mono)] px-1.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                  {product.tags[0]}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleWishlist}
            title={wished ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            className={`w-8 h-8 rounded-full grid place-items-center flex-shrink-0 transition-all duration-200 border border-white/[0.06] hover:scale-110 ${
              wished
                ? "bg-red/15 text-red border-red/30"
                : "bg-white/[0.03] text-text-muted hover:text-red hover:bg-red/10 hover:border-red/20"
            }`}
          >
            <span className="text-sm leading-none">{wished ? "♥" : "♡"}</span>
          </button>
        </div>

        {/* Title */}
        <h3 className="text-[15px] sm:text-base font-extrabold text-text-primary group-hover:text-teal transition-colors tracking-tight mb-2 line-clamp-1">
          {product.name_ar}
        </h3>

        {/* Concise Features (Max 2-3 items) */}
        <ul className="list-none m-0 p-0 space-y-1 mb-3">
          {product.features.slice(0, 3).map((f, i) => (
            <li
              key={i}
              className="text-xs text-text-secondary flex items-center gap-1.5 line-clamp-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 shadow-[0_0_6px_rgba(14,143,109,0.6)]" />
              <span className="truncate">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Area: Badges, Price, Actions */}
      <div>
        {/* Trust Badges & Price Row */}
        <div className="flex items-center justify-between pt-2.5 mb-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ✓ تسليم فوري
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              🛡️ ضمان كامل
            </span>
          </div>
          <div className="text-left flex-shrink-0">
            <span className="text-[10px] text-text-muted block leading-tight">يبدأ من</span>
            <span className="font-[family-name:var(--font-mono)] text-base font-black text-white tracking-tight">
              <span className="text-xs font-normal text-text-secondary mr-0.5">EGP</span>
              {price}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.id}`}
            onClick={() => handleCtaClick("ViewDetails")}
            className="text-center py-2 px-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-text-secondary hover:text-white text-xs font-bold hover:border-teal/40 hover:bg-teal/10 transition-all duration-200 no-underline"
          >
            تفاصيل
          </Link>
          <Link
            href={`/products/${product.id}`}
            onClick={() => handleCtaClick("SubscribeNow")}
            className="text-center py-2 px-2.5 rounded-xl bg-teal hover:bg-teal/85 text-white text-xs font-bold transition-all duration-200 no-underline shadow-[0_2px_12px_rgba(14,143,109,0.3)] hover:shadow-[0_4px_16px_rgba(14,143,109,0.45)] flex items-center justify-center gap-1"
          >
            <span>اشترك الآن</span>
            <span className="text-[11px]">←</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
