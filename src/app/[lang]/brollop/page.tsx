import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: `Skapa ditt drömbröllop: Gör-det-själv-event | Mollösunds Wärdshus`,
    description: "Skapa din egen unika bröllopsupplevelse vid havet. Skippa det konventionella, omfamna kustcharmen på Mollösunds Wärdshus.",
  };
}

export default async function BrollopPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Ditt drömbröllop vid havet
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              Gör-det-själv-bröllop med havets twist
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Ditt Bröllop, Dina Regler
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-4">
            Trött på standardbröllopsplatser och stela paket? Byt ut dem mot salt luft, fantastisk skärgårdsutsikt och friheten att skapa din perfekta dag.
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            På Mollösunds Wärdshus tror vi på kraften i gör-det-själv. Du tar med visionen, vi tillhandahåller den historiska havsnära platsen och precis rätt mängd stöd för att göra det möjligt.
          </p>
          <div className="mt-8">
            <Link 
              href={`/${lang}/kontakt`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Planera ditt gör-det-själv-bröllop
            </Link>
          </div>
        </div>

        {/* DIY Wedding Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Vad gör våra gör-det-själv-bröllop speciella
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Hisnande bakgrund
              </h3>
              <p className="mb-4 text-gray-700">
                Byt löften med den vackra Bohusläns skärgård som vittne. Välj mellan vår historiska matsal, charmiga innergård eller till och med en närliggande kustklippa för din ceremoni.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Boende för dina gäster
              </h3>
              <p className="mb-4 text-gray-700">
                Plats för cirka 30 viktiga gäster i våra 15 unika hotellrum. Behöver du mer utrymme? Vi kan hjälpa till att ordna närliggande boende för större bröllopssällskap.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Ditt val av catering
              </h3>
              <p className="mb-4 text-gray-700">
                Ta med ditt eget cateringteam eller låt oss koppla ihop dig med lokala alternativ. Från traditionella svenska festmåltider till internationell mat eller avslappnad food truck - det är helt upp till dig.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Flexibla utrymmen
              </h3>
              <p className="mb-4 text-gray-700">
                Konfigurera våra utrymmen hur du vill - traditionell ceremoniarrangemang, kreativ mottagningslayout eller något helt annat. Vår historiska plats blir din canvas.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              Ditt schema, dina regler
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Inga stela tidtabeller här. Börja tidigt, sluta sent, ta en paus mellan ceremoni och mottagning för foton på klipporna - vi är flexibla och redo att anpassa oss efter din vision.
            </p>
          </div>
        </div>

        {/* Wedding Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Våra bröllopserbjudanden
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                Endast lokal
              </h3>
              <p className="text-gray-700 mb-4">
                Hyr våra vackra lokaler och ta med dina egna leverantörer, dekorationer och idéer. Perfekt för par som vill ha fullständig kreativ kontroll.
              </p>
              <p className="font-semibold">
                Från 15 000 kr
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                Grundläggande stödpaket
              </h3>
              <p className="text-gray-700 mb-4">
                Lokalhyra plus grundläggande koordineringstjänster, bord, stolar och grundläggande dukar. Du hanterar resten av detaljerna.
              </p>
              <p className="font-semibold">
                Från 25 000 kr
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                Komplett helgupplevelse
              </h3>
              <p className="text-gray-700 mb-4">
                Exklusiv användning av hela värdshuset under en hel helg, inklusive alla rum för dina gäster, koordineringstjänster och mer flexibilitet för välkomstmiddagar och bruncher efter bröllopet.
              </p>
              <p className="font-semibold">
                Från 75 000 kr
              </p>
            </div>
          </div>
        </div>

        {/* Wedding Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Bröllopsinspiration
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            Varje bröllop på Mollösunds Wärdshus är unikt och speglar parets personliga stil och vision. Här är några idéer för att väcka din fantasi.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                Bild: Ceremoni vid havet
              </p>
            </div>
            
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                Bild: Mottagning i historisk sal
              </p>
            </div>
            
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">
                Bild: Firande i solnedgången
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Planera ditt bröllop
          </h2>
          <p className="text-gray-700 mb-2">
            För mer information och bokning, kontakta oss på 
            <a href="mailto:events@wards.se" className="text-blue-600 hover:underline">
              events@wards.se
            </a>
          </p>
          <p className="text-gray-700">
            Telefon: 
            <a href="tel:030421108" className="text-blue-600 hover:underline">
              0304-211 08
            </a>
          </p>
          <p className="text-gray-700 mt-2">
            Vi skräddarsyr gärna ett paket efter era önskemål!
          </p>
        </div>
      </div>
    </div>
  );
}
