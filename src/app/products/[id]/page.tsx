import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import OrderForm from "@/components/OrderForm";
import ProductViewTracker from "@/components/ProductViewTracker";
import type { Product } from "@/lib/supabase";

export const revalidate = 60;

async function getProduct(id: string): Promise<Product | null> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return data as Product | null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <section className="py-8 sm:py-12">
      <ProductViewTracker product={product} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-text-secondary text-sm hover:text-text-primary no-underline mb-6"
        >
          &rarr; العودة للمنتجات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          {/* Product Info */}
          <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-[72px] h-[72px] rounded-[18px] bg-bg-input grid place-items-center overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.icon_url} alt="" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-black mb-1">{product.name_ar}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-[family-name:var(--font-mono)] px-3 py-1 rounded-full bg-teal-soft text-teal border border-teal/15">
                    {product.category_label}
                  </span>
                  {product.in_stock && (
                    <span className="text-xs text-green flex items-center gap-1">
                      ✓ متوفر
                    </span>
                  )}
                  <span className="text-sm text-gold">{product.rating} ★</span>
                </div>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-extrabold mb-3 flex items-center gap-2">
                ✓ المميزات
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div
                    key={i}
                    className="bg-bg-input border border-border rounded-xl px-4 py-2.5 text-sm text-text-secondary flex items-center gap-2"
                  >
                    <span className="text-teal font-bold">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 bg-teal-soft border border-teal/15 rounded-xl p-4">
              <span className="text-2xl">🛡</span>
              <div>
                <strong className="text-teal block text-sm">ضمان كامل شامل</strong>
                <p className="text-text-secondary text-xs m-0">
                  جميع الباقات تشمل ضمان كامل بدون تكلفة إضافية
                </p>
              </div>
            </div>
          </div>

          {/* Order Sidebar */}
          <OrderForm product={product} />
        </div>
      </div>
    </section>
  );
}
