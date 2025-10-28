import { getTranslations } from "next-intl/server";
import type { Locale } from "../../dictionaries";
import { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import ForTypesSection from "../../components/ForTypesSection";
import EventTypesSection from "../../components/EventTypesSection";
import EventLogicSteps from "../../components/EventLogicSteps";
import Testimonials from "../../components/Testimonials";
import HelpSection from "../../components/HelpSection";
import EventCoach from "../../components/EventCoach";
import ClientLogos from "../../components/ClientLogos";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        sv: '/sv',
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const dict = await getDictionary(locale);

  // JSON-LD structured data for the software company
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Event Logic",
    description: t('metadata.description'),
    url: `https://eventlogic.se/${locale}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SEK",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "250"
    },
    publisher: {
      "@type": "Organization",
      name: "Event Logic",
      url: "https://eventlogic.se",
      email: "info@eventlogic.se",
      telephone: "+46 (0)31 83 20 20",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Södra Vägen 20",
        addressLocality: "Göteborg",
        postalCode: "412 54",
        addressCountry: "SE"
      }
    },
    screenshot: "https://eventlogic.se/images/platform-screenshot.jpg",
    featureList: [
      "Event Management",
      "Participant Handling",
      "Quote Comparison",
      "Supplier Management",
      "Reporting & Statistics"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        {/* Hero Section with Three.js Animation */}
        <HeroSection
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          ctaText={t('hero.cta')}
          ctaLink="/demo"
          lang={locale}
          features={{
            planning: t('hero.features.planning'),
            network: t('hero.features.network'),
            analytics: t('hero.features.analytics'),
            integration: t('hero.features.integration')
          }}
        />

        {/* About Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-purple-950 text-white dark:from-black dark:to-purple-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl md:text-2xl text-center italic text-purple-300 mb-12 max-w-3xl mx-auto">
              {t('about.ingress')}
            </p>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-center text-gray-200">
                {t('about.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Client Logos */}
        <ClientLogos
          title={t('clientLogos.title')}
          subtitle={t('clientLogos.subtitle')}
          lang={locale}
        />

        {/* For Types Section */}
        <ForTypesSection lang={locale} dictionary={dict} />

        {/* Event Types Section */}
        <EventTypesSection lang={locale} dictionary={dict} />

        {/* Event Logic Steps */}
        <EventLogicSteps lang={locale} dictionary={dict} />

        {/* Testimonials */}
        <Testimonials lang={locale} dictionary={dict} />

        {/* Help Section */}
        <HelpSection lang={locale} dictionary={dict} />

        {/* Event Coach */}
        <EventCoach lang={locale} dictionary={dict} />

        {/* Footer */}
        <Footer lang={locale} dictionary={dict} />
      </div>
    </>
  );
}
