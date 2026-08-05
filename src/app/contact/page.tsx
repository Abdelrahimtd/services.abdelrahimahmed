"use client";

import { useState } from "react";

const WA_LINK = "https://wa.me/201116745020?text=";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function sendWhatsApp() {
    if (!msg) {
      alert("اكتب رسالتك أولاً");
      return;
    }
    const text = `Hello from Abdelrahim AI Lab\nName: ${name || "N/A"}\nEmail: ${email || "N/A"}\nMessage: ${msg}`;
    window.location.href = `${WA_LINK}${encodeURIComponent(text)}`;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">تواصل معانا</h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            عندك سؤال أو تحتاج مساعدة؟ نحن هنا لمساعدتك. تواصل معانا عبر واتساب
            للحصول على أسرع استجابة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-extrabold mb-5">أرسل لنا رسالة</h3>
            <div className="mb-4">
              <label className="block text-sm text-text-secondary mb-1.5 font-bold">
                الاسم
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك"
                className="w-full bg-bg-input border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-teal transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-secondary mb-1.5 font-bold">
                بريدك الإلكتروني
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك"
                className="w-full bg-bg-input border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-teal transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-text-secondary mb-1.5 font-bold">
                رسالتك
              </label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                className="w-full bg-bg-input border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-teal transition-colors resize-y"
              />
            </div>
            <button
              onClick={sendWhatsApp}
              className="w-full py-3 rounded-full bg-teal text-text-primary font-bold cursor-pointer hover:bg-teal/80 transition-colors shadow-[0_4px_16px_var(--color-teal-glow)]"
            >
              💬 إرسال عبر واتساب
            </button>
          </div>

          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/message/UM753BLE6M7QE1"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-5 bg-bg-card border border-border rounded-2xl p-5 hover:border-teal transition-colors no-underline"
            >
              <div className="w-14 h-14 rounded-full bg-[rgba(37,211,102,0.15)] text-[#25D366] text-2xl grid place-items-center flex-shrink-0">
                💬
              </div>
              <div>
                <h4 className="text-lg font-extrabold mb-0.5 text-text-primary">واتساب</h4>
                <p className="text-text-secondary text-sm m-0">
                  تحدث معنا مباشرة على واتساب للدعم الفوري.
                </p>
                <span className="text-teal font-bold text-sm">01116745020</span>
              </div>
            </a>

            <a
              href="mailto:contact@abdelrahimahmed.com"
              className="flex items-center gap-5 bg-bg-card border border-border rounded-2xl p-5 hover:border-teal transition-colors no-underline"
            >
              <div className="w-14 h-14 rounded-full bg-[rgba(124,92,252,0.15)] text-[#7C5CFC] text-2xl grid place-items-center flex-shrink-0">
                ✉
              </div>
              <div>
                <h4 className="text-lg font-extrabold mb-0.5 text-text-primary">البريد الإلكتروني</h4>
                <p className="text-text-secondary text-sm m-0">
                  أرسل لنا بريداً إلكترونياً وسنرد خلال 24 ساعة.
                </p>
                <span className="text-teal font-bold text-sm">contact@abdelrahimahmed.com</span>
              </div>
            </a>

            <a
              href="tel:+201116745020"
              className="flex items-center gap-5 bg-bg-card border border-border rounded-2xl p-5 hover:border-teal transition-colors no-underline"
            >
              <div className="w-14 h-14 rounded-full bg-teal-soft text-teal text-2xl grid place-items-center flex-shrink-0">
                ✆
              </div>
              <div>
                <h4 className="text-lg font-extrabold mb-0.5 text-text-primary">الهاتف</h4>
                <p className="text-text-secondary text-sm m-0">
                  اتصل بنا خلال ساعات العمل.
                </p>
                <span className="text-teal font-bold text-sm">+20 11 1674 5020</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
