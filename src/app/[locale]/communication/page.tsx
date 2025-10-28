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
  const t = await getTranslations({ locale, namespace: 'communication' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/communication`,
      languages: {
        en: '/en/communication',
        sv: '/sv/communication',
      },
    },
  };
}

export default async function CommunicationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'communication' });
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
                  src="/images/steps/communicate2.png"
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
                  <img src="/images/el/header-icon/communicate.svg" alt={t('features.centralizedCommunication.title')} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {t('features.centralizedCommunication.title')}
                </h3>
                <p className="text-gray-700">
                  {t('features.centralizedCommunication.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {t('features.automatedNotifications.title')}
                </h3>
                <p className="text-gray-700">
                  {t('features.automatedNotifications.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {t('features.multiChannelDelivery.title')}
                </h3>
                <p className="text-gray-700">
                  {t('features.multiChannelDelivery.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Communication Types Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('communicationTypes.title')}
            </h2>
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t('communicationTypes.participant.title')}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('communicationTypes.participant.description')}
                  </p>
                  <ul className="space-y-2">
                    {t('communicationTypes.participant.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/invite_participants2.png"
                    alt={t('communicationTypes.participant.title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">
                    {t('communicationTypes.supplier.title')}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('communicationTypes.supplier.description')}
                  </p>
                  <ul className="space-y-2">
                    {t('communicationTypes.supplier.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/find_suppliers2.png"
                    alt={t('communicationTypes.supplier.title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t('communicationTypes.team.title')}
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('communicationTypes.team.description')}
                  </p>
                  <ul className="space-y-2">
                    {t('communicationTypes.team.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/planning2.png"
                    alt={t('communicationTypes.team.title')}
                    fill
                    className="object-contain"
                  />
                </div>
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
