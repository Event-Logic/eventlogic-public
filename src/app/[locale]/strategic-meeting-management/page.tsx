import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "strategic-meeting-management" });
  
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `/${params.locale}/strategic-meeting-management`,
      languages: {
        en: "/en/strategic-meeting-management",
        sv: "/sv/strategic-meeting-management",
      },
    },
  };
}

export default async function StrategicMeetingManagementPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "strategic-meeting-management" });
  const commonT = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t("hero.title")}
                </h1>
                <p className="text-xl mb-8">
                  {t("hero.subtitle")}
                </p>
                <Link
                  href={`/${locale}/register`}
                  className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
                >
                  {t("hero.cta")}
                </Link>
              </div>
              <div className="relative h-64 md:h-96">
                <Image
                  src="/images/steps/planning2.png"
                  alt={t("hero.title")}
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
              {t("features.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t("features.centralized.title")}</h3>
                <p className="text-gray-700">
                  {t("features.centralized.description")}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t("features.costControl.title")}</h3>
                <p className="text-gray-700">
                  {t("features.costControl.description")}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{t("features.dataDecisions.title")}</h3>
                <p className="text-gray-700">
                  {t("features.dataDecisions.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("process.title")}
            </h2>
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                    <h3 className="text-2xl font-bold">{t("process.policy.title")}</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("process.policy.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/planning2.png"
                    alt={t("process.policy.title")}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
                    <h3 className="text-2xl font-bold">{t("process.supplier.title")}</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("process.supplier.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/find_suppliers2.png"
                    alt={t("process.supplier.title")}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
                    <h3 className="text-2xl font-bold">{t("process.budget.title")}</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("process.budget.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/compare_quotes2.png"
                    alt={t("process.budget.title")}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">4</div>
                    <h3 className="text-2xl font-bold">{t("process.attendee.title")}</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("process.attendee.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/invite_participants2.png"
                    alt={t("process.attendee.title")}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">5</div>
                    <h3 className="text-2xl font-bold">{t("process.dataAnalysis.title")}</h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("process.dataAnalysis.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/communicate2.png"
                    alt={t("process.dataAnalysis.title")}
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
              {t("benefits.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t("benefits.costSavings.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("benefits.costSavings.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.costSavings.items.0")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.costSavings.items.1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.costSavings.items.2")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t("benefits.efficiency.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("benefits.efficiency.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.efficiency.items.0")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.efficiency.items.1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.efficiency.items.2")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t("benefits.compliance.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("benefits.compliance.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.compliance.items.0")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.compliance.items.1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.compliance.items.2")}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t("benefits.decisions.title")}</h3>
                <p className="text-gray-700 mb-4">
                  {t("benefits.decisions.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.decisions.items.0")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.decisions.items.1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("benefits.decisions.items.2")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("caseStudy.title")}
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">{t("caseStudy.companyName")}</h3>
              <p className="text-lg text-gray-700 mb-6">
                {t("caseStudy.description")}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">22%</div>
                  <p className="text-gray-700">{t("caseStudy.results.cost").split(' ').slice(1).join(' ')}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
                  <p className="text-gray-700">{t("caseStudy.results.efficiency").split(' ').slice(1).join(' ')}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-gray-700">{t("caseStudy.results.compliance").split(' ').slice(1).join(' ')}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{t("caseStudy.quote")}"
              </p>
              <p className="text-gray-700 font-medium mt-4">
                {t("caseStudy.attribution")}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl mb-8">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/register`}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {t("cta.getStarted")}
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {t("cta.demo")}
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
