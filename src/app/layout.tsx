import type { Metadata } from "next";
import { Alexandria, Almarai, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const alexandria = Alexandria({
  variable: "--font-display",
  subsets: ["latin", "arabic"],
  weight: ["600", "700", "800", "900"],
});

const almarai = Almarai({
  variable: "--font-body",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Abdelrahim AI Lab — Store",
  description:
    "Digital subscriptions and software licenses at the best prices. Order via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${almarai.variable} ${shareTechMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
