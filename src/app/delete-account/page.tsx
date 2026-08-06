import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "طلب حذف الحساب والبيانات | Data Deletion Request - Abdelrahim AI Lab",
  description: "نموذج وخطوات طلب حذف الحساب والبيانات لتطبيق وموقع Abdelrahim AI Lab.",
};

export default function DeleteAccountPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">طلب حذف الحساب والبيانات</h1>
          <p className="text-text-secondary">Data & Account Deletion Request</p>
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-6 text-right leading-relaxed">
          <p className="text-text-primary font-bold text-base sm:text-lg">
            في <strong>Abdelrahim AI Lab</strong>، نمنحك التحكم الكامل في بياناتك الشخصية وحسابك.
          </p>

          <div className="bg-bg-input border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-extrabold text-teal text-base">خطوات تقديم طلب الحذف:</h3>
            <ol className="list-decimal list-inside text-text-secondary text-sm space-y-2 pr-2">
              <li>تواصل مع فريق الدعم عبر الواتساب المباشر بالضغط على الزر أدناه.</li>
              <li>أرسل رقم الهاتف المرتبط بحسابك وطلب حذف الحساب نهائياً.</li>
              <li>سيتم مراجعة الطلب وحذف بياناتك وسجلاتك بالكامل من خوادمنا خلال 24 ساعة.</li>
            </ol>
          </div>

          <div className="bg-bg-input border border-border rounded-xl p-5 space-y-2">
            <h3 className="font-extrabold text-teal text-base">البيانات التي سيتم حذفها:</h3>
            <ul className="list-disc list-inside text-text-secondary text-sm space-y-1 pr-2">
              <li>بيانات الاسم ورقم الهاتف والبريد الإلكتروني المسجلة.</li>
              <li>سجلات الأوردرات السابقة وأكواد التفعيل المرتبطة بك.</li>
              <li>سجل المحفظة ونقاط المكافآت التابعة لك.</li>
            </ul>
          </div>

          <div className="pt-4 text-center">
            <a
              href="https://wa.me/201116745020?text=أرغب%20في%20حذف%20حسابي%20وبياناتي%20بالكامل"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-teal text-white font-black text-base rounded-xl hover:bg-teal-hover transition-transform hover:scale-105 no-underline shadow-lg"
            >
              تقديم طلب حذف الحساب الآن 🗑️
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
