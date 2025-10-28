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
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        sv: '/sv/about',
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const dict = await getDictionary(locale);

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-purple-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* About Event Logic Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('about.title')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {t('about.description1')}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {t('about.description2')}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {locale === 'en'
                    ? 'This has resulted in Event Logic, a platform that helps event planners plan, source, and compare suppliers to get the best price and outcome of their bookings.'
                    : 'Det har resulterat i Event Logic, en plattform som hjälper eventplanerare att planera, upphandla och jämföra leverantörer för att få bästa möjliga pris och utfall av sina bokningar.'}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {locale === 'en'
                    ? "Since Event Logic was founded in Gothenburg in 2013, the platform has evolved into the key tool for meetings, events, and conferences. All handling is managed instantly in the user's event page on the platform, which means that everything that involves the user's all bookings is in the same place, which provides a full overview, easier handling, time-saving, and monitoring capabilities."
                    : 'Sedan vi grundades i Göteborg 2013 har Event Logic utvecklats till det självklara verktyget inom möten, event och konferens. All hantering sker direkt i användarens personliga eventsida i plattformen vilket betyder att allt som rör användarens alla bokningar finns på samma ställe vilket möjliggör full översikt, enklare hantering, tidsbesparing och uppföljningsmöjligheter.'}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {locale === 'en'
                    ? 'Event Logic does not only simplify the sourcing of facilities and other suppliers. We offer complete guest management, such as invitations and registration, smooth communication with both participants and suppliers, budget planning, and reporting. This makes us unique in the market.'
                    : 'Event Logic förenklar inte bara upphandling av anläggning och andra leverantörer, vi erbjuder komplett deltagarhantering som inbjudningar och anmälan, enkel kommunikation med såväl deltagare som leverantör, budgetplanering och rapportering. Det gör oss unika på marknaden.'}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  {locale === 'en'
                    ? "Want to know more? Click and submit your information below and we'll be in touch!"
                    : "Vill du veta mer? Klicka nedan och fyll i din information så hör vi av oss!"}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  {locale === 'en' ? 'Contact Us' : 'Kontakta oss'}
                </Link>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                    {locale === 'en' ? 'Founded in Gothenburg' : 'Grundat i Göteborg'}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-300 mt-2">
                    {locale === 'en' ? 'Since 2013' : 'Sedan 2013'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {locale === 'en' ? 'Contact Information' : 'Kontaktinformation'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Office Address */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-400">
                  {locale === 'en' ? 'Office Address' : 'Kontorsadress'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Event Logic Sweden AB</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Theres Svenssons Gata 13</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">417 55 Göteborg</p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>{locale === 'en' ? 'Sweden' : 'Sverige'}</strong>
                </p>
              </div>

              {/* Contact Details */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-400">
                  {locale === 'en' ? 'Contact Details' : 'Kontaktuppgifter'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>{locale === 'en' ? 'Email:' : 'E-post:'}</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <a href="mailto:info@eventlogic.se" className="text-purple-600 hover:underline">info@eventlogic.se</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>{locale === 'en' ? 'Support:' : 'Support:'}</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <a href="mailto:support@eventlogic.se" className="text-purple-600 hover:underline">support@eventlogic.se</a>
                </p>
              </div>

              {/* Business Information */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-400">
                  {locale === 'en' ? 'Business Information' : 'Företagsinformation'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>{locale === 'en' ? 'Organization Number:' : 'Organisationsnummer:'}</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">556941-5002</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>{locale === 'en' ? 'VAT Number:' : 'Momsregistreringsnummer:'}</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300">SE556941500201</p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section className="py-16 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {locale === 'en' ? 'Our Clients' : 'Våra kunder'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Client Logo Placeholder 1 */}
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-24">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Company A</p>
                </div>
              </div>

              {/* Client Logo Placeholder 2 */}
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-24">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Company B</p>
                </div>
              </div>

              {/* Client Logo Placeholder 3 */}
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-24">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Company C</p>
                </div>
              </div>

              {/* Client Logo Placeholder 4 */}
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-24">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Company D</p>
                </div>
              </div>

              {/* Client Logo Placeholder 5 */}
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-24">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Company E</p>
                </div>
              </div>

              {/* Client Logo Placeholder 6 */}
              <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-24">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Company F</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-purple-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'en' ? 'Ready to Get Started?' : 'Redo att komma igång?'}
            </h2>
            <p className="text-xl mb-8">
              {locale === 'en'
                ? 'Join thousands of organizations that use Event Logic to streamline their event planning process.'
                : 'Anslut dig till tusentals organisationer som använder Event Logic för att effektivisera sin eventplaneringsprocess.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {locale === 'en' ? 'Request Demo' : 'Begär Demo'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {locale === 'en' ? 'Contact Us' : 'Kontakta oss'}
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
