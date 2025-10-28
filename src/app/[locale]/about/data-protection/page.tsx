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
  const t = await getTranslations({ locale, namespace: "data-protection" });
  
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `/${locale}/about/data-protection`,
      languages: {
        en: "/en/about/data-protection",
        sv: "/sv/about/data-protection",
      },
    },
  };
}

export default async function DataProtectionPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "data-protection" });
  const dict = await getDictionary(locale);

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

        {/* Data Protection Policy Content */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>{locale === 'en' ? 'Introduction' : 'Introduktion'}</h2>
              <p>
                {locale === 'en'
                  ? 'Event Logic Sweden AB ("Event Logic") is committed to protecting your personal data and privacy. This Data Protection Policy explains how we collect, use, and protect your personal information in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.'
                  : 'Event Logic Sweden AB ("Event Logic") är engagerade i att skydda dina personuppgifter och din integritet. Denna dataskyddspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter i enlighet med den allmänna dataskyddsförordningen (GDPR) och andra tillämpliga dataskyddslagar.'}
              </p>

              <h2>{locale === 'en' ? 'Data Controller' : 'Personuppgiftsansvarig'}</h2>
              <p>
                {locale === 'en'
                  ? 'Event Logic Sweden AB is the data controller responsible for processing your personal data. If you have any questions about this policy or our data practices, please contact us at:'
                  : 'Event Logic Sweden AB är personuppgiftsansvarig för behandlingen av dina personuppgifter. Om du har några frågor om denna policy eller våra dataskyddsrutiner, vänligen kontakta oss på:'}
              </p>
              <p>
                Event Logic Sweden AB<br />
                Theres Svenssons Gata 13<br />
                417 55 Göteborg<br />
                {locale === 'en' ? 'Sweden' : 'Sverige'}<br />
                <a href="mailto:info@eventlogic.se" className="text-purple-600 hover:underline">info@eventlogic.se</a>
              </p>

              <h2>{locale === 'en' ? 'What Personal Data We Collect' : 'Vilka personuppgifter vi samlar in'}</h2>
              <p>
                {locale === 'en'
                  ? 'We may collect the following types of personal data:'
                  : 'Vi kan samla in följande typer av personuppgifter:'}
              </p>
              <ul>
                <li>
                  {locale === 'en'
                    ? 'Contact information (name, email address, phone number, postal address)'
                    : 'Kontaktinformation (namn, e-postadress, telefonnummer, postadress)'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Account information (username, password)'
                    : 'Kontoinformation (användarnamn, lösenord)'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Company information (company name, position, business address)'
                    : 'Företagsinformation (företagsnamn, befattning, företagsadress)'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Event information (event details, participant lists, dietary requirements)'
                    : 'Eventinformation (eventdetaljer, deltagarlistor, kostpreferenser)'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Usage data (how you use our website and services)'
                    : 'Användningsdata (hur du använder vår webbplats och våra tjänster)'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Technical data (IP address, browser type, device information)'
                    : 'Teknisk data (IP-adress, webbläsartyp, enhetsinformation)'}
                </li>
              </ul>

              <h2>{locale === 'en' ? 'How We Collect Your Personal Data' : 'Hur vi samlar in dina personuppgifter'}</h2>
              <p>
                {locale === 'en'
                  ? 'We collect personal data through the following methods:'
                  : 'Vi samlar in personuppgifter genom följande metoder:'}
              </p>
              <ul>
                <li>
                  {locale === 'en'
                    ? 'When you create an account on our platform'
                    : 'När du skapar ett konto på vår plattform'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'When you use our services to plan and manage events'
                    : 'När du använder våra tjänster för att planera och hantera event'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'When you contact us directly via email, phone, or our website'
                    : 'När du kontaktar oss direkt via e-post, telefon eller vår webbplats'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'When you subscribe to our newsletter or marketing communications'
                    : 'När du prenumererar på vårt nyhetsbrev eller marknadsföringskommunikation'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Through cookies and similar technologies on our website'
                    : 'Genom cookies och liknande tekniker på vår webbplats'}
                </li>
              </ul>

              <h2>{locale === 'en' ? 'How We Use Your Personal Data' : 'Hur vi använder dina personuppgifter'}</h2>
              <p>
                {locale === 'en'
                  ? 'We use your personal data for the following purposes:'
                  : 'Vi använder dina personuppgifter för följande ändamål:'}
              </p>
              <ul>
                <li>
                  {locale === 'en'
                    ? 'To provide and manage our services'
                    : 'För att tillhandahålla och hantera våra tjänster'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'To communicate with you about our services'
                    : 'För att kommunicera med dig om våra tjänster'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'To improve our services and develop new features'
                    : 'För att förbättra våra tjänster och utveckla nya funktioner'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'To send you marketing communications (with your consent)'
                    : 'För att skicka marknadsföringskommunikation (med ditt samtycke)'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'To comply with legal obligations'
                    : 'För att uppfylla rättsliga förpliktelser'}
                </li>
              </ul>

              <h2>{locale === 'en' ? 'Legal Basis for Processing' : 'Rättslig grund för behandling'}</h2>
              <p>
                {locale === 'en'
                  ? 'We process your personal data based on the following legal grounds:'
                  : 'Vi behandlar dina personuppgifter baserat på följande rättsliga grunder:'}
              </p>
              <ul>
                <li>
                  {locale === 'en'
                    ? 'Performance of a contract: When we need to process your data to fulfill our contractual obligations to you'
                    : 'Fullgörande av avtal: När vi behöver behandla dina uppgifter för att uppfylla våra avtalsenliga skyldigheter gentemot dig'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Legitimate interests: When processing is necessary for our legitimate interests, such as improving our services'
                    : 'Berättigade intressen: När behandling är nödvändig för våra berättigade intressen, såsom att förbättra våra tjänster'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Consent: When you have given us explicit consent to process your data for specific purposes'
                    : 'Samtycke: När du har gett oss uttryckligt samtycke till att behandla dina uppgifter för specifika ändamål'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Legal obligation: When we need to process your data to comply with a legal obligation'
                    : 'Rättslig förpliktelse: När vi behöver behandla dina uppgifter för att uppfylla en rättslig förpliktelse'}
                </li>
              </ul>

              <h2>{locale === 'en' ? 'Data Retention' : 'Datalagring'}</h2>
              <p>
                {locale === 'en'
                  ? 'We will retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, and the purposes for which we process the data.'
                  : 'Vi behåller dina personuppgifter endast så länge som det är nödvändigt för att uppfylla de ändamål för vilka de samlades in, inklusive för att uppfylla eventuella juridiska, redovisnings- eller rapporteringskrav. För att fastställa lämplig lagringsperiod beaktar vi mängden, arten och känsligheten hos personuppgifterna, den potentiella risken för skada från obehörig användning eller avslöjande, och de ändamål för vilka vi behandlar uppgifterna.'}
              </p>

              <h2>{locale === 'en' ? 'Your Rights' : 'Dina rättigheter'}</h2>
              <p>
                {locale === 'en'
                  ? 'Under the GDPR and other applicable data protection laws, you have the following rights:'
                  : 'Enligt GDPR och andra tillämpliga dataskyddslagar har du följande rättigheter:'}
              </p>
              <ul>
                <li>
                  {locale === 'en'
                    ? 'Right to access: You have the right to request a copy of the personal data we hold about you.'
                    : 'Rätt till tillgång: Du har rätt att begära en kopia av de personuppgifter vi har om dig.'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Right to rectification: You have the right to request that we correct any inaccurate or incomplete personal data.'
                    : 'Rätt till rättelse: Du har rätt att begära att vi korrigerar felaktiga eller ofullständiga personuppgifter.'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Right to erasure: You have the right to request that we delete your personal data in certain circumstances.'
                    : 'Rätt till radering: Du har rätt att begära att vi raderar dina personuppgifter under vissa omständigheter.'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Right to restrict processing: You have the right to request that we restrict the processing of your personal data in certain circumstances.'
                    : 'Rätt till begränsning av behandling: Du har rätt att begära att vi begränsar behandlingen av dina personuppgifter under vissa omständigheter.'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Right to data portability: You have the right to request that we transfer your personal data to another organization or directly to you.'
                    : 'Rätt till dataportabilitet: Du har rätt att begära att vi överför dina personuppgifter till en annan organisation eller direkt till dig.'}
                </li>
                <li>
                  {locale === 'en'
                    ? 'Right to object: You have the right to object to the processing of your personal data in certain circumstances.'
                    : 'Rätt att göra invändningar: Du har rätt att invända mot behandlingen av dina personuppgifter under vissa omständigheter.'}
                </li>
              </ul>

              <h2>{locale === 'en' ? 'Contact Us' : 'Kontakta oss'}</h2>
              <p>
                {locale === 'en'
                  ? 'If you have any questions about this Data Protection Policy or wish to exercise any of your rights, please contact us at:'
                  : 'Om du har några frågor om denna dataskyddspolicy eller vill utöva någon av dina rättigheter, vänligen kontakta oss på:'}
              </p>
              <p>
                <a href="mailto:info@eventlogic.se" className="text-purple-600 hover:underline">info@eventlogic.se</a>
              </p>

              <h2>{locale === 'en' ? 'Updates to This Policy' : 'Uppdateringar av denna policy'}</h2>
              <p>
                {locale === 'en'
                  ? 'We may update this Data Protection Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website or by other appropriate means.'
                  : 'Vi kan uppdatera denna dataskyddspolicy från tid till annan för att återspegla förändringar i våra rutiner eller juridiska krav. Vi kommer att meddela dig om eventuella betydande förändringar genom att publicera den nya policyn på vår webbplats eller på annat lämpligt sätt.'}
              </p>
              <p>
                {locale === 'en'
                  ? 'Last updated: May 2023'
                  : 'Senast uppdaterad: Maj 2023'}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-purple-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'en' ? 'Have Questions About Our Data Practices?' : 'Har du frågor om vår datahantering?'}
            </h2>
            <p className="text-xl mb-8">
              {locale === 'en'
                ? 'Our team is here to help you understand how we protect your data.'
                : 'Vårt team finns här för att hjälpa dig förstå hur vi skyddar dina uppgifter.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-white text-purple-900 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                {locale === 'en' ? 'Contact Us' : 'Kontakta oss'}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {locale === 'en' ? 'Back to About Us' : 'Tillbaka till Om oss'}
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
