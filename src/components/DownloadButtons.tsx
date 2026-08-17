"use client";

import React from "react";

export default function DownloadButtons() {
  const trackDownload = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "CompleteRegistration");
    }
  };

  return (
    <>
      <a
        href="https://play.google.com/store/apps/details?id=com.aal.hopenworks"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackDownload}
        className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-gray-100 text-black font-extrabold text-base sm:text-lg text-center flex items-center justify-center gap-3 no-underline shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.99]"
      >
        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.4,12.71L10.05,17.06L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M9.36,6.93L14.4,11.28L16.81,8.87L9.36,6.93Z" />
        </svg>
        <span>تثبيت من Google Play</span>
      </a>
      <a
        href="/AAL_User_App.apk"
        download="AAL_User_App.apk"
        onClick={trackDownload}
        className="w-full py-4 px-6 rounded-2xl bg-teal hover:bg-teal/85 text-white font-extrabold text-base sm:text-lg text-center flex items-center justify-center gap-3 no-underline shadow-[0_4px_24px_rgba(14,143,109,0.35)] hover:shadow-[0_6px_30px_rgba(14,143,109,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.99]"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
        </svg>
        <span>تثبيت / تحميل مباشر (APK v1.0.1)</span>
      </a>
    </>
  );
}
