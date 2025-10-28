import { getTranslations } from "next-intl/server";
import type { Locale } from "../../../dictionaries";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { Metadata } from "next";
import { getDictionary } from "../../../dictionaries";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return {
    title: `${t('metadata.title')} | Event Logic`,
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: {
        en: '/en/pricing',
        sv: '/sv/pricing',
      },
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
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

        {/* Pricing Plans Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-6">
                  <h2 className="text-2xl font-bold mb-2">{t('plans.basic.name')}</h2>
                  <p className="text-gray-600 mb-4">{t('plans.basic.description')}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{t('plans.basic.price')}</span>
                    <span className="text-gray-600 ml-2">{t('plans.basic.period')}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.basic.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.basic.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.basic.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.basic.features.3')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.basic.features.4')}</span>
                    </li>
                    <li className="flex items-start text-gray-400">
                      <svg className="w-5 h-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{t('plans.basic.notIncluded.0')}</span>
                    </li>
                    <li className="flex items-start text-gray-400">
                      <svg className="w-5 h-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{t('plans.basic.notIncluded.1')}</span>
                    </li>
                  </ul>
                  <Link
                    href={`/${locale}/register?plan=basic`}
                    className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    {t('plans.basic.getStarted')}
                  </Link>
                </div>
              </div>

              {/* Professional Plan */}
              <div className="border-2 border-purple-600 rounded-lg overflow-hidden shadow-lg relative">
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  {t('plans.professional.mostPopular')}
                </div>
                <div className="bg-purple-50 p-6">
                  <h2 className="text-2xl font-bold mb-2">{t('plans.professional.name')}</h2>
                  <p className="text-gray-600 mb-4">{t('plans.professional.description')}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{t('plans.professional.price')}</span>
                    <span className="text-gray-600 ml-2">{t('plans.professional.period')}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.professional.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.professional.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.professional.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.professional.features.3')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.professional.features.4')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.professional.features.5')}</span>
                    </li>
                    <li className="flex items-start text-gray-400">
                      <svg className="w-5 h-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>{t('plans.professional.notIncluded.0')}</span>
                    </li>
                  </ul>
                  <Link
                    href={`/${locale}/register?plan=professional`}
                    className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    {t('plans.professional.getStarted')}
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-6">
                  <h2 className="text-2xl font-bold mb-2">{t('plans.enterprise.name')}</h2>
                  <p className="text-gray-600 mb-4">{t('plans.enterprise.description')}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{t('plans.enterprise.price')}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.0')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.1')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.2')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.3')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.4')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.5')}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('plans.enterprise.features.6')}</span>
                    </li>
                  </ul>
                  <Link
                    href={`/${locale}/contact?subject=Enterprise%20Plan%20Inquiry`}
                    className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    {t('plans.enterprise.contactSales')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supplier Pricing Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              For Suppliers
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Join Our Supplier Network</h3>
                <p className="text-lg text-gray-700 mb-6">
                  As a supplier, you can join our network for free and get access to thousands of event planners looking for venues and services like yours.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Free to join</strong> - No upfront costs or monthly fees</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>8% commission</strong> - Only pay when you get a booking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Unlimited RFPs</strong> - Receive and respond to as many requests as you want</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Detailed profile</strong> - Showcase your venue or services with photos, descriptions, and pricing</span>
                  </li>
                </ul>
                <Link
                  href={`/${locale}/suppliers`}
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-center">Supplier Pricing</h3>
                <div className="border-2 border-purple-600 rounded-lg p-6 text-center">
                  <p className="text-lg mb-2">Commission Fee</p>
                  <p className="text-5xl font-bold text-purple-600 mb-4">8%</p>
                  <p className="text-gray-700 mb-6">
                    of the total booking value when you receive a booking through Event Logic
                  </p>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-lg font-semibold mb-2">No Hidden Fees</p>
                    <p className="text-gray-700">
                      No setup fees, no monthly fees, no subscription required. You only pay when you get business.
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href={`/${locale}/register?type=supplier`}
                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Join as a Supplier
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Optional Add-ons
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Event Coach</h3>
                <p className="text-gray-700 mb-6">
                  Get expert guidance and support for your events with our experienced Event Coaches.
                </p>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold">€95</span>
                  <span className="text-gray-600 ml-2">/hour</span>
                </div>
                <Link
                  href={`/${locale}/event-coach`}
                  className="inline-block text-purple-600 font-medium hover:underline"
                >
                  Learn More
                </Link>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Custom Integration</h3>
                <p className="text-gray-700 mb-6">
                  Integrate Event Logic with your existing systems, such as CRM, ERP, or accounting software.
                </p>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold">Custom</span>
                </div>
                <Link
                  href={`/${locale}/contact?subject=Custom%20Integration%20Inquiry`}
                  className="inline-block text-purple-600 font-medium hover:underline"
                >
                  Contact Us
                </Link>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">White Label Solution</h3>
                <p className="text-gray-700 mb-6">
                  Offer Event Logic as your own branded solution to your clients, with your logo and colors.
                </p>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl font-bold">Custom</span>
                </div>
                <Link
                  href={`/${locale}/contact?subject=White%20Label%20Solution%20Inquiry`}
                  className="inline-block text-purple-600 font-medium hover:underline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Can I change plans later?</h3>
                <p className="text-gray-700">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-700">
                  Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-700">
                  We accept all major credit cards (Visa, Mastercard, American Express) and can also arrange for invoice payment for annual subscriptions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Do you offer discounts for annual billing?</h3>
                <p className="text-gray-700">
                  Yes, you can save 15% by choosing annual billing instead of monthly billing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What kind of support is included?</h3>
                <p className="text-gray-700">
                  All plans include email support. Professional and Enterprise plans include priority support with faster response times. Enterprise plans also include a dedicated account manager.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-purple-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of organizations that use Event Logic to streamline their event planning process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/register`}
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Book a Demo
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
