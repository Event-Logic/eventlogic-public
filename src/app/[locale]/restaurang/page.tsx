import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: `Restaurang | Mollösunds Wärdshus`,
    description: "Välkommen till vår restaurang i Mollösund. Njut av lokala råvaror och havets läckerheter med utsikt över hamnen.",
  };
}

export default async function RestaurangPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.restaurang || {
    title: locale === 'en' ? 'Restaurant' : 'Wärds Restaurang',
    subtitle: locale === 'en' ? 'Welcome to our restaurant in Mollösund' : 'Välkommen till vår restaurang i Mollösund',
    status: locale === 'en' ? 'The restaurant is closed for the season' : 'Restaurangen är stängd för säsongen',
    note: locale === 'en' ? 'We can help you realize your dream event!' : 'Vi hjälper dig att förverkliga just din drömfest!',
    about: {
      title: locale === 'en' ? 'About Our Restaurant' : 'Om vår restaurang',
      description1: locale === 'en'
        ? 'At Wärds Restaurant in Mollösund, we offer a culinary experience focusing on local ingredients and seafood delicacies. Our menu varies with the seasons to always offer the freshest ingredients.'
        : 'På Wärds Restaurang i Mollösund erbjuder vi en kulinarisk upplevelse med fokus på lokala råvaror och havets läckerheter. Vår meny varierar efter säsong för att alltid kunna erbjuda de färskaste ingredienserna.',
      description2: locale === 'en'
        ? 'With a view of Mollösund\'s charming harbor, you can enjoy good food and drinks in a relaxed and historic environment. Our kitchen combines traditional flavors with modern influences to create a unique dining experience.'
        : 'Med utsikt över Mollösunds charmiga hamn kan du njuta av god mat och dryck i en avslappnad och historisk miljö. Vårt kök kombinerar traditionella smaker med moderna influenser för att skapa en unik matupplevelse.'
    },
    events: {
      title: locale === 'en' ? 'Private Events' : 'Privata evenemang',
      description: locale === 'en'
        ? 'Even though our restaurant is closed for the season, we offer the possibility to book the entire restaurant for private events and parties.'
        : 'Även om vår restaurang är stängd för säsongen, erbjuder vi möjligheten att boka hela restaurangen för privata evenemang och fester.',
      options: [
        {
          title: locale === 'en' ? 'Birthdays' : 'Födelsedagar',
          description: locale === 'en'
            ? 'Celebrate your special day with family and friends in our beautiful restaurant.'
            : 'Fira din speciella dag med familj och vänner i vår vackra restaurang.'
        },
        {
          title: locale === 'en' ? 'Weddings' : 'Bröllop',
          description: locale === 'en'
            ? 'Create unforgettable memories on your big day with the sea as a backdrop.'
            : 'Skapa oförglömliga minnen på er stora dag med havet som bakgrund.'
        },
        {
          title: locale === 'en' ? 'Corporate Events' : 'Företagsevent',
          description: locale === 'en'
            ? 'Impress your clients or reward your employees with an exclusive dinner.'
            : 'Imponera på dina kunder eller belöna dina anställda med en exklusiv middag.'
        }
      ],
      note: locale === 'en'
        ? 'Contact us to discuss your wishes and get a tailored proposal.'
        : 'Kontakta oss för att diskutera dina önskemål och få ett skräddarsytt förslag.'
    },
    menu: {
      title: locale === 'en' ? 'Sample Menu' : 'Exempel på meny',
      description: locale === 'en'
        ? 'Our menu varies with the seasons, but here are some examples of dishes we offer:'
        : 'Vår meny varierar efter säsong, men här är några exempel på rätter vi erbjuder:',
      starters: {
        title: locale === 'en' ? 'Starters' : 'Förrätter',
        items: [
          {
            name: locale === 'en' ? 'Shrimp Toast' : 'Skagentoast',
            description: locale === 'en'
              ? 'Hand-peeled shrimp, mayonnaise, dill, lemon on homemade bread'
              : 'Handskalade räkor, majonnäs, dill, citron på hembakat bröd'
          },
          {
            name: locale === 'en' ? 'Bleak Roe with Accompaniments' : 'Löjrom med tillbehör',
            description: locale === 'en'
              ? 'Served with red onion, crème fraîche, and homemade flatbread'
              : 'Serveras med rödlök, crème fraîche och hembakat tunnbröd'
          },
          {
            name: locale === 'en' ? 'Blackened Salmon' : 'Sotad lax',
            description: locale === 'en'
              ? 'With dill mayonnaise, pickled cucumber, and trout roe'
              : 'Med dillmajonnäs, picklad gurka och forellrom'
          }
        ]
      },
      mains: {
        title: locale === 'en' ? 'Main Courses' : 'Huvudrätter',
        items: [
          {
            name: locale === 'en' ? 'Catch of the Day' : 'Dagens fångst',
            description: locale === 'en'
              ? 'Served with seasonal vegetables and butter sauce'
              : 'Serveras med säsongens primörer och smörsås'
          },
          {
            name: locale === 'en' ? 'Lobster Soup' : 'Hummersoppa',
            description: locale === 'en'
              ? 'With hand-peeled shrimp and aioli'
              : 'Med handskalade räkor och aioli'
          },
          {
            name: locale === 'en' ? 'Grilled Beef Tenderloin' : 'Grillad oxfilé',
            description: locale === 'en'
              ? 'With potato gratin, red wine sauce, and seasonal vegetables'
              : 'Med potatisgratäng, rödvinssås och säsongens grönsaker'
          }
        ]
      },
      desserts: {
        title: locale === 'en' ? 'Desserts' : 'Desserter',
        items: [
          {
            name: locale === 'en' ? 'Crème Brûlée' : 'Crème brûlée',
            description: locale === 'en'
              ? 'With seasonal berries'
              : 'Med säsongens bär'
          },
          {
            name: locale === 'en' ? 'Chocolate Fondant' : 'Chokladfondant',
            description: locale === 'en'
              ? 'With vanilla ice cream and raspberry coulis'
              : 'Med vaniljglass och halloncoulis'
          },
          {
            name: locale === 'en' ? 'Cheese Platter' : 'Ostbricka',
            description: locale === 'en'
              ? 'Selected cheeses with marmalade and crackers'
              : 'Utvalda ostar med marmelad och kex'
          }
        ]
      }
    },
    contact: {
      title: locale === 'en' ? 'Book Your Event With Us' : 'Boka ditt event hos oss',
      email: 'restaurang@wards.se',
      phone: '0304-211 08',
      note: locale === 'en'
        ? 'We help you realize your dream party!'
        : 'Vi hjälper dig att förverkliga just din drömfest!'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            {t.status}
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
            {t.note}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/${locale === 'en' ? 'contact' : 'kontakt'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {locale === 'en' ? 'Contact Us' : 'Kontakta oss'}
            </Link>
          </div>
        </div>

        {/* About Our Restaurant */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.about.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                {t.about.description1}
              </p>
              <p className="text-lg leading-relaxed">
                {t.about.description2}
              </p>
            </div>
            <div className="relative h-80 md:h-96 bg-gradient-to-b from-blue-800 to-blue-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-xl font-semibold">
                {locale === 'en' ? 'Mollösund Restaurant' : 'Restaurang Mollösund'}
              </p>
            </div>
          </div>
        </div>

        {/* Private Events */}
        <div className="mb-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {t.events.title}
          </h2>
          <p className="text-lg text-center mb-8">
            {t.events.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {t.events.options.map((option, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {index === 0 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    )}
                    {index === 1 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    )}
                    {index === 2 && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p>{option.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-semibold">
              {t.events.note}
            </p>
          </div>
        </div>

        {/* Sample Menu */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.menu.title}
          </h2>
          <p className="text-center text-lg mb-8 max-w-4xl mx-auto">
            {t.menu.description}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">{t.menu.starters.title}</h3>
              <ul className="space-y-4">
                {t.menu.starters.items.map((item, index) => (
                  <li key={index}>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">{t.menu.mains.title}</h3>
              <ul className="space-y-4">
                {t.menu.mains.items.map((item, index) => (
                  <li key={index}>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">{t.menu.desserts.title}</h3>
              <ul className="space-y-4">
                {t.menu.desserts.items.map((item, index) => (
                  <li key={index}>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-gray-700 mb-2">
            {locale === 'en' ? 'For more information and booking, contact us at ' : 'För mer information och bokning, kontakta oss på '}
            <a href={`mailto:${t.contact.email}`} className="text-blue-600 hover:underline">{t.contact.email}</a>
          </p>
          <p className="text-gray-700">
            {locale === 'en' ? 'Phone: ' : 'Telefon: '}
            <a href={`tel:${t.contact.phone}`} className="text-blue-600 hover:underline">{t.contact.phone}</a>
          </p>
          <p className="text-gray-700 mt-2">{t.contact.note}</p>
        </div>
      </div>
    </div>
  );
}
