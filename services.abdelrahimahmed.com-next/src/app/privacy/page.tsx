import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Privacy Policy - Abdelrahim AI Lab",
  description: "سياسة الخصوصية وحماية البيانات لتطبيق وموقع Abdelrahim AI Lab.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">سياسة الخصوصية (Privacy Policy)</h1>
          <p className="text-text-secondary">
            تاريخ التحديث: {new Date().toLocaleDateString("ar-EG")}
          </p>
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-8 text-right leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-extrabold text-teal mb-3">1. مقدمة (Introduction)</h2>
            <p className="text-text-secondary text-sm sm:text-base">
              نحن في <strong>Abdelrahim AI Lab (HopenWorks)</strong> نلتزم بحماية خصوصية مستخدمينا وضمان أمان بياناتهم الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية البيانات الخاصة بك عند استخدامك لتطبيقنا وموقعنا الإلكتروني.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-extrabold text-teal mb-3">2. البيانات التي نجمعها (Information We Collect)</h2>
            <p className="text-text-secondary text-sm sm:text-base mb-2">
              قد نجمع البيانات التالية لتقديم أفضل خدمة ممكنة:
            </p>
            <ul className="list-disc list-inside text-text-secondary text-sm sm:text-base space-y-1 pr-4">
              <li><strong>بيانات الهوية والتواصل:</strong> الاسم، رقم الواتساب، والبريد الإلكتروني للتحقق من طلبات الاشتراكات وإصدار أكواد التفعيل.</li>
              <li><strong>بيانات الاشتراكات:</strong> تفاصيل الأوردرات وأكواد التفعيل والحالة التشغيلية للاشتراك.</li>
              <li><strong>بيانات بصمة الجهاز (Local Biometrics):</strong> عند تفعيل خيار البصمة / Face ID لتسجيل الدخول، يتم معالجة التحقق محلياً بالكامل على جهازك دون إرسال أو تخزين بيانات بصمتك على خوادمنا.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-extrabold text-teal mb-3">3. كيفية استخدام البيانات (How We Use Your Information)</h2>
            <ul className="list-disc list-inside text-text-secondary text-sm sm:text-base space-y-1 pr-4">
              <li>تأكيد وتنفيذ طلبات شراء اشتراكات أدوات الذكاء الاصطناعي.</li>
              <li>تفعيل الحسابات وتزويد المستهلك بكود تفعيل تطبيق Ai Lab ومتابعة مدة الاشتراك.</li>
              <li>تقديم الدعم الفني وخدمة العملاء عبر الواتساب.</li>
              <li>إدارة نظام المكافآت وكوبونات الخصم للمستخدمين.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-extrabold text-teal mb-3">4. حماية ومشاركة البيانات (Data Protection & Sharing)</h2>
            <p className="text-text-secondary text-sm sm:text-base">
              نحن <strong>لا نبيع أو نؤجر أو نتربح من بياناتك الشخصية</strong> لأي أطراف ثالثة. يتم تخزين البيانات بشكل مشفر وآمن عبر بنية سحابية محمية، ولا نصل إلا للبيانات الضرورية لتأكيد وتفعيل الاشتراكات.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-extrabold text-teal mb-3">5. حقوق المستخدم وحذف الحساب (User Rights & Data Deletion)</h2>
            <p className="text-text-secondary text-sm sm:text-base">
              يحق لك في أي وقت طلب استعراض بياناتك، أو تعديلها، أو طلب <strong>حذف بيانات حسابك وسجلاتك نهائياً</strong> من خوادمنا عبر التواصل المباشر مع فريق الدعم الفني عبر الواتساب، وسيتم تنفيذ طلبك فوراً.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-extrabold text-teal mb-3">6. التواصل معنا (Contact Us)</h2>
            <p className="text-text-secondary text-sm sm:text-base mb-3">
              إذا كان لديك أي استفسار حول سياسة الخصوصية أو حماية البيانات، يمكنك التواصل معنا عبر:
            </p>
            <div className="bg-bg-input border border-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="font-bold text-text-primary">فريق الدعم الفني - Abdelrahim AI Lab</p>
                <p className="text-sm text-text-muted">واتساب: +201116745020</p>
              </div>
              <a
                href="https://wa.me/201116745020"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-teal text-white font-bold text-sm rounded-xl hover:bg-teal-hover transition-colors no-underline"
              >
                تواصل عبر واتساب 💬
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
