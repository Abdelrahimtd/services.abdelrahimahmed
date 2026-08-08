"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trackSearch } from "@/lib/tiktok";

const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "ai", label: "AI & PRODUCTIVITY" },
  { id: "creative", label: "CREATIVE TOOLS" },
  { id: "productivity", label: "PRODUCTIVITY" },
  { id: "streaming", label: "STREAMING" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("cat") ?? "all";

  function setCategory(cat: string) {
    trackSearch(cat !== "all" ? cat : "all_products");
    const params = new URLSearchParams();
    if (cat !== "all") params.set("cat", cat);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex justify-center gap-2 flex-wrap mb-8">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => setCategory(c.id)}
          className={`px-4 py-1.5 rounded-full border text-sm font-bold cursor-pointer transition-colors ${
            active === c.id
              ? "bg-teal text-text-primary border-teal"
              : "bg-transparent text-text-secondary border-border hover:border-teal hover:text-text-primary"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
