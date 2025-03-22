import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // JSON-LD structured data for the hotel
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Mollösunds Wärdshus",
    description: dict.metadata.description,
    url: `https://wards.se/${lang}`,
    telephone: "+46 (0)304 211 08)",
    email: "info@wards.se",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kyrkvägen 9",
      addressLocality: "Mollösund",
      postalCode: "474 70",
      addressCountry: "SE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "58.0756",
      longitude: "11.4775"
    },
    priceRange: "$$$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "4.5"
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Ocean View",
        value: true
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Restaurant",
        value: true
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free WiFi",
        value: true
      }
    ],
    image: "https://wards.se/images/hotel-exterior.jpg"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white bg-gradient-to-b from-blue-900 to-blue-700">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {dict.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {dict.home.hero.subtitle}
          </p>
          <Link
            href={`/${lang}/booking`}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            {dict.home.hero.cta}
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.home.about.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed">
                {dict.home.about.description}
              </p>
            </div>
            <div className="relative h-80 md:h-96 bg-gradient-to-b from-blue-800 to-blue-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-xl font-semibold">Mollösunds Wärdshus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.home.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {dict.home.features.oceanView.title}
              </h3>
              <p>{dict.home.features.oceanView.description}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {dict.home.features.dining.title}
              </h3>
              <p>{dict.home.features.dining.description}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {dict.home.features.activities.title}
              </h3>
              <p>{dict.home.features.activities.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Mollösunds Wärdshus</h3>
            <p className="mb-2">{dict.footer.address}</p>
            <p className="mb-2">{dict.footer.phone}</p>
            <p>{dict.footer.email}</p>
          </div>
          <div className="md:text-right">
            <div className="flex md:justify-end space-x-6 mb-8">
              <a href="#" className="hover:text-gray-300">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-300">
                Instagram
              </a>
              <a href="#" className="hover:text-gray-300">
                Twitter
              </a>
            </div>
            <p>{dict.footer.copyright}</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
