import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { Suspense } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import type { Product } from "@/lib/supabase";

export const revalidate = 60;

async function getAllProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as Product[]) ?? [];
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">جميع المنتجات والاشتراكات</h1>
          <p className="text-text-secondary text-sm mt-1">اختر اشتراكك المفضل واستلم بياناتك فوراً</p>
        </div>
        <Suspense fallback={<div className="text-center py-4 text-text-muted text-sm">جاري تحميل الفئات...</div>}>
          <CategoryFilter />
        </Suspense>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="productsGrid">
          {products.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
