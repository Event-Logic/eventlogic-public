import { getTranslations } from "next-intl/server";
import type { Locale } from "../../../dictionaries";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { Metadata } from "next";
import { getDictionary } from "../../../dictionaries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'decision-making' });

  // Define the canonical URL based on the locale
  const canonicalPath = locale === 'en' ? '/decision-making' : '/forenkla-beslutsprocessen';

  return {
    title: `${t('metaTitle')}`,
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}${canonicalPath}`,
      languages: {
        en: '/en/decision-making',
        sv: '/sv/forenkla-beslutsprocessen',
      },
    },
  };
}

export default async function DecisionMakingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'decision-making' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
  const dict = await getDictionary(locale);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t('title')}
                </h1>
                <p className="text-xl mb-8 text-gray-100">
                  {t('subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${locale}/demo`}
                    className="inline-block bg-white text-purple-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors text-center"
                  >
                    {tNav('demo')}
                  </Link>
                  <Link
                    href={`/${locale}/register`}
                    className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors text-center"
                  >
                    {tNav('register')}
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/decision-making/hero-laptop.png"
                  alt={t('title')}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Easy Decisions Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  {t('sectionEasyDecisions.title')}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {t('sectionEasyDecisions.subtitle')}
                </p>
                <p className="text-lg text-gray-700">
                  {t('sectionEasyDecisions.description')}
                </p>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="/images/decision-making/banner.png"
                  alt={t('sectionEasyDecisions.title')}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Budget Planning Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  {t('sectionBudget.title')}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {t('sectionBudget.subtitle')}
                </p>
                <p className="text-lg text-gray-700">
                  {t('sectionBudget.description')}
                </p>
              </div>
              <div className="relative h-64 md:h-80 md:order-1">
                <Image
                  src="/images/decision-making/section-budget.png"
                  alt={t('sectionBudget.title')}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Invoice Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  {t('sectionInvoice.title')}
                </h2>
                <p className="text-lg text-gray-700">
                  {t('sectionInvoice.subtitle')}
                </p>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="/images/decision-making/section-invoice.png"
                  alt={t('sectionInvoice.title')}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics and Reports Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  {t('sectionReports.title')}
                </h2>
                <p className="text-lg text-gray-700">
                  {t('sectionReports.subtitle')}
                </p>
              </div>
              <div className="relative h-64 md:h-80 md:order-1">
                <Image
                  src="/images/decision-making/section-reports.png"
                  alt={t('sectionReports.title')}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {t('cta.getStarted')}
              </Link>
              <Link
                href={`/${locale}/${locale === 'sv' ? 'kontakt' : 'contact'}`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {t('cta.contactUs')}
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
