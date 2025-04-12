import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";
import { FullConferenceBuilderWrapper } from "@/features/event-builder/components/FullConferenceBuilderWrapper";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: locale === 'en'
      ? `Create Your Coastal Conference: DIY Events | Mollösunds Wärdshus`
      : `Skapa din konferens vid havet: Gör-det-själv-event | Mollösunds Wärdshus`,
    description: locale === 'en'
      ? "Create your own unique conference experience by the sea. Ditch the beige, embrace the brine at Mollösunds Wärdshus."
      : "Skapa din egen unika konferensupplevelse vid havet. Skippa det tråkiga, omfamna havet på Mollösunds Wärdshus.",
  };
}

export default async function KonferensPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Get query parameters
  const dateParam = searchParams.date as string | undefined;
  const daysParam = searchParams.days as string | undefined;
  const attendeesParam = searchParams.attendees as string | undefined;
  const configId = searchParams.id as string | undefined;
  const t = dict.konferens || {
    title: locale === 'en' ? 'Conference' : 'Konferens',
    subtitle: locale === 'en' ? 'Tailored conference packages on the West Coast' : 'Skräddarsydda konferenspaket på Västkusten',
    intro: locale === 'en'
      ? 'Welcome to Mollösunds Wärdshus for a conference experience beyond the ordinary. With the sea as your closest neighbor, we offer an inspiring environment for your meetings.'
      : 'Välkommen till Mollösunds Wärdshus för en konferensupplevelse utöver det vanliga. Med havet som närmsta granne erbjuder vi en inspirerande miljö för era möten.',
    packages: {
      title: locale === 'en' ? 'Conference Packages' : 'Konferenspaket',
      included: locale === 'en' ? 'Our conference package includes:' : 'I konferenspaketet ingår:',
      items: [
        locale === 'en' ? 'Accommodation in shared double room' : 'Boende med del i dubbelrum',
        locale === 'en' ? 'Conference room' : 'Konferenslokal',
        locale === 'en' ? 'Lunch' : 'Lunch',
        locale === 'en' ? 'Morning and afternoon coffee' : 'För- och eftermiddagsfika',
        locale === 'en' ? 'Three-course dinner' : 'Trerättersmiddag',
        locale === 'en' ? 'Breakfast' : 'Frukost'
      ],
      day: {
        title: locale === 'en' ? 'Day Conference' : 'Dagkonferens',
        description: locale === 'en'
          ? 'Perfect for those who need a day to focus on important matters.'
          : 'Perfekt för er som behöver en dag för att fokusera på viktiga frågor.',
        includes: [
          locale === 'en' ? 'Conference room' : 'Konferenslokal',
          locale === 'en' ? 'Morning coffee' : 'Förmiddagsfika',
          locale === 'en' ? 'Lunch' : 'Lunch',
          locale === 'en' ? 'Afternoon coffee' : 'Eftermiddagsfika'
        ],
        price: locale === 'en' ? 'From 595 SEK per person' : 'Från 595 kr per person'
      },
      overnight: {
        title: locale === 'en' ? '24-Hour Conference' : 'Dygnskonferens',
        description: locale === 'en'
          ? 'For those who want to combine effective meetings with team building and relaxation.'
          : 'För er som vill kombinera effektiva möten med teambuilding och avkoppling.',
        includes: [
          locale === 'en' ? 'Accommodation in shared double room' : 'Boende med del i dubbelrum',
          locale === 'en' ? 'Conference room' : 'Konferenslokal',
          locale === 'en' ? 'Morning and afternoon coffee' : 'För- och eftermiddagsfika',
          locale === 'en' ? 'Lunch' : 'Lunch',
          locale === 'en' ? 'Three-course dinner' : 'Trerättersmiddag',
          locale === 'en' ? 'Breakfast' : 'Frukost'
        ],
        price: locale === 'en' ? 'From 2495 SEK per person' : 'Från 2495 kr per person'
      }
    },
    facilities: {
      title: locale === 'en' ? 'Our Conference Facilities' : 'Våra konferenslokaler',
      mainHall: {
        title: locale === 'en' ? 'Main Hall' : 'Stora salen',
        description: locale === 'en'
          ? 'Our largest venue with space for up to 40 people in theater seating. Perfect for larger groups and presentations.'
          : 'Vår största lokal med plats för upp till 40 personer i biosittning. Perfekt för större grupper och presentationer.',
        features: [
          locale === 'en' ? 'Up to 40 people' : 'Upp till 40 personer',
          locale === 'en' ? 'Projector and screen' : 'Projektor och duk',
          locale === 'en' ? 'Sound system' : 'Ljudanläggning',
          'WiFi'
        ]
      },
      seaRoom: {
        title: locale === 'en' ? 'Sea Room' : 'Havsrummet',
        description: locale === 'en'
          ? 'A smaller venue with sea views, perfect for smaller groups who want an inspiring environment.'
          : 'En mindre lokal med havsutsikt, perfekt för mindre grupper som vill ha en inspirerande miljö.',
        features: [
          locale === 'en' ? 'Up to 12 people' : 'Upp till 12 personer',
          locale === 'en' ? 'Sea view' : 'Havsutsikt',
          'Smart TV',
          'Whiteboard',
          'WiFi'
        ]
      }
    },
    activities: {
      title: locale === 'en' ? 'Activities' : 'Aktiviteter',
      description: locale === 'en'
        ? 'Complement your conference with one of our popular activities to strengthen team spirit and gain new perspectives.'
        : 'Komplettera er konferens med någon av våra populära aktiviteter för att stärka teamkänslan och få nya perspektiv.',
      options: [
        {
          title: locale === 'en' ? 'Archipelago Safari' : 'Skärgårdssafari',
          description: locale === 'en'
            ? 'Experience the beautiful Bohuslän archipelago with a guided tour in a RIB boat. An experience that guarantees memories.'
            : 'Upplev den vackra Bohusläns skärgård med en guidad tur i RIB-båt. En upplevelse som garanterat skapar minnen.'
        },
        {
          title: locale === 'en' ? 'Cooking Class' : 'Matlagningskurs',
          description: locale === 'en'
            ? 'Learn to cook the delicacies of the sea with our chef. Finish with a shared dinner of your creations.'
            : 'Lär er laga havets läckerheter tillsammans med vår kock. Avsluta med en gemensam middag av era kreationer.'
        },
        {
          title: locale === 'en' ? 'Guided Walk' : 'Guidad vandring',
          description: locale === 'en'
            ? 'Discover Mollösund\'s history and charm with a guided walk through the picturesque fishing village.'
            : 'Upptäck Mollösunds historia och charm med en guidad vandring genom den pittoreska fiskebyn.'
        }
      ]
    },
    contact: {
      title: locale === 'en' ? 'Book Your Conference' : 'Boka er konferens',
      email: 'konferens@wards.se',
      phone: '0304-211 08',
      note: locale === 'en'
        ? 'We are happy to tailor a package to your specific needs!'
        : 'Vi skräddarsyr gärna ett paket efter era önskemål!'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {locale === 'en'
                ? 'Create Your Coastal Conference'
                : 'Skapa din konferens vid havet'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {locale === 'en'
                ? 'DIY Conferences with a Coastal Twist'
                : 'Gör-det-själv-konferenser med havets twist'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            {locale === 'en' ? 'Your Event, Your Way' : 'Ditt Event, Dina Regler'}
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-4">
            {locale === 'en'
              ? 'Tired of windowless conference rooms and stale coffee? Trade them for salty air, stunning views, and the freedom to create your perfect event.'
              : 'Trött på fönsterlösa konferensrum och gammalt kaffe? Byt ut dem mot salt luft, fantastisk utsikt och friheten att skapa ditt perfekta event.'}
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
              {locale === 'en' ? 'Plan Your DIY Conference' : 'Planera din gör-det-själv-konferens'}
            </Link>
          </div>
        </div>

        {/* Conference Builder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Create Your Own Conference Package' : 'Skapa ditt eget konferenspaket'}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'Use our interactive conference builder to create your own customized package. Choose date, number of attendees, and customize with add-ons that suit your needs.'
              : 'Använd vår interaktiva konferensbyggare för att skapa ditt eget skräddarsydda paket. Välj datum, antal deltagare och anpassa med tillägg som passar dina behov.'}
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <FullConferenceBuilderWrapper
              locale={locale}
              initialDate={dateParam}
              initialDays={daysParam}
              initialAttendees={attendeesParam}
              configId={configId}
            />
          </div>
        </div>

        {/* DIY Conference Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'What Makes Our DIY Conferences Special' : 'Vad gör våra gör-det-själv-konferenser speciella'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Space to Create' : 'Utrymme att skapa'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Various meeting rooms accommodating groups from 15 to 100 people. Configure them however you like - traditional boardroom, creative workshop space, or something entirely different.'
                  : 'Olika mötesrum för grupper från 15 till 100 personer. Konfigurera dem hur du vill - traditionellt styrelserum, kreativt workshopsutrymme eller något helt annat.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Sleep by the Sea' : 'Sov vid havet'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Accommodation for approximately 30 key players within our 15 unique hotel rooms. Need more space? We can help arrange nearby lodging for larger groups.'
                  : 'Boende för cirka 30 nyckelpersoner i våra 15 unika hotellrum. Behöver du mer utrymme? Vi kan hjälpa till att ordna närliggande boende för större grupper.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                {locale === 'en' ? 'Ditch the Stale Catering' : 'Skippa den tråkiga cateringen'}
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
                {locale === 'en' ? 'Beyond Trust Falls' : 'Bortom tillitsövningar'}
              </h3>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Forget boring team-building exercises. How about a RIB boat tour of the archipelago (a nod to our Windzer brothers era), guided village walks, or coastal cooking classes?'
                  : 'Glöm tråkiga teambuilding-övningar. Vad sägs om en RIB-båttur i skärgården (en hyllning till bröderna Windzers era), guidade byvandringar eller matlagningskurser med havstema?'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">
              {locale === 'en' ? 'Your Schedule, Your Rules' : 'Ditt schema, dina regler'}
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              {locale === 'en'
                ? 'No rigid timetables here. Start early, end late, take a long lunch break for a swim in the sea - we\'re flexible and ready to accommodate your vision.'
                : 'Inga stela tidtabeller här. Börja tidigt, sluta sent, ta en lång lunchpaus för ett dopp i havet - vi är flexibla och redo att anpassa oss efter din vision.'}
            </p>
          </div>
        </div>

        {/* Coastal Adventures */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Coastal Adventures' : 'Äventyr vid kusten'}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {locale === 'en'
              ? 'Break away from traditional team-building with these unique coastal experiences that will energize your group and create lasting memories.'
              : 'Bryt dig loss från traditionell teambuilding med dessa unika kustupplevelser som kommer att ge energi till din grupp och skapa bestående minnen.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Archipelago Safari' : 'Skärgårdssafari'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en'
                  ? 'Channel the spirit of the legendary Windzer brothers with an exhilarating RIB boat tour through the stunning Bohuslän archipelago. Feel the wind in your hair and the salt on your skin!'
                  : 'Kanalisera andan från de legendariska bröderna Windzer med en spännande RIB-båttur genom den vackra Bohusläns skärgård. Känn vinden i håret och saltet på huden!'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Coastal Cooking Challenge' : 'Matlagningsutmaning vid kusten'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en'
                  ? 'Divide into teams and compete to create the most delicious seafood dishes using local ingredients. Learn from expert chefs and enjoy the fruits of your labor together.'
                  : 'Dela upp er i lag och tävla om att skapa de mest utsökta havsrätterna med lokala ingredienser. Lär av expertkocker och njut av frukterna av ert arbete tillsammans.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2 text-blue-900">
                {locale === 'en' ? 'Historical Treasure Hunt' : 'Historisk skattjakt'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en'
                  ? 'Explore Mollösund\'s rich maritime history through an engaging treasure hunt. Solve clues, discover hidden spots, and learn about the village\'s fascinating past while building team spirit.'
                  : 'Utforska Mollösunds rika maritima historia genom en engagerande skattjakt. Lös ledtrådar, upptäck dolda platser och lär dig om byns fascinerande förflutna samtidigt som ni bygger laganda.'}
              </p>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.activities?.title || (locale === 'en' ? 'Activities' : 'Aktiviteter')}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {t.activities?.description || (locale === 'en'
              ? 'Complement your conference with one of our popular activities to strengthen team spirit and gain new perspectives.'
              : 'Komplettera er konferens med någon av våra populära aktiviteter för att stärka teamkänslan och få nya perspektiv.')}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {(t.activities?.options || [
              {
                title: locale === 'en' ? 'Archipelago Safari' : 'Skärgårdssafari',
                description: locale === 'en'
                  ? 'Experience the beautiful Bohuslän archipelago with a guided tour in a RIB boat. An experience that guarantees memories.'
                  : 'Upplev den vackra Bohusläns skärgård med en guidad tur i RIB-båt. En upplevelse som garanterat skapar minnen.'
              },
              {
                title: locale === 'en' ? 'Cooking Class' : 'Matlagningskurs',
                description: locale === 'en'
                  ? 'Learn to cook the delicacies of the sea with our chef. Finish with a shared dinner of your creations.'
                  : 'Lär er laga havets läckerheter tillsammans med vår kock. Avsluta med en gemensam middag av era kreationer.'
              },
              {
                title: locale === 'en' ? 'Guided Walk' : 'Guidad vandring',
                description: locale === 'en'
                  ? 'Discover Mollösund\'s history and charm with a guided walk through the picturesque fishing village.'
                  : 'Upptäck Mollösunds historia och charm med en guidad vandring genom den pittoreska fiskebyn.'
              }
            ]).map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-3">{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t.contact?.title || (locale === 'en' ? 'Book Your Conference' : 'Boka er konferens')}
          </h2>
          <p className="text-gray-700 mb-2">
            {locale === 'en' ? 'For more information and booking, contact us at ' : 'För mer information och bokning, kontakta oss på '}
            <a href={`mailto:${t.contact?.email || 'konferens@wards.se'}`} className="text-blue-600 hover:underline">
              {t.contact?.email || 'konferens@wards.se'}
            </a>
          </p>
          <p className="text-gray-700">
            {locale === 'en' ? 'Phone: ' : 'Telefon: '}
            <a href={`tel:${t.contact?.phone || '030421108'}`} className="text-blue-600 hover:underline">
              {t.contact?.phone || '0304-211 08'}
            </a>
          </p>
          <p className="text-gray-700 mt-2">
            {t.contact?.note || (locale === 'en'
              ? 'We are happy to tailor a package to your specific needs!'
              : 'Vi skräddarsyr gärna ett paket efter era önskemål!')}
          </p>
        </div>
      </div>
    </div>
  );
}
