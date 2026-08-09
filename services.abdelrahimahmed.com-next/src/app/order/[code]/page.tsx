import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Order } from "@/lib/supabase";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("order_code", code)
    .single();

  const o = order as Order | null;

  const waMsg = o
    ? `Order Confirmation\nOrder Code: ${o.order_code}\nTotal: EGP ${o.total}\n\nPlease confirm this order.`
    : "";
  const waLink = `https://wa.me/201116745020?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-black mb-4">تم إنشاء طلبك!</h1>

        {o ? (
          <>
            <div className="bg-bg-card border border-border rounded-2xl p-6 mb-6">
              <p className="text-text-muted text-sm mb-2">رقم الطلب</p>
              <p className="font-[family-name:var(--font-mono)] text-2xl font-bold text-teal mb-4">
                {o.order_code}
              </p>
              <div className="border-t border-border pt-4">
                {o.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">
                      {item.product_name} — {item.plan_name} × {item.qty}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-teal font-bold">
                      EGP {item.price * item.qty}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border mt-3 pt-3 flex justify-between">
                  <span className="font-bold">الإجمالي</span>
                  <span className="font-[family-name:var(--font-mono)] text-xl font-bold text-teal">
                    EGP {o.total}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className="inline-block w-full py-3 rounded-full bg-teal text-text-primary font-bold hover:bg-teal/80 transition-colors no-underline shadow-[0_4px_16px_var(--color-teal-glow)]"
            >
              💬 تأكيد الطلب عبر واتساب
            </a>
          </>
        ) : (
          <p className="text-text-secondary mb-6">
            لم نتمكن من العثور على هذا الطلب. تأكد من صحة الرقم.
          </p>
        )}

        <Link
          href="/products"
          className="inline-block mt-4 text-text-secondary hover:text-text-primary text-sm no-underline"
        >
          تصفّح المنتجات ←
        </Link>
      </div>
    </section>
  );
}
