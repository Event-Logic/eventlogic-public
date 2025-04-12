"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Locale } from "../dictionaries";

// Mapping between localized routes and actual page paths
// This maps SEO-friendly URLs to the actual page files
const routeMapping = {
  en: {
    // English SEO routes to actual page paths
    'rooms': 'rum',
    'restaurant': 'restaurang',
    'contact': 'kontakt',
    'conference': 'konferens',
    'weddings': 'brollop',
    'celebrations': 'fester'
  },
  sv: {
    // Swedish routes (these match the actual page paths)
    'rum': 'rum',
    'restaurang': 'restaurang',
    'kontakt': 'kontakt',
    'konferens': 'konferens',
    'brollop': 'brollop',
    'fester': 'fester'
  }
};

export default function LanguageSwitcher({
  currentLang
}: {
  currentLang: Locale
}) {
  const pathname = usePathname();
  const alternateLanguage: Locale = currentLang === "en" ? "sv" : "en";

  // Function to translate the path for the alternate language
  const getTranslatedPath = () => {
    // If we're on the home page, just return the alternate language
    if (pathname === `/${currentLang}`) {
      return `/${alternateLanguage}`;
    }

    // Split the path into segments
    const segments = pathname.split('/').filter(Boolean);

    // If there are less than 2 segments, just return the alternate language
    if (segments.length < 2) {
      return `/${alternateLanguage}`;
    }

    // The first segment is the current language, the second is the path
    const pathSegment = segments[1];

    // For English to Swedish translation
    if (currentLang === 'en' && alternateLanguage === 'sv') {
      // If we're on an English SEO path, we need to find the actual page path first
      const actualPagePath = pathSegment in routeMapping.en
        ? routeMapping.en[pathSegment as keyof typeof routeMapping.en]
        : pathSegment;

      // For Swedish, the URL is the same as the page path
      return `/${alternateLanguage}/${actualPagePath}${segments.length > 2 ? '/' + segments.slice(2).join('/') : ''}`;
    }

    // For Swedish to English translation
    if (currentLang === 'sv' && alternateLanguage === 'en') {
      // Find if there's an English SEO path for this Swedish page path
      // Using underscore to indicate unused parameter
      const englishSeoPath = Object.entries(routeMapping.en).find(([, value]) => value === pathSegment)?.[0] || pathSegment;

      return `/${alternateLanguage}/${englishSeoPath}${segments.length > 2 ? '/' + segments.slice(2).join('/') : ''}`;
    }

    // Fallback
    return `/${alternateLanguage}/${pathSegment}${segments.length > 2 ? '/' + segments.slice(2).join('/') : ''}`;
  };

  return (
    <Link
      href={getTranslatedPath()}
      className="text-white hover:text-gray-300 transition-colors"
    >
      {alternateLanguage.toUpperCase()}
    </Link>
  );
}
