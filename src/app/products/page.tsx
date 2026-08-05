import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
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
    <section className="py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">جميع المنتجات</h1>
        </div>
        <CategoryFilter />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="productsGrid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
