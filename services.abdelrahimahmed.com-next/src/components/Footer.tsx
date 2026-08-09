import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 no-underline group hover:opacity-100">
              <img 
                src="/Ai-lab.png" 
                alt="Abdelrahim AI Lab Logo" 
                className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" 
              />
              <span className="font-[family-name:var(--font-display)] font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-teal to-white animate-pulse">
                AI Lab
              </span>
            </Link>
            <p className="text-text-muted text-sm mt-3">
              Digital subscriptions & licenses — order via WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-text-secondary text-sm hover:text-text-primary no-underline">
              الرئيسية
            </Link>
            <Link href="/products" className="text-text-secondary text-sm hover:text-text-primary no-underline">
              المنتجات
            </Link>
            <Link href="/contact" className="text-text-secondary text-sm hover:text-text-primary no-underline">
              تواصل معانا
            </Link>
            <Link href="/privacy" className="text-text-secondary text-sm hover:text-text-primary no-underline">
              سياسة الخصوصية
            </Link>
            <Link href="/delete-account" className="text-text-secondary text-sm hover:text-text-primary no-underline">
              حذف الحساب والبيانات
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/message/UM753BLE6M7QE1"
              target="_blank"
              rel="noopener"
              className="text-text-secondary text-sm hover:text-text-primary no-underline"
            >
              واتساب
            </a>
            <a
              href="mailto:contact@abdelrahimahmed.com"
              className="text-text-secondary text-sm hover:text-text-primary no-underline"
            >
              contact@abdelrahimahmed.com
            </a>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-text-muted text-xs">
          © 2026 Abdelrahim AI Lab — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
