# Adding New Pages with Internationalization

This guide explains how to add new pages to the website with proper internationalization and SEO support.

## Step 1: Create the Base Page

First, create the base page in the appropriate directory:

```typescript
// src/app/[locale]/page-name/page.tsx
import { getTranslations } from 'next-intl/server';
import type { Locale } from "@/dictionaries";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageName' });

  // Define the canonical URL based on the locale
  const canonicalPath = locale === 'en' ? '/english-path' : '/swedish-path';
  
  return {
    title: `${t('title')} | Mollösunds Wärdshus`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}${canonicalPath}`,
      languages: {
        en: '/en/english-path',
        sv: '/sv/swedish-path',
      },
    },
  };
}

export default async function PageName({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageName' });

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="text-lg mb-8">{t('subtitle')}</p>
      
      {/* Page content */}
    </div>
  );
}
```

## Step 2: Add Translations

Add translations for the page in both language files:

```json
// messages/en.json
{
  "pageName": {
    "title": "Page Title in English",
    "subtitle": "Page subtitle in English",
    "content": "Content in English"
  }
}

// messages/sv.json
{
  "pageName": {
    "title": "Page Title in Swedish",
    "subtitle": "Page subtitle in Swedish",
    "content": "Content in Swedish"
  }
}
```

## Step 3: Update Routing Configuration

Update the routing configuration in `i18n.ts` to include the new page:

```typescript
// i18n.ts
export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    // Existing routes...
    
    // Add the new route
    '/swedish-path': {
      en: '/english-path',
      sv: '/swedish-path',
    },
  }
});
```

## Step 4: Create Language-Specific URL Pages (if needed)

If you need different URLs for different languages, create a re-export page:

```typescript
// src/app/[locale]/english-path/page.tsx
export { default, generateMetadata } from '../swedish-path/page';
```

And update the routing configuration to include both paths:

```typescript
pathnames: {
  // Existing routes...
  
  '/swedish-path': {
    en: '/english-path',
    sv: '/swedish-path',
  },
  '/english-path': {
    en: '/english-path',
    sv: '/swedish-path',
  },
}
```

## Step 5: Add Navigation Links

Update the navigation to include links to the new page:

```typescript
// In a navigation component
<Link
  href={`/${locale}/${locale === 'en' ? 'english-path' : 'swedish-path'}`}
  className="text-white hover:text-gray-300 transition-colors"
>
  {t('navigation.pageName')}
</Link>
```

Don't forget to add the navigation label to the translation files:

```json
// messages/en.json
{
  "navigation": {
    // Existing navigation items...
    "pageName": "Page Name"
  }
}

// messages/sv.json
{
  "navigation": {
    // Existing navigation items...
    "pageName": "Sidnamn"
  }
}
```

## Step 6: Test All Language Versions

Make sure to test both language versions of your page:

- `/en/english-path`
- `/sv/swedish-path`

Verify that:
- The content is displayed correctly in both languages
- The navigation works correctly
- The metadata is properly set
- The canonical URLs are correct

## Example: Adding a "Services" Page

Here's a complete example of adding a "Services" page:

1. Create the base page:

```typescript
// src/app/[locale]/tjanster/page.tsx
import { getTranslations } from 'next-intl/server';
import type { Locale } from "@/dictionaries";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  const canonicalPath = locale === 'en' ? '/services' : '/tjanster';
  
  return {
    title: `${t('title')} | Mollösunds Wärdshus`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}${canonicalPath}`,
      languages: {
        en: '/en/services',
        sv: '/sv/tjanster',
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="text-lg mb-8">{t('subtitle')}</p>
      
      {/* Services content */}
      <div className="grid md:grid-cols-2 gap-8">
        {['service1', 'service2', 'service3', 'service4'].map((service) => (
          <div key={service} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">{t(`${service}.title`)}</h2>
            <p>{t(`${service}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

2. Create the English URL version:

```typescript
// src/app/[locale]/services/page.tsx
export { default, generateMetadata } from '../tjanster/page';
```

3. Add translations:

```json
// messages/en.json
{
  "services": {
    "title": "Our Services",
    "subtitle": "Discover the range of services we offer at Mollösunds Wärdshus",
    "service1": {
      "title": "Accommodation",
      "description": "Comfortable rooms with sea views and modern amenities."
    },
    "service2": {
      "title": "Dining",
      "description": "Exquisite local cuisine prepared with fresh ingredients."
    },
    "service3": {
      "title": "Events",
      "description": "Perfect venues for weddings, conferences, and celebrations."
    },
    "service4": {
      "title": "Activities",
      "description": "Explore the beautiful surroundings with our guided tours."
    }
  },
  "navigation": {
    "services": "Services"
  }
}

// messages/sv.json
{
  "services": {
    "title": "Våra Tjänster",
    "subtitle": "Upptäck de tjänster vi erbjuder på Mollösunds Wärdshus",
    "service1": {
      "title": "Boende",
      "description": "Bekväma rum med havsutsikt och moderna bekvämligheter."
    },
    "service2": {
      "title": "Matservering",
      "description": "Utsökt lokal mat tillagad med färska ingredienser."
    },
    "service3": {
      "title": "Evenemang",
      "description": "Perfekta platser för bröllop, konferenser och fester."
    },
    "service4": {
      "title": "Aktiviteter",
      "description": "Utforska de vackra omgivningarna med våra guidade turer."
    }
  },
  "navigation": {
    "services": "Tjänster"
  }
}
```

4. Update the routing configuration:

```typescript
// i18n.ts
export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    // Existing routes...
    
    '/tjanster': {
      en: '/services',
      sv: '/tjanster',
    },
    '/services': {
      en: '/services',
      sv: '/tjanster',
    },
  }
});
```

5. Add navigation links:

```typescript
<Link
  href={`/${lang}/${lang === 'en' ? 'services' : 'tjanster'}`}
  className="text-white hover:text-gray-300 transition-colors"
>
  {navigation.services}
</Link>
```
