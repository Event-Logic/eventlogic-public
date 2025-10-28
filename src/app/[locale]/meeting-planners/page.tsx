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
  const t = await getTranslations({ locale, namespace: 'meeting-planners' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/meeting-planners`,
      languages: {
        en: '/en/meeting-planners',
        sv: '/sv/meeting-planners',
      },
    },
  };
}

export default async function MeetingPlannersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meeting-planners' });
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
                  {t('hero.title')}
                </h1>
                <p className="text-xl mb-8">
                  {t('hero.subtitle')}
                </p>
                <Link
                  href={`/${locale}/demo`}
                  className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
                >
                  {tNav('demo')}
                </Link>
              </div>
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/for-types/meetingPlanner.jpg"
                  alt={t('hero.title')}
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
                <h3 className="text-xl font-semibold mb-4">{t('benefits.saveTime.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.saveTime.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.simplifyPlanning.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.simplifyPlanning.description')}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('benefits.professionalResults.title')}</h3>
                <p className="text-gray-700">
                  {t('benefits.professionalResults.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('features.title')}
            </h2>
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t('features.findSuppliers.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('features.findSuppliers.description')}
                  </p>
                  <Link
                    href={`/${locale}/find-suppliers`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {t('features.findSuppliers.learnMore')}
                  </Link>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/steps/find_suppliers2.png"
                    alt={t('features.findSuppliers.title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">{t('features.compareOffers.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('features.compareOffers.description')}
                  </p>
                  <Link
                    href={`/${locale}/compare-offers`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {t('features.compareOffers.learnMore')}
                  </Link>
                </div>
                <div className="relative h-64 md:h-80 md:order-1">
                  <Image
                    src="/images/steps/compare_quotes2.png"
                    alt={t('features.compareOffers.title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t('features.participantManagement.title')}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    {t('features.participantManagement.description')}
                  </p>
                  <Link
                    href={`/${locale}/participant-management`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {t('features.participantManagement.learnMore')}
                  </Link>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/steps/invite_participants2.png"
                    alt={t('features.participantManagement.title')}
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
                href={`/${locale}/demo`}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {tNav('demo')}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {tNav('register')}
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
