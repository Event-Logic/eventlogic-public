import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/dictionaries";
import Navigation from "@/components/Navigation";

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
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: ["hotel", "Mollösund", "Sweden", "luxury", "accommodation", "booking"],
    authors: [{ name: "Mollösunds Wärdshus" }],
    creator: "Mollösunds Wärdshus",
    publisher: "Mollösunds Wärdshus",
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    metadataBase: new URL("https://wardss.se"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        sv: "/sv",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `https://wards.se/${lang}`,
      siteName: "Mollösunds Wärdshus",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Mollösunds Wärdshus",
        },
      ],
      locale: lang === "en" ? "en_US" : "sv_SE",
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
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation lang={lang} dictionary={dict} />
        {children}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'sv' },
  ];
}
