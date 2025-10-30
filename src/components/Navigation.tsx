import Link from "next/link";
import { Locale } from "../dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";

type NavigationProps = {
  lang: Locale; // Keep as lang to maintain compatibility with existing code
  dictionary: {
    navigation: {
      home: string;
      solutions: string;
      features: string;
      about: string;
      resources: string;
      pricing: string;
      contact: string;
      login: string;
      demo: string;
      register: string;
      meeting_planners: string;
      meeting_planners_desc: string;
      buyers: string;
      buyers_desc: string;
      travel_agencies: string;
      travel_agencies_desc: string;
      suppliers: string;
      suppliers_desc: string;
      express_booking: string;
      reports: string;
      reports_desc: string;
      event_coach: string;
      event_coach_desc: string;
      strategic_meeting_management: string;
      strategic_meeting_management_desc: string;
    };
  };
};

export default function Navigation({ lang, dictionary }: NavigationProps) {
  const { navigation } = dictionary;

  // Define the alternate language - will be used in future updates
  // const alternateLanguage: Locale = lang === "en" ? "sv" : "en";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900 dark:bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex items-center">
              <img
                src="/images/el/app-logo.svg"
                alt="Event Logic"
                className="h-10 w-auto mr-2"
              />
              <span className="font-bold text-xl text-white">Event Logic</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link href={`/${lang}`} className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300">
              {navigation.home}
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {navigation.solutions}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[600px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Meeting Planners */}
                    <Link href={`/${lang}/meeting-planners`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/meeting-planner.svg" alt="Meeting Planners" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{navigation.meeting_planners}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{navigation.meeting_planners_desc}</p>
                      </div>
                    </Link>

                    {/* Buyers */}
                    <Link href={`/${lang}/${lang === 'sv' ? 'kopare' : 'buyers'}`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/buyers.svg" alt="Buyers" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{navigation.buyers}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{navigation.buyers_desc}</p>
                      </div>
                    </Link>

                    {/* Travel Agencies */}
                    <Link href={`/${lang}/travel-agencies`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/business-travel-agencies.svg" alt="Travel Agencies" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{navigation.travel_agencies}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{navigation.travel_agencies_desc}</p>
                      </div>
                    </Link>

                    {/* Suppliers */}
                    <Link href={`/${lang}/suppliers`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/suppliers.svg" alt="Suppliers" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{navigation.suppliers}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{navigation.suppliers_desc}</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-gray-50 dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 text-center">
                  <Link href={`/${lang}/express-booking`} className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800">
                    <span>{navigation.express_booking}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Features Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {navigation.features}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[800px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-2">
                  {/* Left Column - Eventhantering (Event Management) */}
                  <div className="p-6 border-r border-gray-200">
                    <div className="flex items-center mb-4">
                      <img src="/images/el/header-icon/management.svg" alt="Event Management" className="w-6 h-6 mr-2 menu-icon" />
                      <h3 className="text-lg font-bold text-purple-900">{lang === 'en' ? 'Event Management' : 'Eventhantering'}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{lang === 'en' ? 'Event Logic helps you manage all aspects of your events' : 'Event Logic hjälper dig att hantera alla aspekter av dina event'}</p>

                    <div className="space-y-3">
                      <Link href={`/${lang}/find-suppliers`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/search.svg" alt="Find Suppliers" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Find Suppliers' : 'Upphandla leverantörer'}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{lang === 'en' ? 'Search and find the best suppliers for your events' : 'Sök bland tusentals leverantörer'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/compare-offers`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/compare.svg" alt="Compare Offers" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Compare Offers' : 'Jämför offerter'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Compare offers from different suppliers' : 'Jämför offerter från olika leverantörer'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/booking`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/book.svg" alt="Negotiate and Book" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Negotiate and Book' : 'Förhandla och boka'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Negotiate and book with your preferred suppliers' : 'Förhandla och boka med dina leverantörer'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/schedule`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/schedule.svg" alt="Create Schedule" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Create Schedule' : 'Skapa körschema'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Create detailed schedules for your events' : 'Skapa detaljerade körscheman för dina event'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/${lang === 'sv' ? 'forenkla-beslutsprocessen' : 'decision-making'}`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/compare.svg" alt="Decision Making" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Decision Making' : 'Förenkla beslutsprocessen'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Make well-informed decisions easily' : 'Ta välgrundade beslut enkelt'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/reports`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/reporting.svg" alt="Reports & Statistics" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{navigation.reports}</h4>
                          <p className="text-xs text-gray-600">{navigation.reports_desc}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/collective-invoice`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/invoice.svg" alt="Collective Invoice" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Collective Invoice' : 'Samlingsfaktura'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Consolidate all event expenses in one invoice' : 'Samla alla eventkostnader i en faktura'}</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column - Deltagarhantering (Participant Management) */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img src="/images/el/header-icon/guest-management.svg" alt="Participant Management" className="w-6 h-6 mr-2 menu-icon" />
                      <h3 className="text-lg font-bold text-purple-900">{lang === 'en' ? 'Participant Management' : 'Deltagarhantering'}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{lang === 'en' ? 'Manage invitations, registrations and communication' : 'Hantera inbjudningar, anmälningar och kommunikation'}</p>

                    <div className="space-y-3">
                      <Link href={`/${lang}/designa-inbjudan`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/design.svg" alt="Design Invitation" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Design Invitation' : 'Designa inbjudan'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Create beautiful, branded invitations' : 'Skapa vackra, profilerade inbjudningar'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/participant-management`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/registration.svg" alt="Send Invitations" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Send Invitations' : 'Skicka inbjudningar'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Send invitations and track responses' : 'Skicka inbjudningar och spåra svar'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/participant-management`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/registration.svg" alt="Registration" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Registration' : 'Anmälan'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Create custom registration forms' : 'Skapa anpassade anmälningsformulär'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/participant-management`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/website.svg" alt="Event Page" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Event Page' : 'Eventstida'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Create a custom event page for participants' : 'Skapa en anpassad eventstida för deltagare'}</p>
                        </div>
                      </Link>

                      <Link href={`/${lang}/name-badges`} className="flex items-start gap-2 group/item">
                        <div className="mt-1">
                          <img src="/images/el/header-icon/badges.svg" alt="Name Badges" className="w-5 h-5 menu-icon" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{lang === 'en' ? 'Name Badges' : 'Namnbrickor'}</h4>
                          <p className="text-xs text-gray-600">{lang === 'en' ? 'Create professional name badges and credentials' : 'Skapa professionella namnbrickor och legitimationer'}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Additional Features */}
                <div className="grid grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-800">
                  <Link href={`/${lang}/event-templates`} className="flex items-start gap-2 group/item">
                    <div className="mt-1">
                      <img src="/images/el/header-icon/template.svg" alt="Event Templates" className="w-5 h-5 menu-icon" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{lang === 'en' ? 'Event Templates' : 'Eventmallar'}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{lang === 'en' ? 'Professional templates for all event types' : 'Professionella mallar för alla eventtyper'}</p>
                    </div>
                  </Link>

                  <Link href={`/${lang}/event-coach`} className="flex items-start gap-2 group/item">
                    <div className="mt-1">
                      <img src="/images/el/header-icon/coach.svg" alt="Event Coach" className="w-5 h-5 menu-icon" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{navigation.event_coach}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{navigation.event_coach_desc}</p>
                    </div>
                  </Link>

                  <Link href={`/${lang}/strategic-meeting-management`} className="flex items-start gap-2 group/item">
                    <div className="mt-1">
                      <img src="/images/el/header-icon/strategy-meeting.svg" alt="Strategic Meeting Management" className="w-5 h-5 menu-icon" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{navigation.strategic_meeting_management}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{navigation.strategic_meeting_management_desc}</p>
                    </div>
                  </Link>

                  <Link href={`/${lang}/communication`} className="flex items-start gap-2 group/item">
                    <div className="mt-1">
                      <img src="/images/el/header-icon/communicate.svg" alt="Communication" className="w-5 h-5 menu-icon" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{lang === 'en' ? 'Communication' : 'Kommunicera'}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{lang === 'en' ? 'Communicate with participants and suppliers' : 'Kommunicera med deltagare och leverantörer'}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {navigation.about}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[400px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="space-y-4">
                    <Link href={`/${lang}/about`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1 flex-shrink-0">
                        <img src="/images/el/header-icon/about.svg" alt="About Us & Contact" className="w-8 h-8 menu-icon" style={{width: '32px', height: '32px'}} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{lang === 'en' ? 'About Us & Contact' : 'Om oss & kontakt'}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'en' ? 'Learn more about Event Logic and how to contact us' : 'Läs mer om Event Logic och hur du kontaktar oss'}</p>
                      </div>
                    </Link>

                    <Link href={`/${lang}/about/data-protection`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1 flex-shrink-0">
                        <img src="/images/el/header-icon/security.svg" alt="Data Protection Policy" className="w-8 h-8 menu-icon" style={{width: '32px', height: '32px'}} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{lang === 'en' ? 'Data Protection Policy' : 'Dataskyddspolicy'}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'en' ? 'Our commitment to protecting your data' : 'Vårt åtagande att skydda dina uppgifter'}</p>
                      </div>
                    </Link>

                    <Link href={`/${lang}/about/career`} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1 flex-shrink-0">
                        <img src="/images/el/header-icon/career.svg" alt="Career" className="w-8 h-8 menu-icon" style={{width: '32px', height: '32px'}} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{lang === 'en' ? 'Career' : 'Karriär'}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lang === 'en' ? 'Join our team at Event Logic' : 'Bli en del av vårt team på Event Logic'}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={`/${lang}/pricing`}
              className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300"
            >
              {navigation.pricing}
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {lang === 'en' ? 'Resources' : 'Resurser'}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[300px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="space-y-4">
                    <a
                      href="https://support.eventlogic.se/hc/sv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="mt-1">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">
                          {lang === 'en' ? 'Knowledge Base' : 'Kunskapsbank'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {lang === 'en' ? 'Help articles and documentation' : 'Hjälpartiklar och dokumentation'}
                        </p>
                      </div>
                    </a>

                    <a
                      href="https://blog.eventlogic.se/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="mt-1">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">
                          {lang === 'en' ? 'Blog' : 'Nyheter'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {lang === 'en' ? 'Latest news and updates' : 'Senaste nyheter och uppdateringar'}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={`/${lang}/${lang === 'sv' ? 'kontakt' : 'contact'}`}
              className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300"
            >
              {navigation.contact}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Language switcher - client component for dynamic path translation */}
            <LanguageSwitcher currentLang={lang} />

            <Link
              href={`/${lang}/login`}
              className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300"
            >
              {navigation.login}
            </Link>

            <Link
              href={`/${lang}/demo`}
              className="bg-white text-purple-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors dark:bg-black dark:text-purple-200 dark:hover:bg-gray-900"
            >
              {navigation.demo}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
