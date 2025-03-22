import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
export const locales = ['en', 'sv'];
export const defaultLocale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest) {
  // Check for the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Simple language detection - can be enhanced with a library like Negotiator
  if (acceptLanguage.startsWith('sv')) return 'sv';
  
  // Default to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|.*\\..*).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
