import { getDictionary } from "../../dictionaries";
import type { Locale } from "../../dictionaries";
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
      {/* Hero Section - Adjusted positioning */}
      <section className="relative h-screen flex items-start justify-center text-white">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-blue-900">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute object-cover w-full h-full"
            poster="/images/hero-background.jpg"
          >
            {/* High-quality version for desktop */}
            <source 
              src="/videos/aerial-compressed.mp4" 
              type="video/mp4" 
              media="(min-width: 768px)"
            />
            {/* WebM version for browsers that support it */}
            <source 
              src="/videos/aerial.webm" 
              type="video/webm" 
              media="(min-width: 768px)"
            />
            {/* Mobile-optimized version */}
            <source 
              src="/videos/aerial-mobile.mp4" 
              type="video/mp4"
            />
            {/* Fallback text if video cannot be played */}
            Your browser does not support the video tag.
          </video>
          {/* Overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-40 md:pt-48">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {dict.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl">
            {dict.home.hero.subtitle}
          </p>
        </div>
        
        {/* Book Your Stay Button - Positioned below text but not at very bottom */}
        <div className="absolute top-2/3 left-0 right-0 z-10 text-center">
          <Link
            href={`/${lang}/booking`}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            {lang === 'en' ? 'Book Your Stay' : 'Boka din vistelse'}
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.about.title}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.about.ingress}
          </p>
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

      {/* History Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.history?.title || "A Rich Maritime Heritage"}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.history?.ingress || "When herring was gold and the harbor was life itself"}
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-blue-500"></div>
            </div>
            <p className="text-lg leading-relaxed">
              {dict.home.history?.description || 
                "For generations, Mollösund was synonymous with herring, its rise and fall dictating the fortunes of the village. Imagine the harbor in the late 19th century, teeming with life - a raucous symphony of fishermen hauling their catches, their voices booming with tales of the day's adventures."}
            </p>
          </div>
        </div>
      </section>

      {/* New Generation Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.newGeneration?.title || "A New Chapter: Ellen and Wilma"}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.newGeneration?.ingress || "The hospitality rock stars with sensible shoes and wild ideas"}
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-blue-500"></div>
            </div>
            <p className="text-lg leading-relaxed">
              {dict.home.newGeneration?.description || 
                "As the tide turns once more, a new generation is ready to chart the course for Mollösunds Wärdshus. Enter Ellen and Wilma, bringing fresh energy while honoring the inn's rich history."}
            </p>
          </div>
        </div>
      </section>

      {/* Modern Era Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.modernEra?.title || "The Windzer Brothers Era"}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.modernEra?.ingress || "When two adventurers turned an old inn into their greatest expedition"}
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-blue-500"></div>
            </div>
            <p className="text-lg leading-relaxed">
              {dict.home.modernEra?.description || 
                "In the early 2010s, Mollösunds Wärdshus embarked on a new chapter with its acquisition by Ocean Group. At the helm of this era were the brothers Johan and Eric Windzer, two adventurers who approached the historic inn as if it were their most exciting expedition yet."}
            </p>
          </div>
        </div>
      </section>

      {/* Present Day Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.presentDay?.title || "Today at Wärds"}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.presentDay?.ingress || "Where avocado toast meets herring, and chaos meets charm"}
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-blue-500"></div>
            </div>
            <p className="text-lg leading-relaxed">
              {dict.home.presentDay?.description || 
                "Even today, as Wärds continues its legacy, you can still sense that vibrant, slightly unpredictable spirit that makes this place special."}
            </p>
          </div>
        </div>
      </section>

      {/* DIY Events Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.diyEvents?.title || "Your Event, Your Way"}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.diyEvents?.ingress || "Ditch the beige, embrace the brine!"}
          </p>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-center mb-8">
              <div className="h-px w-24 bg-blue-500"></div>
            </div>
            <p className="text-lg leading-relaxed text-center">
              {dict.home.diyEvents?.description || 
                "Tired of cookie-cutter events in windowless conference rooms? At Mollösunds Wärdshus, we believe in the power of DIY. You bring the vision, we provide the historic seaside venue and just the right amount of support to make it happen."}
            </p>
          </div>
          
          {/* Event Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(dict.home.diyEvents?.eventTypes || [
              {
                title: "Conferences",
                description: "Unleash creativity in a space where the sea breeze replaces stale air conditioning"
              },
              {
                title: "Weddings",
                description: "Say 'I do' your way with the beautiful Bohuslän archipelago as your witness"
              },
              {
                title: "Celebrations",
                description: "Host a party they'll talk about for years in our characterful historic venue"
              },
              {
                title: "Retreats & Wellness",
                description: "Escape the ordinary and craft your extraordinary wellness experience by the sea"
              }
            ]).map((eventType: { title: string; description: string }, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{eventType.title}</h3>
                <p className="text-gray-700 mb-4">{eventType.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href={`/${lang}/${lang === 'en' ? 'conference' : 'konferens'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {dict.home.diyEvents?.cta || (lang === 'en' ? 'Create Your Coastal Event' : 'Skapa ditt kustevent')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {dict.home.features.title}
          </h2>
          <p className="text-xl md:text-2xl text-center italic text-blue-700 mb-12 max-w-3xl mx-auto">
            {dict.home.features.ingress}
          </p>
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
