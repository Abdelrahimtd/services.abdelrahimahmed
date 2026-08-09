import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حمّل تطبيق Abdelrahim AI Lab الرسمي | متجر الاشتراكات",
  description: "حمّل تطبيق Abdelrahim AI Lab الرسمي للأندرويد واستمتع بتجربة تسوق سريعة، تتبع فوري لطلباتك، وتنبيهات مباشرة لاشتراكات الذكاء الاصطناعي.",
};

const SCREENSHOTS = [
  { id: 1, src: "/app-screens/screen-1.jpg", caption: "الرئيسية وتصفح الاشتراكات" },
  { id: 2, src: "/app-screens/screen-2.jpg", caption: "تفاصيل وباقات الاشتراك" },
  { id: 3, src: "/app-screens/screen-3.jpg", caption: "سلة الطلبات والدفع السريع" },
  { id: 4, src: "/app-screens/screen-4.jpg", caption: "تتبع حالة وتفاصيل الطلب" },
  { id: 5, src: "/app-screens/screen-5.jpg", caption: "الإشعارات وتحديثات الحساب" },
];

export default function AppDownloadPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-[860px] mx-auto">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-text-secondary hover:text-white text-sm font-bold no-underline transition-colors"
          >
            <span>←</span>
            <span>العودة للمتجر</span>
          </Link>
          <span className="text-xs font-[family-name:var(--font-mono)] text-teal bg-teal-soft px-3 py-1 rounded-full border border-teal/20">
            OFFICIAL ANDROID APP
          </span>
        </div>

        {/* ═══ Google Play Style App Header ═══════════════════════════════ */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-6 border border-white/[0.08] relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
            {/* App Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] bg-gradient-to-b from-[#1E2F45] to-[#0F1B2B] p-2.5 shadow-2xl border border-white/10 flex-shrink-0 grid place-items-center animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Ai-lab.png"
                alt="Abdelrahim AI Lab Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            {/* App Title & Metadata */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">
                Abdelrahim AI Lab
              </h1>
              <p className="text-teal font-bold text-sm sm:text-base mb-1">
                Abdelrahim CEO • Verified Developer
              </p>
              <p className="text-text-muted text-xs flex items-center gap-2">
                <span>تطبيق رسمي معتمد</span>
                <span>•</span>
                <span>In-app purchases</span>
              </p>
            </div>
          </div>

          {/* ═══ Metrics Strip (Google Play Style) ════════════════════════ */}
          <div className="grid grid-cols-4 gap-2 py-4 my-6 border-y border-white/[0.06] text-center">
            <div>
              <div className="flex items-center justify-center gap-1 font-bold text-base sm:text-lg text-white">
                <span>4.9</span>
                <span className="text-gold text-sm">★</span>
              </div>
              <span className="text-[11px] text-text-muted">12K تقييم</span>
            </div>

            <div className="border-r border-white/[0.06]">
              <div className="font-bold text-base sm:text-lg text-white font-[family-name:var(--font-mono)]">
                56 MB
              </div>
              <span className="text-[11px] text-text-muted">الحجم</span>
            </div>

            <div className="border-r border-white/[0.06]">
              <div className="font-bold text-base sm:text-lg text-emerald-400">
                3+
              </div>
              <span className="text-[11px] text-text-muted">مناسب للجميع</span>
            </div>

            <div className="border-r border-white/[0.06]">
              <div className="font-bold text-base sm:text-lg text-white font-[family-name:var(--font-mono)]">
                +10K
              </div>
              <span className="text-[11px] text-text-muted">تنزيل</span>
            </div>
          </div>

          {/* ═══ Big Action Buttons ═══════════════════════════════════════ */}
          <div className="space-y-3">
            <a
              href="/AAL_User_App.apk"
              download="AAL_User_App.apk"
              className="w-full py-4 px-6 rounded-2xl bg-teal hover:bg-teal/85 text-white font-extrabold text-base sm:text-lg text-center flex items-center justify-center gap-3 no-underline shadow-[0_4px_24px_rgba(14,143,109,0.35)] hover:shadow-[0_6px_30px_rgba(14,143,109,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
              </svg>
              <span>تثبيت / تحميل مباشر (APK v1.0.1)</span>
            </a>

            <div className="flex items-center justify-between text-xs text-text-secondary px-2 pt-1 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span>🛡️</span>
                <span>فحص أمني معتمد • خالي من الفيروسات 100%</span>
              </span>
              <span className="text-text-muted">
                يعمل على Android 8.0 فما فوق
              </span>
            </div>
          </div>
        </div>

        {/* ═══ Screenshots Carousel ═══════════════════════════════════════ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>📱</span>
              <span>لقطات من داخل التطبيق</span>
            </h2>
            <span className="text-xs text-text-muted">اسحب لليمين واليسار ↔</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
            {SCREENSHOTS.map((s) => (
              <div
                key={s.id}
                className="flex-shrink-0 w-[180px] sm:w-[220px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111D2E] shadow-xl hover:border-teal/40 transition-all snap-center group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.caption}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="p-2.5 text-center bg-[#0C1522] border-t border-white/[0.04]">
                  <span className="text-[11px] text-text-secondary font-bold">
                    {s.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ About this app ═════════════════════════════════════════════ */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 mb-6 border border-white/[0.08]">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span>✨</span>
            <span>عن هذا التطبيق</span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
            تطبيق **Abdelrahim AI Lab** هو بوابتك الرسمية المباشرة للحصول على أقوى اشتراكات الذكاء الاصطناعي والأدوات الرقمية (ChatGPT, Claude, Gemini, Canva Pro, CapCut, Adobe Creative Cloud) بأفضل الأسعار الرسمية في مصر والشرق الأوسط مع تسليم فوري وتنبيهات لحظية.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <strong className="block text-white text-sm font-bold">تسليم فوري ومباشر</strong>
                <span className="text-xs text-text-muted">استلم بيانات اشتراكك خلال 5-10 دقائق مع إشعارات فورية.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <strong className="block text-white text-sm font-bold">ضمان ذهبي كامل</strong>
                <span className="text-xs text-text-muted">ضمان شامل طوال مدة اشتراكك مع دعم فني متواصل 24/7.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
              <span className="text-xl">📦</span>
              <div>
                <strong className="block text-white text-sm font-bold">تتبع الطلبات وحسابك</strong>
                <span className="text-xs text-text-muted">متابعة كافة طلباتك السابقة وتجديد الاشتراكات بضغطة زر.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
              <span className="text-xl">🎁</span>
              <div>
                <strong className="block text-white text-sm font-bold">عروض وخصومات حصرية</strong>
                <span className="text-xs text-text-muted">خصومات وكوبونات خاصة فقط بمستخدمي تطبيق الهاتف.</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
            <span className="px-3 py-1 rounded-full bg-teal-soft text-teal text-xs font-bold border border-teal/20">
              #1 اشتراكات ذكاء اصطناعي
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] text-text-secondary text-xs font-bold border border-white/[0.08]">
              أدوات الإنتاجية
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] text-text-secondary text-xs font-bold border border-white/[0.08]">
              تسوق رقمي
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] text-text-secondary text-xs font-bold border border-white/[0.08]">
              توصيل فوري
            </span>
          </div>
        </div>

        {/* ═══ Data Safety & Security ═════════════════════════════════════ */}
        <div className="glass-card rounded-3xl p-6 border border-white/[0.08] mb-8">
          <h2 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🔒</span>
            <span>أمان البيانات والخصوصية (Data safety)</span>
          </h2>
          <div className="space-y-2 text-xs text-text-secondary">
            <p className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>لا تتم مشاركة بياناتك الشخصية مع أي أطراف ثالثة.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>كافة الاتصالات مشفرة بتقنية SSL / TLS عالية الأمان.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>يمكنك طلب حذف بيانات حسابك في أي وقت بسهولة.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
