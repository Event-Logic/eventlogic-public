// import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  // Dictionary will be used for future translations
  // const dict = await getDictionary(locale);

  return {
    title: locale === 'en'
      ? `Wellness Retreats by the Sea: DIY Events | Mollösunds Wärdshus`
      : `Wellness-retreats vid havet: Gör-det-själv-event | Mollösunds Wärdshus`,
    description: locale === 'en'
      ? "Create your own unique wellness retreat by the sea. Ditch the conventional, embrace the coastal calm at Mollösunds Wärdshus."
      : "Skapa din egen unika wellness-retreat vid havet. Skippa det konventionella, omfamna kustlugnet på Mollösunds Wärdshus.",
  };
}

export default async function RetreatsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Dictionary will be used for future translations
  // const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {locale === 'en'
                ? 'Wellness Retreats by the Sea'
                : 'Wellness-retreats vid havet'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {locale === 'en'
                ? 'DIY Wellness Experiences with a Coastal Calm'
                : 'Gör-det-själv-wellnessupplevelser med havets lugn'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            {locale === 'en' ? 'Your Retreat, Your Way' : 'Din Retreat, Dina Regler'}
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-4">
            {locale === 'en'
              ? 'Tired of cookie-cutter wellness retreats and rigid programs? Trade them for salty air, stunning archipelago views, and the freedom to create your perfect wellness experience.'
              : 'Trött på standardiserade wellness-retreats och stela program? Byt ut dem mot salt luft, fantastisk skärgårdsutsikt och friheten att skapa din perfekta wellnessupplevelse.'}
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'At Mollösunds Wärdshus, we believe in the power of DIY. You bring the vision, we provide the historic seaside venue and just the right amount of support to make it happen.'
              : 'På Mollösunds Wärdshus tror vi på kraften i gör-det-själv. Du tar med visionen, vi tillhandahåller den historiska havsnära platsen och precis rätt mängd stöd för att göra det möjligt.'}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/${locale === 'en' ? 'contact' : 'kontakt'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {locale === 'en' ? 'Plan Your DIY Retreat' : 'Planera din gör-det-själv-retreat'}
            </Link>
          </div>
        </div>

        {/* DIY Retreat Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'What Makes Our DIY Retreats Special' : 'Vad gör våra gör-det-själv-retreats speciella'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Restorative Environment' : 'Återhämtande miljö'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Immerse yourself in the natural healing power of the sea. The sound of waves, fresh sea air, and stunning archipelago views create the perfect backdrop for wellness and mindfulness.'
                  : 'Fördjupa dig i havets naturliga läkande kraft. Ljudet av vågor, frisk havsluft och fantastisk skärgårdsutsikt skapar den perfekta bakgrunden för wellness och mindfulness.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Comfortable Accommodations' : 'Bekvämt boende'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Room for approximately 30 participants within our 15 unique hotel rooms. Each room has its own character, providing a cozy and authentic experience.'
                  : 'Plats för cirka 30 deltagare i våra 15 unika hotellrum. Varje rum har sin egen karaktär och erbjuder en mysig och autentisk upplevelse.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Customizable Spaces' : 'Anpassningsbara utrymmen'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Configure our spaces to suit your retreat\'s needs - yoga sessions, meditation circles, workshop areas, or discussion groups. Our historic venue becomes your wellness canvas.'
                  : 'Konfigurera våra utrymmen för att passa din retreats behov - yogapass, meditationscirklar, workshopytor eller diskussionsgrupper. Vår historiska plats blir din wellness-canvas.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Nourishing Food Options' : 'Näringsrika matalternativ'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Bring your own chef or let us connect you with local options specializing in healthy, sustainable cuisine. From plant-based menus to local seafood - the choice is yours.'
                  : 'Ta med din egen kock eller låt oss koppla ihop dig med lokala alternativ som specialiserar sig på hälsosam, hållbar mat. Från växtbaserade menyer till lokala skaldjur - valet är ditt.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              {locale === 'en' ? 'Your Program, Your Pace' : 'Ditt program, din takt'}
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              {locale === 'en'
                ? 'No rigid schedules here. Design a program that flows naturally, with time for structured activities, personal reflection, and spontaneous moments of connection with nature and each other.'
                : 'Inga stela scheman här. Designa ett program som flyter naturligt, med tid för strukturerade aktiviteter, personlig reflektion och spontana stunder av kontakt med naturen och varandra.'}
            </p>
          </div>
        </div>

        {/* Retreat Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Perfect for Various Wellness Experiences' : 'Perfekt för olika wellnessupplevelser'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Yoga & Meditation Retreats' : 'Yoga- och meditationsretreats'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Create a sanctuary for deepening practice, with sessions overlooking the sea or in our atmospheric historic spaces. Perfect for reconnecting with self and nature.'
                  : 'Skapa en fristad för fördjupad praktik, med sessioner med utsikt över havet eller i våra atmosfäriska historiska utrymmen. Perfekt för att återknyta till sig själv och naturen.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Creative Workshops' : 'Kreativa workshops'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'The coastal setting provides endless inspiration for writing, art, photography, or other creative pursuits. Let the sea air unlock new levels of creativity.'
                  : 'Kustmiljön ger oändlig inspiration för skrivande, konst, fotografi eller andra kreativa sysselsättningar. Låt havsluften låsa upp nya nivåer av kreativitet.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Team Building & Corporate Wellness' : 'Teambuilding och företagswellness'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Help teams reconnect, recharge, and realign in a setting that encourages both relaxation and meaningful connection. Combine wellness with strategic planning or professional development.'
                  : 'Hjälp team att återknyta, ladda om och omjustera i en miljö som uppmuntrar både avkoppling och meningsfull kontakt. Kombinera wellness med strategisk planering eller professionell utveckling.'}
              </p>
            </div>
          </div>
        </div>

        {/* Retreat Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Retreat Inspiration' : 'Retreatinspiration'}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'Every retreat at Mollösunds Wärdshus is unique, reflecting your wellness philosophy and goals. Here are some ideas to spark your imagination.'
              : 'Varje retreat på Mollösunds Wärdshus är unik och speglar din wellnessfilosofi och dina mål. Här är några idéer för att väcka din fantasi.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Seaside Yoga' : 'Bild: Yoga vid havet'}
              </p>
            </div>

            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Mindfulness Workshop' : 'Bild: Mindfulness-workshop'}
              </p>
            </div>

            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Coastal Meditation' : 'Bild: Meditation vid kusten'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'en' ? 'Plan Your Retreat' : 'Planera din retreat'}
          </h2>
          <p className="text-gray-700 mb-2">
            {locale === 'en' ? 'For more information and booking, contact us at ' : 'För mer information och bokning, kontakta oss på '}
            <a href="mailto:events@wards.se" className="text-blue-600 hover:underline">
              events@wards.se
            </a>
          </p>
          <p className="text-gray-700">
            {locale === 'en' ? 'Phone: ' : 'Telefon: '}
            <a href="tel:030421108" className="text-blue-600 hover:underline">
              0304-211 08
            </a>
          </p>
          <p className="text-gray-700 mt-2">
            {locale === 'en'
              ? 'We are happy to tailor a package to your specific wellness needs!'
              : 'Vi skräddarsyr gärna ett paket efter dina specifika wellnessbehov!'}
          </p>
        </div>
      </div>
    </div>
  );
}
