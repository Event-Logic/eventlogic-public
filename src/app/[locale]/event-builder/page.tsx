import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "@/features/event-builder/data/translations";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmbeddedCalculator } from "@/features/event-builder/components/EmbeddedCalculator";

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
      ? 'Event Builder | Mollösunds Wärdshus'
      : 'Evenemangsbyggare | Mollösunds Wärdshus',
    description: locale === 'en'
      ? 'Create your custom event at Mollösunds Wärdshus and see potential savings compared to traditional venues.'
      : 'Skapa ditt anpassade evenemang på Mollösunds Wärdshus och se potentiella besparingar jämfört med traditionella anläggningar.',
  };
}

export default async function EventBuilderPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Dictionary will be used for future translations
  // const dict = await getDictionary(locale);
  const eventDict = await getEventBuilderDictionary(locale);

  // Event types with their descriptions and links
  const eventTypes = [
    {
      id: 'conference',
      title: eventDict.eventTypes.conference,
      description: locale === 'en'
        ? 'Create a custom conference experience with flexible spaces, catering options, and team-building activities.'
        : 'Skapa en anpassad konferensupplevelse med flexibla utrymmen, cateringalternativ och teambuilding-aktiviteter.',
      link: `/${locale}/event-builder/conference`,
      available: true,
    },
    {
      id: 'wedding',
      title: eventDict.eventTypes.wedding,
      description: locale === 'en'
        ? 'Design your dream wedding with our seaside venue, customizable spaces, and flexible catering options.'
        : 'Designa ditt drömbröllop med vår havsnära plats, anpassningsbara utrymmen och flexibla cateringalternativ.',
      link: `/${locale}/event-builder/wedding`,
      available: true,
    },
    {
      id: 'celebration',
      title: eventDict.eventTypes.celebration,
      description: locale === 'en'
        ? 'Plan your perfect celebration, from birthdays to anniversaries, with our customizable venue and services.'
        : 'Planera din perfekta fest, från födelsedagar till jubileer, med vår anpassningsbara plats och tjänster.',
      link: `/${locale}/event-builder/celebration`,
      available: true,
    },
    {
      id: 'retreat',
      title: eventDict.eventTypes.retreat,
      description: locale === 'en'
        ? 'Create a wellness retreat with our peaceful seaside location, comfortable accommodations, and flexible spaces.'
        : 'Skapa en wellness-retreat med vår fridfulla havsnära plats, bekvämt boende och flexibla utrymmen.',
      link: `/${locale}/event-builder/retreat`,
      available: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">
          {locale === 'en' ? 'Create Your DIY Event' : 'Skapa ditt DIY-evenemang'}
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          {locale === 'en'
            ? 'Use our interactive calculator to customize your event and see potential savings compared to traditional venues.'
            : 'Använd vår interaktiva kalkylator för att anpassa ditt evenemang och se potentiella besparingar jämfört med traditionella anläggningar.'}
        </p>
      </div>

      <div className="mb-12">
        <EmbeddedCalculator locale={locale} dictionary={eventDict} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {eventTypes.map((eventType) => (
          <Card
            key={eventType.id}
            className="shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle>{eventType.title}</CardTitle>
              <CardDescription>{eventType.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link
                href={eventType.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                {locale === 'en' ? 'Start Building' : 'Börja bygga'}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-blue-900">
          {locale === 'en' ? 'Your Saved Configurations' : 'Dina sparade konfigurationer'}
        </h3>
        <p className="text-gray-700 mb-6">
          {locale === 'en'
            ? 'View and manage your saved event configurations. You can also share them with others or submit them as a request for a quote.'
            : 'Visa och hantera dina sparade evenemangskonfigurationer. Du kan också dela dem med andra eller skicka in dem som en förfrågan om offert.'}
        </p>
        <Link
          href={`/${locale}/event-builder/cart`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          {locale === 'en' ? 'View Saved Configurations' : 'Visa sparade konfigurationer'}
        </Link>
      </div>
    </div>
  );
}
