// src/app/[locale]/booking/page.tsx

import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import SirvoyBookingWidget from "../../../components/SirvoyBookingWidget";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.booking.title} | Mollösunds Wärdshus`,
    description: dict.booking.subtitle,
  };
}

export default async function BookingPage({
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
              {dict.booking.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {dict.booking.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 pt-8">
        {/* Sirvoy Booking Widget with minimal styling */}
        <SirvoyBookingWidget />
      </div>
    </div>
  );
}
