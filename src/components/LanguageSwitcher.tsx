"use client";

import { usePathname } from "next/navigation";
import { Locale } from "../dictionaries";
import Link from "next/link";

export default function LanguageSwitcher({
  currentLang
}: {
  currentLang: Locale
}) {
  const pathname = usePathname();
  const alternateLanguage: Locale = currentLang === "en" ? "sv" : "en";

  // Map of Swedish to English page names
  const pageMap: Record<string, string> = {
    'kopare': 'buyers',
    'leverantorer': 'suppliers',
    'motesplanerare': 'meeting-planners',
    'resebyraer': 'travel-agencies',
    'priser': 'pricing',
    'kontakt': 'contact',
    'om-oss': 'about',
    'karriar': 'career',
    'dataskydd': 'data-protection',
    'logga-in': 'login',
    'registrera': 'register',
    'expressbokning': 'express-booking',
    'hitta-leverantorer': 'find-suppliers',
    'jamfor-offerter': 'compare-offers',
    'forhandla-boka': 'negotiate-book',
    'schema': 'schedule',
    'samlingsfaktura': 'collective-invoice',
    'rapporter': 'reports',
    'deltagarhantering': 'participant-management',
    'namnskyltar': 'name-badges',
    'eventmallar': 'event-templates',
    'strategisk-moteshantering': 'strategic-meeting-management',
    'strategiska-moten': 'strategic-meeting',
    'kommunikation': 'communication',
  };

  // Get the alternate URL
  const getAlternateUrl = () => {
    // Remove the current locale prefix
    const pathWithoutLocale = pathname.replace(`/${currentLang}`, '').replace(/^\//, '');
    
    if (!pathWithoutLocale) {
      // Homepage
      return `/${alternateLanguage}`;
    }

    if (alternateLanguage === 'en') {
      // Switching from Swedish to English - need to translate Swedish page names
      const segments = pathWithoutLocale.split('/');
      const translatedSegments = segments.map(segment => pageMap[segment] || segment);
      return `/${alternateLanguage}/${translatedSegments.join('/')}`;
    } else {
      // Switching from English to Swedish - need to translate English page names
      const reverseMap = Object.fromEntries(
        Object.entries(pageMap).map(([k, v]) => [v, k])
      );
      const segments = pathWithoutLocale.split('/');
      const translatedSegments = segments.map(segment => reverseMap[segment] || segment);
      return `/${alternateLanguage}/${translatedSegments.join('/')}`;
    }
  };

  return (
    <Link
      href={getAlternateUrl()}
      className="text-white hover:text-gray-300 transition-colors"
      aria-label={`Switch to ${alternateLanguage === 'en' ? 'English' : 'Swedish'}`}
    >
      {alternateLanguage.toUpperCase()}
    </Link>
  );
}