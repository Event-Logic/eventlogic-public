import { getTranslations } from "next-intl/server";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import { getDictionary } from "../../../dictionaries";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'suppliers' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/suppliers`,
      languages: {
        en: '/en/suppliers',
        sv: '/sv/suppliers',
      },
    },
  };
}

export default async function SuppliersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'suppliers' });
  const dict = await getDictionary(locale);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t('hero.title')}
                </h1>
                <p className="text-xl mb-8">
                  {t('hero.subtitle')}
                </p>
                <Link
                  href={`/${locale}/register`}
                  className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
                >
                  {t('hero.cta')}
                </Link>
              </div>
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/for-types/supplier.jpg"
                  alt="Suppliers"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('benefits.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.moreBusiness.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.moreBusiness.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.simplifiedCommunication.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.simplifiedCommunication.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.noUpfrontCosts.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.noUpfrontCosts.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('howItWorks.title')}
            </h2>
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.createProfile.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('howItWorks.createProfile.description')}
                  </p>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/steps/planning2.png"
                    alt="Create Your Profile"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.receiveRequests.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('howItWorks.receiveRequests.description')}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 md:order-1">
                  <Image
                    src="/images/steps/find_suppliers2.png"
                    alt="Receive Quote Requests"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.submitQuotes.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('howItWorks.submitQuotes.description')}
                  </p>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/steps/compare_quotes2.png"
                    alt="Submit Quotes"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.getBookings.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('howItWorks.getBookings.description')}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 md:order-1">
                  <Image
                    src="/images/steps/booking2.png"
                    alt="Get Bookings"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t('howItWorks.manageEvents.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('howItWorks.manageEvents.description')}
                  </p>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/steps/communicate2.png"
                    alt="Manage Events"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('pricing.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('pricing.subtitle')}
            </p>
            <div className="bg-gray-50 p-8 rounded-lg inline-block">
              <h3 className="text-2xl font-bold mb-4">{t('pricing.commission')}</h3>
              <p className="text-gray-700 mb-6">
                {t('pricing.description')}
              </p>
              <Link
                href={`/${locale}/pricing`}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t('pricing.learnMore')}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/register`}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {t('cta.join')}
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {dict.navigation.demo}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer lang={locale} dictionary={dict} />
      </div>
    </>
  );
}
