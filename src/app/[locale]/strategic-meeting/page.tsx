import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "strategic-meeting" });
  
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `/${params.locale}/strategic-meeting`,
      languages: {
        en: "/en/strategic-meeting",
        sv: "/sv/strategic-meeting",
      },
    },
  };
}

export default async function StrategicMeetingPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "strategic-meeting" });
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

        {/* What is SMM Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("whatIsSMM.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  {t("whatIsSMM.description1")}
                </p>
                <p className="text-lg text-gray-700">
                  {t("whatIsSMM.description2")}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t("whatIsSMM.benefitsTitle")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("whatIsSMM.benefits.0")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("whatIsSMM.benefits.1")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("whatIsSMM.benefits.2")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("whatIsSMM.benefits.3")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t("whatIsSMM.benefits.4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Centralized Meeting Management</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Manage all your organization's meetings and events in one centralized platform. Gain visibility into all event activities across departments, locations, and business units.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Single platform for all meeting types</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Customizable approval workflows</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Role-based access control</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/planning2.png"
                    alt="Centralized Meeting Management"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Supplier Management</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Build and maintain a preferred supplier network. Negotiate better rates through volume discounts and leverage your organization's buying power.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Preferred supplier directory</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Contract management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Performance tracking and ratings</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/find_suppliers2.png"
                    alt="Supplier Management"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Budget Control & Approval Workflows</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Implement standardized approval processes and budget controls to ensure compliance with your organization's policies and procedures.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Multi-level approval workflows</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Budget allocation and tracking</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Policy compliance checks</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/compare_quotes2.png"
                    alt="Budget Control & Approval Workflows"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Comprehensive Reporting & Analytics</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Gain valuable insights into your organization's meeting and event spend with detailed reports and analytics. Identify trends, track KPIs, and make data-driven decisions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Customizable dashboards</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Spend analysis by department, event type, etc.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Savings and ROI tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/booking2.png"
                    alt="Comprehensive Reporting & Analytics"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Implementation Process
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">1</div>
                <h3 className="text-xl font-semibold mb-2">Assessment</h3>
                <p className="text-gray-700">
                  We analyze your current meeting management processes, identify pain points, and define your SMM goals.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">2</div>
                <h3 className="text-xl font-semibold mb-2">Strategy</h3>
                <p className="text-gray-700">
                  We develop a customized SMM strategy aligned with your organization's objectives and requirements.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">3</div>
                <h3 className="text-xl font-semibold mb-2">Implementation</h3>
                <p className="text-gray-700">
                  We configure the platform, set up workflows, and integrate with your existing systems.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">4</div>
                <h3 className="text-xl font-semibold mb-2">Adoption</h3>
                <p className="text-gray-700">
                  We provide training, support, and change management to ensure successful adoption across your organization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Success Story
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Global Technology Company</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    A global technology company with over 10,000 employees implemented Event Logic's Strategic Meeting Management solution to gain control over their meeting and event spend.
                  </p>
                  <h4 className="text-xl font-semibold mb-2">Challenges:</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Decentralized meeting planning across 15 countries</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>No visibility into total meeting spend</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Inconsistent supplier selection and contracting</span>
                    </li>
                  </ul>
                  <h4 className="text-xl font-semibold mb-2">Results:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>22% reduction in overall meeting spend</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>35% time savings in the meeting planning process</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>100% compliance with company policies</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Complete visibility into meeting spend across all regions</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">22%</div>
                      <p className="text-lg font-semibold">Cost Reduction</p>
                      <div className="border-t border-blue-300 my-4"></div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">35%</div>
                      <p className="text-lg font-semibold">Time Savings</p>
                    </div>
                  </div>
                </div>
              </div>
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
