"use client";

import { CartProvider } from "@/features/event-builder/context/CartContext";
import { Locale } from "@/dictionaries";

interface CartProviderWrapperProps {
  children: React.ReactNode;
  locale: Locale;
}

export default function CartProviderWrapper({ children, locale }: CartProviderWrapperProps) {
  return (
    <CartProvider locale={locale}>
      {children}
    </CartProvider>
  );
}
