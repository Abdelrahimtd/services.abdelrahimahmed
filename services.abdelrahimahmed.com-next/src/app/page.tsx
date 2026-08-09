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
      <section className="py-14 sm:py-20 text-center bg-[radial-gradient(ellipse_at_50%_20%,var(--color-teal-soft),transparent_60%)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <span className="inline-block font-[family-name:var(--font-mono)] text-xs text-teal bg-teal-soft px-4 py-1.5 rounded-full border border-teal/20 tracking-widest mb-5">
            ABDELRAHIM AI LAB
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-3 leading-tight text-white">
            اشتراكات الذكاء الاصطناعي والأدوات
            <br />
            <span className="text-teal">بأفضل الأسعار الرسمية</span>
          </h1>
          <p className="text-text-secondary text-base max-w-lg mx-auto mb-6">
            احصل على ChatGPT, Gemini, Claude, Canva — بأفضل الأسعار. استلام فوري وضمان كامل طوال مدة الاشتراك.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full border border-border text-text-primary text-sm font-bold hover:border-teal hover:bg-teal-soft transition-colors no-underline"
            >
              تواصل معنا
            </Link>
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-full bg-teal text-text-primary text-sm font-bold hover:bg-teal/80 transition-colors no-underline shadow-[0_4px_16px_var(--color-teal-glow)]"
            >
              تصفّح الاشتراكات ←
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-16 mt-10 pt-6 border-t border-border">
            <div className="text-center">
              <strong className="block font-[family-name:var(--font-mono)] text-xl sm:text-2xl text-text-primary">
                5-10 دقائق
              </strong>
              <span className="text-text-muted text-xs">متوسط التسليم</span>
            </div>
            <div className="text-center">
              <strong className="block font-[family-name:var(--font-mono)] text-xl sm:text-2xl text-text-primary">
                +11
              </strong>
              <span className="text-text-muted text-xs">خدمة مميزة</span>
            </div>
            <div className="text-center">
              <strong className="block font-[family-name:var(--font-mono)] text-xl sm:text-2xl text-text-primary">
                +300
              </strong>
              <span className="text-text-muted text-xs">عميل سعيد</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 sm:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 text-white">
              الاشتراكات المميزة
            </h2>
            <p className="text-text-secondary text-sm">⭐ الأكثر طلباً ومبيعاً</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {products.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="px-6 py-2.5 rounded-full border border-border text-text-primary text-sm font-bold hover:border-teal hover:bg-teal-soft transition-colors no-underline"
            >
              عرض جميع المنتجات ←
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
