import { getTranslations } from "next-intl/server";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { getDictionary } from "../../../dictionaries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collective-invoice' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/collective-invoice`,
      languages: {
        en: '/en/collective-invoice',
        sv: '/sv/collective-invoice',
      },
    },
  };
}

export default async function CollectiveInvoicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collective-invoice' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const dict = await getDictionary(locale);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-green-900 to-blue-900 text-white">
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
                  href={`/${locale}/demo`}
                  className="inline-block bg-white text-green-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
                >
                  {tNav('demo')}
                </Link>
              </div>
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/features/collective-invoice.jpg"
                  alt={t('hero.title')}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('overview.title')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('overview.description')}
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('features.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('features.singleInvoice.title')}</h3>
                <p className="text-gray-700">
                  {t('features.singleInvoice.description')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('features.automaticConsolidation.title')}</h3>
                <p className="text-gray-700">
                  {t('features.automaticConsolidation.description')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('features.detailedBreakdown.title')}</h3>
                <p className="text-gray-700">
                  {t('features.detailedBreakdown.description')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('features.taxHandling.title')}</h3>
                <p className="text-gray-700">
                  {t('features.taxHandling.description')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('features.customBranding.title')}</h3>
                <p className="text-gray-700">
                  {t('features.customBranding.description')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('features.multiCurrency.title')}</h3>
                <p className="text-gray-700">
                  {t('features.multiCurrency.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('process.title')}
            </h2>
            <div className="space-y-8">
              {t('process.steps').map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('benefits.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.reducedAdmin.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.reducedAdmin.description')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.betterTracking.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.betterTracking.description')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.improvedCashFlow.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.improvedCashFlow.description')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.compliance.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.compliance.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Savings Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('savings.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-12">
              {t('savings.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {t('savings.stats').map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-green-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="bg-white text-green-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {tNav('demo')}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {t('cta.button')}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer lang={locale} />
      </div>
    </>
  );
}