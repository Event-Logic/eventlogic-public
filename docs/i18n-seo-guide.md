# Internationalization (i18n) and SEO Guide

This guide explains how internationalization and SEO are implemented in this Next.js project using next-intl.

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Routing Configuration](#routing-configuration)
3. [Metadata Implementation](#metadata-implementation)
4. [Creating New Pages](#creating-new-pages)
5. [Handling Language-Specific URLs](#handling-language-specific-urls)
6. [Translation Files](#translation-files)
7. [Best Practices](#best-practices)

## Directory Structure

The project follows the Next.js App Router structure with internationalization:

```
src/
  ├── app/
  │   └── [locale]/
  │       ├── page.tsx
  │       ├── layout.tsx
  │       ├── rum/
  │       │   └── page.tsx
  │       ├── rooms/
  │       │   └── page.tsx (re-exports from rum)
  │       └── ...other pages
  ├── i18n.ts
  ├── middleware.ts
  └── messages/
      ├── en.json
      └── sv.json
```

## Routing Configuration

The routing configuration is defined in `i18n.ts`:

```typescript
// i18n.ts
export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/rum': {
      en: '/rum',
      sv: '/rum',
    },
    '/rooms': {
      en: '/rooms',
      sv: '/rum',
    },
    // Other routes...
  }
});
```

This configuration maps URLs to the appropriate pages based on the locale.

## Metadata Implementation

For SEO optimization, each page should implement proper metadata:

```typescript
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
    // Additional metadata...
  };
}
```

## Creating New Pages

When creating a new page that needs to be available in multiple languages:

1. Create the primary page in `src/app/[locale]/page-name/page.tsx`
2. If you need language-specific URLs, create a re-export page:

```typescript
// src/app/[locale]/english-page-name/page.tsx
export { default, generateMetadata } from '../swedish-page-name/page';
```

3. Update the routing configuration in `i18n.ts`:

```typescript
pathnames: {
  // ...
  '/swedish-page-name': {
    en: '/english-page-name',
    sv: '/swedish-page-name',
  },
  '/english-page-name': {
    en: '/english-page-name',
    sv: '/swedish-page-name',
  },
}
```

## Handling Language-Specific URLs

For components that need to generate URLs:

```typescript
// In a component
<Link href={`/${locale}/${locale === 'en' ? 'english-path' : 'swedish-path'}`}>
  {t('linkText')}
</Link>
```

## Translation Files

Translation files are stored in the `messages` directory:

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

## Best Practices

1. **Always use the `locale` parameter** from the page props for generating URLs and fetching translations.

2. **Set proper canonical URLs** to avoid duplicate content issues for search engines.

3. **Use re-exports** for pages that need different URLs in different languages but share the same content.

4. **Organize translation files** by page or feature to keep them manageable.

5. **Use namespaces** in translation files to organize content logically.

6. **Test all language versions** of your pages to ensure they work correctly.

7. **Keep URLs meaningful** in each language for better SEO and user experience.

8. **Use the `getTranslations` function** to fetch translations for specific namespaces:

```typescript
const t = await getTranslations({ locale, namespace: 'pageName' });
```

9. **Include proper metadata** for each page, including title, description, and canonical URLs.

10. **Use the Navigation component** consistently for generating links to ensure they follow the correct i18n pattern.
