import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/supabase";

export const revalidate = 60;

async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .limit(6);
  return (data as Product[]) ?? [];
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center bg-[radial-gradient(ellipse_at_50%_20%,var(--color-teal-soft),transparent_60%)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <span className="inline-block font-[family-name:var(--font-mono)] text-xs text-teal bg-teal-soft px-5 py-1.5 rounded-full border border-teal/20 tracking-widest mb-6">
            ABDELRAHIM AI LAB
          </span>
          <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">
            اشتراكات رقمية
            <br />
            <span className="text-teal">بأفضل الأسعار</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-lg mx-auto mb-8">
            احصل على ChatGPT, Gemini, Claude — بأفضل الأسعار. اطلب عبر
            واتساب بدون إنشاء حساب.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-border text-text-primary font-bold hover:border-teal hover:bg-teal-soft transition-colors no-underline"
            >
              تواصل معانا
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-teal text-text-primary font-bold hover:bg-teal/80 transition-colors no-underline shadow-[0_4px_16px_var(--color-teal-glow)]"
            >
              تصفّح الاشتراكات ←
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-20 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <strong className="block font-[family-name:var(--font-mono)] text-2xl text-text-primary">
                5-10 دقائق
              </strong>
              <span className="text-text-muted text-sm">متوسط التسليم</span>
            </div>
            <div className="text-center">
              <strong className="block font-[family-name:var(--font-mono)] text-2xl text-text-primary">
                +11
              </strong>
              <span className="text-text-muted text-sm">خدمة مميزة</span>
            </div>
            <div className="text-center">
              <strong className="block font-[family-name:var(--font-mono)] text-2xl text-text-primary">
                +300
              </strong>
              <span className="text-text-muted text-sm">عميل سعيد</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1">
              الاشتراكات المميزة
            </h2>
            <p className="text-text-secondary">⭐ الأكثر مبيعاً</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full border border-border text-text-primary font-bold hover:border-teal hover:bg-teal-soft transition-colors no-underline"
            >
              عرض جميع المنتجات ←
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
