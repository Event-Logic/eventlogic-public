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
    title: `Kontakt | Mollösunds Wärdshus`,
    description: "Kontakta Mollösunds Wärdshus för bokning, frågor eller information. Vi hjälper dig gärna med din vistelse eller ditt event.",
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.kontakt || {
    title: locale === 'en' ? 'Contact Us' : 'Kontakta oss',
    subtitle: locale === 'en' ? 'We\'ll help you with your booking or questions' : 'Vi hjälper dig med din bokning eller dina frågor',
    info: {
      title: locale === 'en' ? 'Contact Information' : 'Kontaktuppgifter',
      address: {
        label: locale === 'en' ? 'Address' : 'Adress',
        street: 'Kyrkvägen 9',
        postal: '474 70 Mollösund',
        country: locale === 'en' ? 'Sweden' : 'Sverige'
      },
      phone: {
        label: locale === 'en' ? 'Phone' : 'Telefon',
        number: '0304-211 08'
      },
      email: {
        label: locale === 'en' ? 'Email' : 'E-post',
        address: 'info@wards.se'
      },
      hours: {
        label: locale === 'en' ? 'Reception Hours' : 'Öppettider reception',
        weekdays: locale === 'en' ? 'Monday-Friday: 09:00-17:00' : 'Måndag-Fredag: 09:00-17:00',
        weekend: locale === 'en' ? 'Saturday-Sunday: 10:00-16:00' : 'Lördag-Söndag: 10:00-16:00',
        note: locale === 'en' ? 'Hours may vary depending on season' : 'Öppettider kan variera beroende på säsong'
      }
    },
    departments: {
      title: locale === 'en' ? 'Contact Us For' : 'Kontakta oss för',
      hotel: {
        title: locale === 'en' ? 'Hotel Booking' : 'Hotellbokning',
        description: locale === 'en' ? 'For questions about rooms and accommodation:' : 'För frågor om rum och boende:',
        email: 'hotell@wards.se',
        phone: '0304-211 08'
      },
      restaurant: {
        title: locale === 'en' ? 'Restaurant & Events' : 'Restaurang & Event',
        description: locale === 'en' ? 'For bookings and inquiries about private events:' : 'För bokningar och förfrågningar om privata evenemang:',
        email: 'restaurang@wards.se',
        phone: '0304-211 08'
      },
      conference: {
        title: locale === 'en' ? 'Conference' : 'Konferens',
        description: locale === 'en' ? 'For conference inquiries and group bookings:' : 'För konferensförfrågningar och gruppbokningar:',
        email: 'konferens@wards.se',
        phone: '0304-211 08'
      }
    },
    directions: {
      title: locale === 'en' ? 'Find Us' : 'Hitta hit',
      car: {
        title: locale === 'en' ? 'By Car' : 'Med bil',
        from: locale === 'en' ? 'From Gothenburg:' : 'Från Göteborg:',
        steps: locale === 'en' 
          ? [
              'Drive E6 north towards Oslo',
              'Take exit 96 towards Stenungsund/Tjörn/Orust',
              'Follow road 160 towards Orust',
              'Continue on road 160 to Tegneby',
              'Turn off towards Mollösund and follow the signs'
            ]
          : [
              'Kör E6 norrut mot Oslo',
              'Ta avfart 96 mot Stenungsund/Tjörn/Orust',
              'Följ väg 160 mot Orust',
              'Fortsätt på väg 160 till Tegneby',
              'Sväng av mot Mollösund och följ skyltarna'
            ],
        parking: locale === 'en' ? 'Parking is available near the inn.' : 'Parkering finns tillgänglig i närheten av värdshuset.'
      },
      public: {
        title: locale === 'en' ? 'By Public Transport' : 'Med kollektivtrafik',
        from: locale === 'en' ? 'From Gothenburg:' : 'Från Göteborg:',
        steps: locale === 'en'
          ? [
              'Take a train or bus to Stenungsund',
              'Change to a bus towards Orust',
              'Take bus 375 towards Mollösund',
              'Walk about 5 minutes from the bus stop to the inn'
            ]
          : [
              'Ta tåg eller buss till Stenungsund',
              'Byt till buss mot Orust',
              'Ta buss 375 mot Mollösund',
              'Gå cirka 5 minuter från busshållplatsen till värdshuset'
            ],
        note: locale === 'en' ? 'For current timetables, visit' : 'För aktuella tidtabeller, besök'
      }
    },
    faq: {
      title: locale === 'en' ? 'Frequently Asked Questions' : 'Vanliga frågor',
      questions: [
        {
          question: locale === 'en' ? 'What are the check-in and check-out times?' : 'Vilka tider är incheckning och utcheckning?',
          answer: locale === 'en' ? 'Check-in from 3:00 PM. Check-out by 11:00 AM.' : 'Incheckning från kl 15:00. Utcheckning senast kl 11:00.'
        },
        {
          question: locale === 'en' ? 'Is breakfast included in the room price?' : 'Är frukost inkluderad i rumspriset?',
          answer: locale === 'en' ? 'Yes, all room rates include breakfast.' : 'Ja, alla rumspriser inkluderar frukost.'
        },
        {
          question: locale === 'en' ? 'Is there parking available?' : 'Finns det parkering?',
          answer: locale === 'en' ? 'Yes, there is parking near the inn.' : 'Ja, det finns parkering i närheten av värdshuset.'
        },
        {
          question: locale === 'en' ? 'Are pets allowed?' : 'Är husdjur tillåtna?',
          answer: locale === 'en' 
            ? 'Yes, in certain rooms. Please inform us in advance if you plan to bring pets. An additional fee may apply.' 
            : 'Ja, i vissa rum. Vänligen meddela oss i förväg om du planerar att ta med husdjur. En extra avgift kan tillkomma.'
        }
      ]
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
        {/* Contact Information */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{t.info.title}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">{t.info.address.label}</p>
                    <p>{t.info.address.street}</p>
                    <p>{t.info.address.postal}</p>
                    <p>{t.info.address.country}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold">{t.info.phone.label}</p>
                    <p><a href={`tel:${t.info.phone.number}`} className="text-blue-600 hover:underline">{t.info.phone.number}</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold">{t.info.email.label}</p>
                    <p><a href={`mailto:${t.info.email.address}`} className="text-blue-600 hover:underline">{t.info.email.address}</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">{t.info.hours.label}</p>
                    <p>{t.info.hours.weekdays}</p>
                    <p>{t.info.hours.weekend}</p>
                    <p className="text-sm text-gray-600 mt-1">{t.info.hours.note}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">{locale === 'en' ? 'Follow Us' : 'Följ oss'}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-pink-600 hover:text-pink-800">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{t.departments.title}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.departments.hotel.title}</h3>
                  <p className="mb-2">{t.departments.hotel.description}</p>
                  <p><a href={`mailto:${t.departments.hotel.email}`} className="text-blue-600 hover:underline">{t.departments.hotel.email}</a></p>
                  <p><a href={`tel:${t.departments.hotel.phone}`} className="text-blue-600 hover:underline">{t.departments.hotel.phone}</a></p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.departments.restaurant.title}</h3>
                  <p className="mb-2">{t.departments.restaurant.description}</p>
                  <p><a href={`mailto:${t.departments.restaurant.email}`} className="text-blue-600 hover:underline">{t.departments.restaurant.email}</a></p>
                  <p><a href={`tel:${t.departments.restaurant.phone}`} className="text-blue-600 hover:underline">{t.departments.restaurant.phone}</a></p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t.departments.conference.title}</h3>
                  <p className="mb-2">{t.departments.conference.description}</p>
                  <p><a href={`mailto:${t.departments.conference.email}`} className="text-blue-600 hover:underline">{t.departments.conference.email}</a></p>
                  <p><a href={`tel:${t.departments.conference.phone}`} className="text-blue-600 hover:underline">{t.departments.conference.phone}</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.directions.title}</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="h-96 bg-gray-300 mb-6 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 font-semibold">Karta över Mollösund</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t.directions.car.title}</h3>
                <p className="mb-2">{t.directions.car.from}</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                  {t.directions.car.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <p className="mt-4">{t.directions.car.parking}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{t.directions.public.title}</h3>
                <p className="mb-2">{t.directions.public.from}</p>
                <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                  {t.directions.public.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <p className="mt-4">{t.directions.public.note} <a href="https://www.vasttrafik.se" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Västtrafik</a>.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.faq.title}</h2>
          
          <div className="space-y-4">
            {t.faq.questions.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
