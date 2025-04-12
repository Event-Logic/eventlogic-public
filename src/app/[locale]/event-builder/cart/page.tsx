import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "@/features/event-builder/data/translations";
import { Metadata } from "next";
import Link from "next/link";
import { CartDisplayWrapper } from "@/features/event-builder/components/CartDisplayWrapper";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  // Dictionary will be used for future translations
  // const dict = await getDictionary(locale);

  return {
    title: locale === 'en'
      ? 'Saved Configurations | Mollösunds Wärdshus'
      : 'Sparade konfigurationer | Mollösunds Wärdshus',
    description: locale === 'en'
      ? 'View and manage your saved event configurations at Mollösunds Wärdshus.'
      : 'Visa och hantera dina sparade evenemangskonfigurationer på Mollösunds Wärdshus.',
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Dictionary will be used for future translations
  // const dict = await getDictionary(locale);
  const eventDict = await getEventBuilderDictionary(locale);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">
          {eventDict.cart.title}
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          {locale === 'en'
            ? 'Here you can view and manage your saved event configurations. You can also share them with others or submit them as a request for a quote.'
            : 'Här kan du visa och hantera dina sparade evenemangskonfigurationer. Du kan också dela dem med andra eller skicka in dem som en förfrågan om offert.'}
        </p>

        <CartDisplayWrapper locale={locale} />

        <div className="flex justify-between">
          <Link
            href={`/${locale}/event-builder/conference`}
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition duration-300"
          >
            {eventDict.common.back}
          </Link>

          <Link
            href={`/${locale}/kontakt`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            {locale === 'en' ? 'Request Quote' : 'Begär offert'}
          </Link>
        </div>
      </div>
    </div>
  );
}
