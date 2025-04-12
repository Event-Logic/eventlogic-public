import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";
import { FullWeddingBuilderWrapper } from "@/features/event-builder/components/FullWeddingBuilderWrapper";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Define the canonical URL based on the locale
  const canonicalPath = locale === 'en' ? '/weddings' : '/brollop';

  return {
    title: locale === 'en'
      ? `Create Your Dream Wedding: DIY Events | Mollösunds Wärdshus`
      : `Skapa ditt drömbröllop: Gör-det-själv-event | Mollösunds Wärdshus`,
    description: locale === 'en'
      ? "Create your own unique wedding experience by the sea. Skip the conventional, embrace coastal charm at Mollösunds Wärdshus."
      : "Skapa din egen unika bröllopsupplevelse vid havet. Skippa det konventionella, omfamna kustcharmen på Mollösunds Wärdshus.",
    alternates: {
      canonical: `/${locale}${canonicalPath}`,
      languages: {
        en: '/en/weddings',
        sv: '/sv/brollop',
      },
    },
  };
}

export default async function BrollopPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {locale === 'en'
                ? 'Your Dream Wedding by the Sea'
                : 'Ditt drömbröllop vid havet'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {locale === 'en'
                ? 'DIY Weddings with a Coastal Twist'
                : 'Gör-det-själv-bröllop med havets twist'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            {locale === 'en' ? 'Your Wedding, Your Rules' : 'Ditt Bröllop, Dina Regler'}
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-4">
            {locale === 'en'
              ? 'Tired of standard wedding venues and rigid packages? Trade them for salt air, stunning archipelago views, and the freedom to create your perfect day.'
              : 'Trött på standardbröllopsplatser och stela paket? Byt ut dem mot salt luft, fantastisk skärgårdsutsikt och friheten att skapa din perfekta dag.'}
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
              {locale === 'en' ? 'Plan Your DIY Wedding' : 'Planera ditt gör-det-själv-bröllop'}
            </Link>
          </div>
        </div>

        {/* DIY Wedding Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'What Makes Our DIY Weddings Special' : 'Vad gör våra gör-det-själv-bröllop speciella'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Breathtaking Backdrop' : 'Hisnande bakgrund'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Exchange vows with the beautiful Bohuslän archipelago as your witness. Choose between our historic dining hall, charming courtyard, or even a nearby coastal cliff for your ceremony.'
                  : 'Byt löften med den vackra Bohusläns skärgård som vittne. Välj mellan vår historiska matsal, charmiga innergård eller till och med en närliggande kustklippa för din ceremoni.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Accommodation for Your Guests' : 'Boende för dina gäster'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Room for about 30 key guests in our 15 unique hotel rooms. Need more space? We can help arrange nearby accommodation for larger wedding parties.'
                  : 'Plats för cirka 30 viktiga gäster i våra 15 unika hotellrum. Behöver du mer utrymme? Vi kan hjälpa till att ordna närliggande boende för större bröllopssällskap.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Your Choice of Catering' : 'Ditt val av catering'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Bring your own catering team or let us connect you with local options. From traditional Swedish feast meals to international cuisine or casual food trucks - it\'s entirely up to you.'
                  : 'Ta med ditt eget cateringteam eller låt oss koppla ihop dig med lokala alternativ. Från traditionella svenska festmåltider till internationell mat eller avslappnad food truck - det är helt upp till dig.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Flexible Spaces' : 'Flexibla utrymmen'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Configure our spaces however you want - traditional ceremony arrangement, creative reception layout, or something entirely different. Our historic venue becomes your canvas.'
                  : 'Konfigurera våra utrymmen hur du vill - traditionell ceremoniarrangemang, kreativ mottagningslayout eller något helt annat. Vår historiska plats blir din canvas.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              {locale === 'en' ? 'Your Schedule, Your Rules' : 'Ditt schema, dina regler'}
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              {locale === 'en'
                ? 'No rigid timetables here. Start early, finish late, take a break between ceremony and reception for photos on the cliffs - we\'re flexible and ready to adapt to your vision.'
                : 'Inga stela tidtabeller här. Börja tidigt, sluta sent, ta en paus mellan ceremoni och mottagning för foton på klipporna - vi är flexibla och redo att anpassa oss efter din vision.'}
            </p>
          </div>
        </div>

        {/* Wedding Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Our Wedding Offerings' : 'Våra bröllopserbjudanden'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Venue Only' : 'Endast lokal'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Rent our beautiful spaces and bring your own vendors, decorations, and ideas. Perfect for couples who want complete creative control.'
                  : 'Hyr våra vackra lokaler och ta med dina egna leverantörer, dekorationer och idéer. Perfekt för par som vill ha fullständig kreativ kontroll.'}
              </p>
              <p className="font-semibold">
                {locale === 'en' ? 'From 15,000 SEK' : 'Från 15 000 kr'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Basic Support Package' : 'Grundläggande stödpaket'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Venue rental plus basic coordination services, tables, chairs, and basic linens. You handle the rest of the details.'
                  : 'Lokalhyra plus grundläggande koordineringstjänster, bord, stolar och grundläggande dukar. Du hanterar resten av detaljerna.'}
              </p>
              <p className="font-semibold">
                {locale === 'en' ? 'From 25,000 SEK' : 'Från 25 000 kr'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Complete Weekend Experience' : 'Komplett helgupplevelse'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Exclusive use of the entire inn for a full weekend, including all rooms for your guests, coordination services, and more flexibility for welcome dinners and post-wedding brunches.'
                  : 'Exklusiv användning av hela värdshuset under en hel helg, inklusive alla rum för dina gäster, koordineringstjänster och mer flexibilitet för välkomstmiddagar och bruncher efter bröllopet.'}
              </p>
              <p className="font-semibold">
                {locale === 'en' ? 'From 75,000 SEK' : 'Från 75 000 kr'}
              </p>
            </div>
          </div>
        </div>

        {/* Wedding Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Wedding Inspiration' : 'Bröllopsinspiration'}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'Each wedding at Mollösunds Wärdshus is unique and reflects the couple\'s personal style and vision. Here are some ideas to spark your imagination.'
              : 'Varje bröllop på Mollösunds Wärdshus är unikt och speglar parets personliga stil och vision. Här är några idéer för att väcka din fantasi.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Ceremony by the sea' : 'Bild: Ceremoni vid havet'}
              </p>
            </div>

            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Reception in historic hall' : 'Bild: Mottagning i historisk sal'}
              </p>
            </div>

            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Celebration at sunset' : 'Bild: Firande i solnedgången'}
              </p>
            </div>
          </div>
        </div>

        {/* Wedding Builder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Create Your Own Wedding Package' : 'Skapa ditt eget bröllopspaket'}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'Use our interactive wedding builder to create your own customized package. Choose date, number of guests, and customize with add-ons that suit you.'
              : 'Använd vår interaktiva bröllopsbyggare för att skapa ditt eget skräddarsydda paket. Välj datum, antal gäster, och anpassa med tillägg som passar just er.'}
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <FullWeddingBuilderWrapper locale={locale} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'en' ? 'Plan Your Wedding' : 'Planera ditt bröllop'}
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
              ? 'We are happy to tailor a package to your specific needs!'
              : 'Vi skräddarsyr gärna ett paket efter era önskemål!'}
          </p>
        </div>
      </div>
    </div>
  );
}
