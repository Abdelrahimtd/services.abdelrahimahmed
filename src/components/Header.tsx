"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();

  const navLinks = [
    { href: "/", label: "الرئيسية", key: "home" },
    { href: "/products", label: "المنتجات", key: "products" },
    { href: "/contact", label: "تواصل معانا", key: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border animate-fade-in-up">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <img 
            src="/Ai-lab.png" 
            alt="Abdelrahim AI Lab Logo" 
            className="h-10 w-auto object-contain transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" 
          />
          <span className="font-[family-name:var(--font-display)] font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-teal to-white animate-pulse tracking-wide drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]">
            AI Lab
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 no-underline ${
                  isActive
                    ? "bg-white/10 text-text-primary animate-pulse-glow"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Cart button */}
        <button
          onClick={openCart}
          className="relative bg-transparent border-none text-text-secondary cursor-pointer p-2 hover:text-teal transition-all duration-300 hover:scale-110"
          aria-label="Shopping cart"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-teal text-text-primary text-[11px] font-bold w-[18px] h-[18px] rounded-full grid place-items-center leading-none animate-fade-in-scale">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
