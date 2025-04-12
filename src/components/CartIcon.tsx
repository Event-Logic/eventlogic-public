"use client";

import Link from "next/link";
import { Locale } from "@/dictionaries";
// import { useCart } from "@/features/event-builder/context/CartContext";
import { useEffect, useState } from "react";

interface CartIconProps {
  lang: Locale; // Keep as lang for backward compatibility
}

// This component safely handles the case when the CartProvider is not available
export function CartIcon({ lang }: CartIconProps) {
  const locale = lang; // Use locale internally for consistency
  const [itemCount, setItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Load cart data from localStorage
    const loadCartData = () => {
      try {
        const storedCart = localStorage.getItem('event-builder-cart');
        if (storedCart) {
          const cartData = JSON.parse(storedCart);
          setItemCount(Array.isArray(cartData) ? cartData.length : 0);
        }
      } catch (error) {
        console.error('Failed to load cart data:', error);
      }
    };

    // Load initial data
    loadCartData();

    // Set up storage event listener to update count when cart changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'event-builder-cart') {
        loadCartData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Only render the count indicator on the client side
  return (
    <Link
      href={`/${locale}/event-builder/cart`}
      className="text-white hover:text-gray-300 transition-colors relative"
      title={locale === 'en' ? 'View Cart' : 'Visa kundvagn'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>

      {isClient && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
