"use client";

import { type ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import CartSidebar from "./CartSidebar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
    </CartProvider>
  );
}
