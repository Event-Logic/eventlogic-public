import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const locales = ['en', 'sv'] as const;
type Locale = (typeof locales)[number];

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'design-invitation.metadata' });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eventlogic.se';
  const path = locale === 'sv' ? 'designa-inbjudan' : 'design-invitation';
  const canonicalUrl = `${baseUrl}/${locale}/${path}`;

  const alternateLanguages = {
    'x-default': `${baseUrl}/designa-inbjudan`,
    'en': `${baseUrl}/en/design-invitation`,
    'sv': `${baseUrl}/sv/designa-inbjudan`,
  };

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'Event Logic',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function DesignInvitationPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'design-invitation' });

  return (
    <div id="design-invitation-landing">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t('hero.heading')}
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600">
                {t('hero.subHeading')}
              </h2>
            </div>
          </div>
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/images/design-invitation/design-invitation-mac.png"
                alt="Design invitation on MacBook"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Create Event CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={`/${locale}/register`}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              {t('cta.createEvent')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              {t('cta.helpButton')}
            </Link>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('createEvent.title')}
          </h3>

          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <h6 className="text-lg text-gray-700 leading-relaxed">
              {t('createEvent.subtitle')}
            </h6>
            <h6 className="text-lg text-gray-700 leading-relaxed">
              {t('createEvent.secondSubtitle')}
            </h6>

            <div className="flex justify-center gap-4 my-8">
              <span className="h-1 w-20 bg-purple-600 rounded"></span>
              <span className="h-1 w-20 bg-purple-600 rounded"></span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {t('createEvent.description')}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t('createEvent.secondDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* No Knowledge Required Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('withoutKnowledge.title')}
              </h3>
              <h6 className="text-lg text-gray-700 leading-relaxed">
                {t('withoutKnowledge.subtitle')}
              </h6>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/design-invitation/design-invite-sec-2.png"
                  alt="No knowledge required"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save the Date Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/design-invitation/design-invite-sec-3.png"
                  alt="Save the date"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="order-2">
              <span className="inline-block h-1 w-20 bg-green-600 rounded mb-6"></span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('saveDate.title')}
              </h3>
              <h6 className="text-lg text-gray-700 leading-relaxed">
                {t('saveDate.subtitle')}
              </h6>
            </div>
          </div>
        </div>
      </section>

      {/* Reminders Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('reminders.title')}
              </h3>
              <h6 className="text-lg text-gray-700 leading-relaxed">
                {t('reminders.subtitle')}
              </h6>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/images/design-invitation/design-invitation-reminder-mac.png"
                  alt="Reminders and follow-ups"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/register`}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              {t('cta.createEvent')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              {t('cta.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
