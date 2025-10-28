import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "../../dictionaries";
import { Locale } from "../../dictionaries";
import NavigationClient from "../../components/NavigationClient";
import { Toaster } from "@/components/ui/toaster";
import CartProviderWrapper from "@/components/CartProviderWrapper";
import DarkModeProviderWrapper from "@/components/DarkModeProviderWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: [], // Add default keywords here
    authors: [{ name: "Your Company" }],
    creator: "Your Company",
    publisher: "Your Company",
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    metadataBase: new URL("https://example.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        sv: "/sv",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `https://example.com/${locale}`,
      siteName: "Your Site Name",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Site Preview",
        },
      ],
      locale: locale === "en" ? "en_US" : "sv_SE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ["/images/twitter-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <DarkModeProviderWrapper>
            <NavigationClient lang={locale} />
            <CartProviderWrapper locale={locale}>
              {children}
            </CartProviderWrapper>
            <Toaster />
          </DarkModeProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'sv' },
  ];
}
