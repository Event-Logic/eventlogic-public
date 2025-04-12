import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "../../i18n";

// Define a basic product interface (adjust based on your actual data model)
export interface Product {
  id: string;
  name: string;
  code: string;
  category: {
    id: string;
    name: string;
  };
  manufacturer?: string;
  description: string;
  images: {
    small: string;
    large: string;
  };
  price: number;
  stock: number;
}

export async function generateProductMetadata(
  productDataPromise: Promise<Product>,
  locale: string
): Promise<Metadata> {
  const [productData, t] = await Promise.all([
    productDataPromise,
    getTranslations({ locale, namespace: "metadataProduct" }),
  ]);

  // SEO optimization: Information structuring
  const descriptionParts = [
    productData.name,
    `${productData.category.name} #${productData.code}`,
    productData.manufacturer ? `${t("manufacturedBy")}${productData.manufacturer}` : "",
    t("checkPrice")
  ].filter(Boolean);

  const description = descriptionParts.join(" | ");

  // Dynamic keyword generation
  const productSpecificKeywords = [
    productData.name,
    productData.category.name,
    productData.manufacturer,
    `${productData.name} ${t("price")}`,
    `${productData.name} ${t("stock")}`,
    `${productData.category.name} ${t("products")}`
  ].filter(Boolean);

  const baseKeywords = t("keywords").split(", ");
  const allKeywords = [...new Set([...productSpecificKeywords, ...baseKeywords])];

  return {
    title: `${productData.name} | ${productData.category.name} | ${t("siteTitle")}`,
    description,
    keywords: allKeywords.join(", "),
    metadataBase: new URL("https://example.com"),

    alternates: {
      canonical: `/${locale}/product/${productData.id}`,
      languages: {
        "x-default": `/en/product/${productData.id}`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `/${l}/product/${productData.id}`])
        ),
      },
    },

    openGraph: {
      type: "website",
      siteName: t("siteTitle"),
      title: `${productData.name} | ${productData.category.name}`,
      description,
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      images: productData.images.large ? [
        {
          url: productData.images.large,
          width: 1200,
          height: 630,
          alt: productData.name,
        },
      ] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
