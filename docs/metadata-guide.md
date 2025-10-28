# SEO Metadata Implementation Guide

This guide provides examples and best practices for implementing SEO-friendly metadata in our Next.js application with internationalization.

## Basic Metadata Implementation

Every page should implement the `generateMetadata` function to provide proper SEO metadata:

```typescript
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import type { Locale } from "@/dictionaries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageName' });

  return {
    title: `${t('title')} | Event Logic`,
    description: t('subtitle'),
  };
}
```

## Advanced Metadata with Canonical URLs

For pages with language-specific URLs, include canonical URLs and alternates:

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
  };
}
```

## OpenGraph Metadata

Include OpenGraph metadata for better social media sharing:

```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageName' });
  
  return {
    title: `${t('title')} | Mollösunds Wärdshus`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | Mollösunds Wärdshus`,
      description: t('subtitle'),
      url: `https://wards.se/${locale}/${locale === 'en' ? 'english-path' : 'swedish-path'}`,
      siteName: "Mollösunds Wärdshus",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Mollösunds Wärdshus",
        },
      ],
      locale: locale === "en" ? "en_US" : "sv_SE",
      type: "website",
    },
  };
}
```

## Dynamic Metadata Based on Content

For pages with dynamic content (like product pages), generate metadata based on the content:

```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  
  // Fetch product data
  const product = await getProductById(id);
  
  if (!product) {
    return {
      title: "Product Not Found | Mollösunds Wärdshus",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.name} | Mollösunds Wärdshus`,
    description: product.description,
    alternates: {
      canonical: `/${locale}/products/${id}`,
      languages: {
        en: `/en/products/${id}`,
        sv: `/sv/produkter/${id}`,
      },
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ] : undefined,
    },
  };
}
```

## Best Practices for Metadata

1. **Always include title and description** for every page.
2. **Keep titles under 60 characters** for optimal display in search results.
3. **Keep descriptions between 120-160 characters** for optimal display in search results.
4. **Use canonical URLs** to avoid duplicate content issues.
5. **Include OpenGraph metadata** for better social media sharing.
6. **Use dynamic metadata** based on the page content when appropriate.
7. **Include language alternates** for multilingual sites.
8. **Use structured data** (JSON-LD) for rich search results when applicable.

## Example: JSON-LD Structured Data

For rich search results, include structured data:

```typescript
export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageName' });
  
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Mollösunds Wärdshus",
    description: t('description'),
    url: `https://wards.se/${locale}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kyrkvägen 9",
      addressLocality: "Mollösund",
      postalCode: "474 70",
      addressCountry: "SE"
    },
    telephone: "+46304-21108",
    priceRange: "$$",
    image: "https://wards.se/images/hotel-exterior.jpg",
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
