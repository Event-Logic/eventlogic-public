import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "../../../dictionaries";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { Metadata } from "next";
import { getDictionary } from "../../../dictionaries";

function generateAlternates(currentLocale: string, canonicalPath: string) {
  return {
    canonical: `/${currentLocale}${canonicalPath}`,
    languages: {
      en: '/en/express-booking',
      sv: '/sv/expressbokning',
    },
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'express-booking' });

  const canonicalPath = locale === 'en' ? '/express-booking' : '/expressbokning';
  
  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: generateAlternates(locale, canonicalPath),
  };
}

function ExpressBookingContent({ locale }: { locale: Locale }) {
  const t = useTranslations('express-booking');

  return (
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
                src="/images/steps/booking2.png"
                alt={t('hero.title')}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                {t('features.quickBooking.title')}
              </h3>
              <p className="text-gray-700">
                {t('features.quickBooking.description')}
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                {t('features.preApproved.title')}
              </h3>
              <p className="text-gray-700">
                {t('features.preApproved.description')}
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                {t('features.transparent.title')}
              </h3>
              <p className="text-gray-700">
                {t('features.transparent.description')}
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
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                  <h3 className="text-2xl font-bold">
                    {t('howItWorks.step1.title')}
                  </h3>
                </div>
                <p className="text-lg text-gray-700">
                  {t('howItWorks.step1.description')}
                </p>
              </div>
              <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                <Image
                  src="/images/steps/planning2.png"
                  alt={t('howItWorks.step1.title')}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
                  <h3 className="text-2xl font-bold">
                    {t('howItWorks.step2.title')}
                  </h3>
                </div>
                <p className="text-lg text-gray-700">
                  {t('howItWorks.step2.description')}
                </p>
              </div>
              <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                <Image
                  src="/images/steps/find_suppliers2.png"
                  alt={t('howItWorks.step2.title')}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
                  <h3 className="text-2xl font-bold">
                    {t('howItWorks.step3.title')}
                  </h3>
                </div>
                <p className="text-lg text-gray-700">
                  {t('howItWorks.step3.description')}
                </p>
              </div>
              <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                <Image
                  src="/images/steps/booking2.png"
                  alt={t('howItWorks.step3.title')}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">4</div>
                  <h3 className="text-2xl font-bold">
                    {t('howItWorks.step4.title')}
                  </h3>
                </div>
                <p className="text-lg text-gray-700">
                  {t('howItWorks.step4.description')}
                </p>
              </div>
              <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                <Image
                  src="/images/steps/communicate2.png"
                  alt={t('howItWorks.step4.title')}
                  fill
                  className="object-contain"
                />
              </div>
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
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('benefits.forPlanners.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forPlanners.item1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forPlanners.item2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forPlanners.item3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forPlanners.item4')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                {t('benefits.forOrganizations.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forOrganizations.item1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forOrganizations.item2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forOrganizations.item3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('benefits.forOrganizations.item4')}</span>
                </li>
              </ul>
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
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/register`}
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              {t('cta.getStarted')}
            </Link>
            <Link
              href={`/${locale}/demo`}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              {t('cta.requestDemo')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function ExpressBookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <ExpressBookingContent locale={locale} />
      <Footer lang={locale} dictionary={dict} />
    </>
  );
}