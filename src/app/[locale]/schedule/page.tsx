import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "schedule" });
  
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `/${params.locale}/schedule`,
      languages: {
        en: "/en/schedule",
        sv: "/sv/schedule",
      },
    },
  };
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "schedule" });
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
                  <img src="/images/el/header-icon/schedule.svg" alt="Schedule" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {t("features.timeline.title")}
                </h3>
                <p className="text-gray-700">
                  {t("features.timeline.description")}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <img src="/images/el/header-icon/communicate.svg" alt="Share" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {t("features.sharing.title")}
                </h3>
                <p className="text-gray-700">
                  {t("features.sharing.description")}
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <img src="/images/el/header-icon/templates.svg" alt="Templates" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {t("features.templates.title")}
                </h3>
                <p className="text-gray-700">
                  {t("features.templates.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("howItWorks.title")}
            </h2>
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
                    <h3 className="text-2xl font-bold">
                      {t("howItWorks.step1.title")}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("howItWorks.step1.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/planning2.png"
                    alt={t("howItWorks.step1.title")}
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
                      {t("howItWorks.step2.title")}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("howItWorks.step2.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/schedule2.png"
                    alt={t("howItWorks.step2.title")}
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
                      {t("howItWorks.step3.title")}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("howItWorks.step3.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg">
                  <Image
                    src="/images/steps/communicate2.png"
                    alt={t("howItWorks.step3.title")}
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
                      {t("howItWorks.step4.title")}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-700">
                    {t("howItWorks.step4.description")}
                  </p>
                </div>
                <div className="relative h-64 md:h-80 bg-white p-4 rounded-lg md:order-1">
                  <Image
                    src="/images/steps/booking2.png"
                    alt={t("howItWorks.step4.title")}
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
                {commonT("navigation.demo")}
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
