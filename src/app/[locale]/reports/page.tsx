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
  const t = await getTranslations({ locale, namespace: 'reports' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/reports`,
      languages: {
        en: '/en/reports',
        sv: '/sv/reports',
      },
    },
  };
}

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'reports' });
  const tNav = await getTranslations({ locale, namespace: 'navigation' });
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
                  {t('title')}
                </h1>
                <p className="text-xl mb-8">
                  {t('subtitle')}
                </p>
                <Link
                  href={`/${locale}/register`}
                  className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
                >
                  {tNav('register')}
                </Link>
              </div>
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/steps/compare_quotes2.png"
                  alt={t('title')}
                  fill
                  className="object-contain bg-white rounded-lg p-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('features.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t('features.dashboards.title')}</h3>
                <p className="text-gray-700">
                  {t('features.dashboards.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t('features.budgetTracking.title')}</h3>
                <p className="text-gray-700">
                  {t('features.budgetTracking.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t('features.customReports.title')}</h3>
                <p className="text-gray-700">
                  {t('features.customReports.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Report Types Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('reportTypes.title')}
            </h2>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4">{t('reportTypes.financial.title')}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg text-gray-700 mb-4">
                      {t('reportTypes.financial.description')}
                    </p>
                    <ul className="space-y-2">
                      {t('reportTypes.financial.items', { returnObjects: true }).map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-64">
                    <Image
                      src="/images/steps/compare_quotes2.png"
                      alt={t('reportTypes.financial.title')}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4">{t('reportTypes.participant.title')}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="md:order-2">
                    <p className="text-lg text-gray-700 mb-4">
                      {t('reportTypes.participant.description')}
                    </p>
                    <ul className="space-y-2">
                      {t('reportTypes.participant.items', { returnObjects: true }).map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-64 md:order-1">
                    <Image
                      src="/images/steps/invite_participants2.png"
                      alt={t('reportTypes.participant.title')}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4">{t('reportTypes.supplier.title')}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg text-gray-700 mb-4">
                      {t('reportTypes.supplier.description')}
                    </p>
                    <ul className="space-y-2">
                      {t('reportTypes.supplier.items', { returnObjects: true }).map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-64">
                    <Image
                      src="/images/steps/find_suppliers2.png"
                      alt={t('reportTypes.supplier.title')}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4">{t('reportTypes.strategic.title')}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="md:order-2">
                    <p className="text-lg text-gray-700 mb-4">
                      {t('reportTypes.strategic.description')}
                    </p>
                    <ul className="space-y-2">
                      {t('reportTypes.strategic.items', { returnObjects: true }).map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-64 md:order-1">
                    <Image
                      src="/images/steps/planning2.png"
                      alt={t('reportTypes.strategic.title')}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Export Options Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('exportOptions.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t('exportOptions.fileFormats.title')}</h3>
                <p className="text-gray-700">
                  {t('exportOptions.fileFormats.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t('exportOptions.scheduledReports.title')}</h3>
                <p className="text-gray-700">
                  {t('exportOptions.scheduledReports.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t('exportOptions.teamSharing.title')}</h3>
                <p className="text-gray-700">
                  {t('exportOptions.teamSharing.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('benefits.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.dataDriven.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.dataDriven.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.demonstrateRoi.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.demonstrateRoi.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.costSaving.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.costSaving.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.improveFuture.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.improveFuture.description')}
                </p>
              </div>
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
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/register`}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {tNav('register')}
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {tNav('demo')}
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
