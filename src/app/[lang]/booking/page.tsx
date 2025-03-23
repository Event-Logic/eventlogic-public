import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.booking.title} | Mollösunds Wärdshus`,
    description: dict.booking.subtitle,
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero-background.jpg')",
            backgroundPosition: "center 40%"
          }}
        ></div>
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            {dict.booking.title}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl text-center">
            {dict.booking.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            {dict.booking.intro}
          </p>
        </div>

        {/* Room Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {dict.booking.roomTypes.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://wards.se/wp-content/uploads/2022/05/e2a66eef-5d5c-4ff5-8de1-ab45c200ef1d_large-480x1038.jpg.webp')" }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{dict.booking.roomTypes.standard.title}</h3>
                <p className="text-gray-600">{dict.booking.roomTypes.standard.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">160 cm säng</span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">18 kvm</span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Privat badrum</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://wards.se/wp-content/uploads/2022/05/rum-3-640x853.jpg.webp')" }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{dict.booking.roomTypes.deluxe.title}</h3>
                <p className="text-gray-600">{dict.booking.roomTypes.deluxe.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">180 cm säng</span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">18 kvm</span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Havsutsikt</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://wards.se/wp-content/uploads/2022/05/image00800-640x480.jpeg.webp')" }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{dict.booking.roomTypes.suite.title}</h3>
                <p className="text-gray-600">{dict.booking.roomTypes.suite.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Familjerum</span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">20 kvm</span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Våningsäng</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-16">
          <div className="w-full">
            {/* Sirvoy Booking Form */}
            <div id="sirvoy-container" className="min-h-[400px]"></div>
          </div>

          {/* Sirvoy Booking Script */}
          <Script
            id="sirvoy-script"
            src="https://secured.sirvoy.com/widget/sirvoy.js"
            data-form-id="978d2966ede6c094"
            strategy="afterInteractive"
          />
        </div>

        {/* Policies and FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Policies */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">{dict.booking.policies.title}</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{dict.booking.policies.checkIn}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{dict.booking.policies.checkOut}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{dict.booking.policies.cancellation}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{dict.booking.policies.pets}</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{dict.booking.policies.payment}</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">{dict.booking.faq.title}</h2>
            <div className="space-y-6">
              {dict.booking.faq.questions.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Amenities */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Hotellets faciliteter</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <h3 className="font-semibold">WiFi inkluderat</h3>
            </div>
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <h3 className="font-semibold">Frukost ingår alltid</h3>
            </div>
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-semibold">Restaurang</h3>
            </div>
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold">Mötesanläggning</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
