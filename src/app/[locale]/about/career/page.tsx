import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Footer from "../../../../components/Footer";
import { Locale, getDictionary } from "@/dictionaries";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "career" });
  
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `/${locale}/about/career`,
      languages: {
        en: "/en/about/career",
        sv: "/sv/about/career",
      },
    },
  };
}

export default async function CareerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "career" });
  const dict = await getDictionary(locale);

  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: locale === 'en' ? 'Senior Frontend Developer' : 'Senior Frontend-utvecklare',
      location: 'Gothenburg, Sweden',
      type: locale === 'en' ? 'Full-time' : 'Heltid',
      description: locale === 'en'
        ? 'We are looking for a Senior Frontend Developer to join our team and help build the next generation of our event management platform.'
        : 'Vi söker en Senior Frontend-utvecklare som kan hjälpa oss att bygga nästa generation av vår eventhanteringsplattform.'
    },
    {
      id: 2,
      title: locale === 'en' ? 'UX/UI Designer' : 'UX/UI-designer',
      location: 'Gothenburg, Sweden',
      type: locale === 'en' ? 'Full-time' : 'Heltid',
      description: locale === 'en'
        ? 'Join our design team and help create intuitive and beautiful user experiences for our event management platform.'
        : 'Bli en del av vårt designteam och hjälp till att skapa intuitiva och vackra användarupplevelser för vår eventhanteringsplattform.'
    },
    {
      id: 3,
      title: locale === 'en' ? 'Customer Success Manager' : 'Customer Success Manager',
      location: 'Gothenburg, Sweden',
      type: locale === 'en' ? 'Full-time' : 'Heltid',
      description: locale === 'en'
        ? 'We are looking for a Customer Success Manager to help our clients get the most out of our platform and ensure their success.'
        : 'Vi söker en Customer Success Manager som kan hjälpa våra kunder att få ut det mesta av vår plattform och säkerställa deras framgång.'
    }
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-purple-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Why Work With Us Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t("whyWorkWithUs.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                    {locale === 'en' ? 'Join Our Team' : 'Bli en del av vårt team'}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-300 mt-2">
                    {locale === 'en' ? 'We\'re always looking for talented individuals' : 'Vi söker alltid efter talangfulla individer'}
                  </p>
                </div>
              </div>
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {locale === 'en' ? 'Innovative Environment' : 'Innovativ miljö'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {locale === 'en'
                          ? 'Work on cutting-edge technology and help shape the future of event management.'
                          : 'Arbeta med den senaste tekniken och hjälp till att forma framtiden för eventhantering.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {locale === 'en' ? 'Work-Life Balance' : 'Balans mellan arbete och fritid'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {locale === 'en'
                          ? 'Flexible working hours, remote work options, and a focus on employee well-being.'
                          : 'Flexibla arbetstider, möjlighet till distansarbete och fokus på medarbetarnas välbefinnande.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {locale === 'en' ? 'Growth Opportunities' : 'Utvecklingsmöjligheter'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {locale === 'en'
                          ? 'Continuous learning, career development, and opportunities to take on new challenges.'
                          : 'Kontinuerligt lärande, karriärutveckling och möjligheter att ta sig an nya utmaningar.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {locale === 'en' ? 'Collaborative Culture' : 'Samarbetskultur'}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {locale === 'en'
                          ? 'Work with a diverse team of talented professionals in a supportive and inclusive environment.'
                          : 'Arbeta med ett mångsidigt team av talangfulla yrkesmänniskor i en stödjande och inkluderande miljö.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {locale === 'en' ? 'Our Values' : 'Våra värderingar'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Trust & Transparency' : 'Förtroende & Transparens'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'We believe in open communication and building trust with our team, clients, and partners.'
                    : 'Vi tror på öppen kommunikation och att bygga förtroende med vårt team, kunder och partners.'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Innovation' : 'Innovation'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'We constantly challenge the status quo and seek new ways to improve our products and services.'
                    : 'Vi utmanar ständigt status quo och söker nya sätt att förbättra våra produkter och tjänster.'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Customer Focus' : 'Kundfokus'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'We put our customers at the center of everything we do, ensuring their success is our success.'
                    : 'Vi sätter våra kunder i centrum för allt vi gör och säkerställer att deras framgång är vår framgång.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t("openPositions.title")}
            </h2>

            {jobListings.length > 0 ? (
              <div className="space-y-6">
                {jobListings.map((job) => (
                  <div key={job.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                    <Link
                      href={`/${locale}/about/career/${job.id}`}
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      {locale === 'en' ? 'View Details' : 'Visa detaljer'}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {locale === 'en'
                    ? 'We currently don\'t have any open positions, but we\'re always looking for talented individuals to join our team. Send your resume to careers@eventlogic.se and we\'ll keep you in mind for future opportunities.'
                    : 'Vi har för närvarande inga lediga tjänster, men vi letar alltid efter talangfulla individer som kan ansluta sig till vårt team. Skicka ditt CV till careers@eventlogic.se så håller vi dig i åtanke för framtida möjligheter.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Application Process Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {locale === 'en' ? 'Our Application Process' : 'Vår ansökningsprocess'}
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Application' : 'Ansökan'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'Submit your resume and cover letter through our online application system.'
                    : 'Skicka in ditt CV och personliga brev via vårt online-ansökningssystem.'}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Initial Interview' : 'Första intervju'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'A phone or video call to get to know you and discuss your experience and expectations.'
                    : 'Ett telefon- eller videosamtal för att lära känna dig och diskutera din erfarenhet och förväntningar.'}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Technical Assessment' : 'Teknisk bedömning'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'Depending on the role, you may be asked to complete a technical assessment or case study.'
                    : 'Beroende på rollen kan du bli ombedd att genomföra en teknisk bedömning eller fallstudie.'}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {locale === 'en' ? 'Final Interview' : 'Slutintervju'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === 'en'
                    ? 'Meet with the team and discuss how you can contribute to Event Logic.'
                    : 'Träffa teamet och diskutera hur du kan bidra till Event Logic.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-purple-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl mb-8">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:careers@eventlogic.se"
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {t("cta.emailResume")}
              </a>
              <Link
                href={`/${locale}/about`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {t("cta.backToAbout")}
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
