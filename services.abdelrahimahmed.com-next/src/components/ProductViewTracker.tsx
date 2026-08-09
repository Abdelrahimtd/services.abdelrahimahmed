"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/tiktok";
import type { Product } from "@/lib/supabase";

export default function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackViewContent({
      id: product.id,
      name: product.name_ar,
      type: "product",
      value: product.plans[0]?.price || 0,
      currency: "EGP",
    });
  }, [product]);

  return null;
}
