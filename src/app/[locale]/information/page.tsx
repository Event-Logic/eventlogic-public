import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Hotel Information | Mollösunds Wärdshus`,
    description: "Information about our hotel, policies, and frequently asked questions.",
  };
}

export default async function InformationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {locale === 'en' ? 'Hotel Information' : 'Hotellinformation'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {locale === 'en' ? 'Everything you need to know about your stay' : 'Allt du behöver veta om din vistelse'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            {dict.booking.intro}
          </p>
        </div>

        {/* Hotel Description */}
        <div className="mb-16 text-center">
          <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
            {locale === 'en'
              ? 'Reserve your perfect stay at Mollösunds Wärdshus. Our booking system allows you to check availability, compare room types and secure your stay with immediate confirmation.'
              : 'Reservera din perfekta vistelse på Mollösunds Wärdshus. Vårt bokningssystem låter dig kontrollera tillgänglighet, jämföra rumstyper och säkra din vistelse med omedelbar bekräftelse.'}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/booking`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {locale === 'en' ? 'Book Now' : 'Boka nu'}
            </Link>
          </div>
        </div>

        {/* Policies and FAQ - Improved layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Policies */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{dict.booking.policies.title}</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{dict.booking.policies.checkIn}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{dict.booking.policies.checkOut}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{dict.booking.policies.cancellation}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-gray-700">{dict.booking.policies.pets}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-gray-700">{dict.booking.policies.payment}</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{dict.booking.faq.title}</h2>
            <div className="space-y-6">
              {dict.booking.faq.questions.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frukost Information - Improved styling */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Frukost Information</h2>
          <p className="text-gray-700 mb-4">
            Observera att under lågsäsong serveras frukost som frukostpaket istället för på buffé.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-800 font-medium mb-2">Dessa datum serveras frukostpaket:</p>
            <ul className="list-disc pl-6 mb-2 text-gray-700 space-y-1">
              <li>30 september – 28 mars</li>
              <li>Samt under vardagar 29 mars – 21 juni & 1 september – 29 september</li>
            </ul>
          </div>
          <p className="text-gray-700 italic">
            Är ni ett större gäng så går det att öppna hela hotellet för både frukost samt middag.
          </p>
        </div>

        {/* Contact Information - Improved styling */}
        <div className="mt-12 text-center bg-blue-900 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Kontakta oss</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:hotell@wards.se" className="text-white hover:underline">hotell@wards.se</a>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:030421108" className="text-white hover:underline">0304-211 08</a>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Kyrkvägen 9, 474 70 Mollösund</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
