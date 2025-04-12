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
      ? `Host Your Perfect Celebration: DIY Events | Mollösunds Wärdshus`
      : `Anordna din perfekta fest: Gör-det-själv-event | Mollösunds Wärdshus`,
    description: locale === 'en'
      ? "Create your own unique celebration by the sea. Ditch the conventional, embrace the coastal charm at Mollösunds Wärdshus."
      : "Skapa din egen unika fest vid havet. Skippa det konventionella, omfamna kustcharmen på Mollösunds Wärdshus.",
  };
}

export default async function FesterPage({
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
                ? 'Celebrations by the Sea'
                : 'Fester vid havet'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {locale === 'en'
                ? 'DIY Celebrations with a Coastal Twist'
                : 'Gör-det-själv-fester med havets twist'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            {locale === 'en' ? 'Your Celebration, Your Way' : 'Din Fest, Dina Regler'}
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-4">
            {locale === 'en'
              ? 'Tired of cookie-cutter venues and rigid packages? Trade them for salty air, stunning archipelago views, and the freedom to create your perfect celebration.'
              : 'Trött på standardfestlokaler och stela paket? Byt ut dem mot salt luft, fantastisk skärgårdsutsikt och friheten att skapa din perfekta fest.'}
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
              {locale === 'en' ? 'Plan Your DIY Celebration' : 'Planera din gör-det-själv-fest'}
            </Link>
          </div>
        </div>

        {/* DIY Celebration Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'What Makes Our DIY Celebrations Special' : 'Vad gör våra gör-det-själv-fester speciella'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Stunning Setting' : 'Fantastisk miljö'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Celebrate with the stunning Bohuslän archipelago as your backdrop. Choose from our historic dining hall, charming courtyard, or even a nearby coastal spot for your event.'
                  : 'Fira med den vackra Bohusläns skärgård som bakgrund. Välj mellan vår historiska matsal, charmiga innergård eller till och med en närliggande kustplats för ditt event.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Accommodation Options' : 'Boendealternativ'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Room for approximately 30 guests within our 15 unique hotel rooms. Need more space? We can help arrange nearby lodging for larger parties.'
                  : 'Plats för cirka 30 gäster i våra 15 unika hotellrum. Behöver du mer utrymme? Vi kan hjälpa till att ordna närliggande boende för större sällskap.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Your Choice of Food & Drink' : 'Ditt val av mat och dryck'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Bring your own catering team or let us connect you with local options. From traditional Swedish feasts to international cuisine or casual food truck fare - it\'s entirely up to you.'
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
                  ? 'Configure our spaces however you like - traditional banquet setup, creative party layout, or something entirely different. Our historic venue becomes your canvas.'
                  : 'Konfigurera våra utrymmen hur du vill - traditionell bankettuppsättning, kreativ festlayout eller något helt annat. Vår historiska plats blir din canvas.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              {locale === 'en' ? 'Your Schedule, Your Rules' : 'Ditt schema, dina regler'}
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              {locale === 'en'
                ? 'No rigid timetables here. Start early, end late, take a break for photos on the cliffs - we\'re flexible and ready to accommodate your vision.'
                : 'Inga stela tidtabeller här. Börja tidigt, sluta sent, ta en paus för foton på klipporna - vi är flexibla och redo att anpassa oss efter din vision.'}
            </p>
          </div>
        </div>

        {/* Celebration Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Perfect for Any Occasion' : 'Perfekt för alla tillfällen'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Birthday Celebrations' : 'Födelsedagsfirande'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Whether it\'s a milestone birthday or just a good excuse to gather friends and family, our venue provides the perfect backdrop for a memorable celebration.'
                  : 'Oavsett om det är en milstolpe eller bara en bra ursäkt för att samla vänner och familj, ger vår plats den perfekta bakgrunden för ett minnesvärt firande.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Anniversary Parties' : 'Jubileumsfester'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Celebrate years of love, friendship, or business success with a personalized event that reflects your journey together.'
                  : 'Fira år av kärlek, vänskap eller affärsframgång med ett personligt event som speglar er resa tillsammans.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Family Reunions' : 'Familjemöten'}
              </h3>
              <p className="text-gray-700 mb-4">
                {locale === 'en'
                  ? 'Bring together extended family in a relaxed coastal setting where everyone can reconnect, create new memories, and enjoy quality time together.'
                  : 'Samla släkten i en avslappnad kustmiljö där alla kan återknyta kontakten, skapa nya minnen och njuta av kvalitetstid tillsammans.'}
              </p>
            </div>
          </div>
        </div>

        {/* Celebration Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Celebration Inspiration' : 'Festinspiration'}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'Every celebration at Mollösunds Wärdshus is unique, reflecting your personal style and vision. Here are some ideas to spark your imagination.'
              : 'Varje fest på Mollösunds Wärdshus är unik och speglar din personliga stil och vision. Här är några idéer för att väcka din fantasi.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Seaside Party' : 'Bild: Fest vid havet'}
              </p>
            </div>

            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Historic Hall Banquet' : 'Bild: Bankett i historisk sal'}
              </p>
            </div>

            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                {locale === 'en' ? 'Image: Sunset Celebration' : 'Bild: Firande i solnedgången'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'en' ? 'Plan Your Celebration' : 'Planera din fest'}
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
