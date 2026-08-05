import Link from "next/link";
import type { Product } from "@/lib/supabase";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const price = product.plans[0]?.price ?? 0;

  return (
    <article
      className="product-card card-shine glass-card rounded-2xl p-6 flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-[52px] h-[52px] rounded-[14px] bg-bg-input grid place-items-center overflow-hidden flex-shrink-0 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.icon_url} alt="" className="w-7 h-7 object-contain" />
        </div>
        <button className="text-text-muted hover:text-gold text-xl bg-transparent border-none cursor-pointer transition-colors hover:scale-125">
          ♡
        </button>
      </div>

      <h3 className="text-lg font-extrabold mb-2 gradient-text">{product.name_ar}</h3>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-[11px] font-[family-name:var(--font-mono)] px-2.5 py-1 rounded-full bg-teal-soft text-teal border border-teal/15 tracking-wide">
          {product.category_label}
        </span>
        {product.tags.map((tag, i) => (
          <span
            key={i}
            className="text-[11px] font-[family-name:var(--font-mono)] px-2.5 py-1 rounded-full bg-teal-soft text-teal border border-teal/15"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="list-none m-0 p-0 flex-1 mb-4">
        {product.features.slice(0, 4).map((f, i) => (
          <li
            key={i}
            className="text-sm text-text-secondary py-0.5 flex items-start gap-1.5 before:content-['✓'] before:text-teal before:font-bold before:flex-shrink-0"
          >
            {f}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex gap-2 items-center">
          {product.in_stock && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold-soft text-gold font-bold badge-pulse">
              ✓ In Stock
            </span>
          )}
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold-soft text-gold font-bold">
            ✓ Full Warranty
          </span>
        </div>
        <div className="text-left">
          <span className="text-[11px] text-text-muted block">من</span>
          <span className="font-[family-name:var(--font-mono)] text-lg font-bold gradient-text">
            EGP {price}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 text-center px-4 py-2.5 rounded-full border border-border text-text-primary text-sm font-bold hover:border-teal hover:bg-teal-soft transition-all duration-300 no-underline hover-glow"
        >
          تفاصيل
        </Link>
        <Link
          href={`/products/${product.id}`}
          className="flex-1 text-center px-4 py-2.5 rounded-full bg-teal text-text-primary text-sm font-bold hover:bg-teal/80 transition-all duration-300 no-underline shadow-[0_4px_16px_var(--color-teal-glow)] btn-ripple animate-pulse-glow"
        >
          اشترك الآن ←
        </Link>
      </div>
    </article>
  );
}
