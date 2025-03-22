import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/dictionaries";
import { Metadata } from "next";
import Script from "next/script";

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
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dict.booking.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dict.booking.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Sirvoy Booking Widget */}
          <div className="w-full">
            <div className="text-center mb-8">
              <p className="text-gray-500">{dict.booking.poweredBy}</p>
            </div>
            
            {/* Sirvoy Booking Form */}
            <div id="sirvoy-container"></div>
          </div>

          {/* Sirvoy Booking Script */}
          <Script
            id="sirvoy-script"
            src="https://secured.sirvoy.com/widget/sirvoy.js"
            data-form-id="978d2966ede6c094"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </div>
  );
}
