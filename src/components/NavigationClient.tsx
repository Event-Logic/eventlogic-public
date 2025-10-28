"use client";

import Link from "next/link";
import { Locale } from "../dictionaries";
import { CartIcon } from "./CartIcon";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import { useTranslations } from "next-intl";

type NavigationProps = {
  lang: Locale;
};

export default function NavigationClient({ lang }: NavigationProps) {
  const nav = useTranslations('navigation');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900 dark:bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex items-center">
              <img
                src="/images/el/app-logo.svg"
                alt="Event Logic"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link href={`/${lang}`} className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300">
              {nav('home')}
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {nav('solutions')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[600px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Meeting Planners */}
                    <Link href={lang === 'en' ? '/en/meeting-planners' : '/sv/motesplanerare'} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/meeting-planner.svg" alt="Meeting Planners" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{nav('meeting_planners')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{nav('meeting_planners_desc')}</p>
                      </div>
                    </Link>

                    {/* Buyers */}
                    <Link href={lang === 'en' ? '/en/buyers' : '/sv/kopare'} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/buyers.svg" alt="Buyers" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{nav('buyers')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{nav('buyers_desc')}</p>
                      </div>
                    </Link>

                    {/* Travel Agencies */}
                    <Link href={lang === 'en' ? '/en/travel-agencies' : '/sv/resebyraer'} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/travel-agency.svg" alt="Travel Agencies" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{nav('travel_agencies')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{nav('travel_agencies_desc')}</p>
                      </div>
                    </Link>

                    {/* Suppliers */}
                    <Link href={lang === 'en' ? '/en/suppliers' : '/sv/leverantorer'} className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="mt-1">
                        <img src="/images/el/header-icon/suppliers.svg" alt="Suppliers" className="w-8 h-8 menu-icon" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">{nav('suppliers')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{nav('suppliers_desc')}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {nav('features')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-[800px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Event Management */}
                    <div>
                      <h3 className="text-lg font-bold text-purple-900 mb-4">{nav('event_management')}</h3>
                      <div className="space-y-3">
                        <Link href={lang === 'en' ? `/en/express-booking` : `/sv/expressbokning`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/express-booking.svg" alt="Express Booking" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('express_booking')}</h4>
                            <p className="text-xs text-gray-600">{nav('express_booking_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/find-suppliers` : `/sv/hitta-leverantorer`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/find-suppliers.svg" alt="Find Suppliers" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('find_suppliers')}</h4>
                            <p className="text-xs text-gray-600">{nav('find_suppliers_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/compare-offers` : `/sv/jamfor-offerter`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/compare.svg" alt="Compare Offers" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('compare_offers')}</h4>
                            <p className="text-xs text-gray-600">{nav('compare_offers_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/negotiate-book` : `/sv/forhandla-boka`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/negotiate.svg" alt="Negotiate & Book" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('negotiate_book')}</h4>
                            <p className="text-xs text-gray-600">{nav('negotiate_book_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/schedule` : `/sv/schema`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/schedule.svg" alt="Schedule" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('schedule')}</h4>
                            <p className="text-xs text-gray-600">{nav('schedule_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/collective-invoice` : `/sv/samlingsfaktura`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/invoice.svg" alt="Collective Invoice" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('collective_invoice')}</h4>
                            <p className="text-xs text-gray-600">{nav('collective_invoice_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/reports` : `/sv/rapporter`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/reports.svg" alt="Reports" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('reports')}</h4>
                            <p className="text-xs text-gray-600">{nav('reports_desc')}</p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Participant Management */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="/images/el/header-icon/participant.svg" alt="Participant Management" className="w-6 h-6 menu-icon" />
                        <h3 className="text-lg font-bold text-purple-900">{nav('participant_management_title')}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{nav('participant_management_subtitle')}</p>

                      <div className="space-y-3">
                        <Link href={`/${lang}/designa-inbjudan`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/design.svg" alt="Design Invitation" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('design_invitation')}</h4>
                            <p className="text-xs text-gray-600">{nav('design_invitation_desc')}</p>
                          </div>
                        </Link>

                        <Link href={lang === 'en' ? `/en/participant-management` : `/sv/deltagarhantering`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/registration.svg" alt="Send Invitations" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('send_invitations')}</h4>
                            <p className="text-xs text-gray-600">{nav('send_invitations_desc')}</p>
                          </div>
                        </Link>

                        <Link href={lang === 'en' ? `/en/participant-management` : `/sv/deltagarhantering`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/follow-up.svg" alt="Registration" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('registration_checkin')}</h4>
                            <p className="text-xs text-gray-600">{nav('registration_checkin_desc')}</p>
                          </div>
                        </Link>

                        <Link href={lang === 'en' ? `/en/name-badges` : `/sv/namnskyltar`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/name-badge.svg" alt="Name Badges" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('name_badges')}</h4>
                            <p className="text-xs text-gray-600">{nav('name_badges_desc')}</p>
                          </div>
                        </Link>

                        <Link href={lang === 'en' ? `/en/participant-management` : `/sv/deltagarhantering`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/communicate.svg" alt="Communicate" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('communicate')}</h4>
                            <p className="text-xs text-gray-600">{nav('communicate_desc')}</p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Additional Features */}
                    <div>
                      <h3 className="text-lg font-bold text-purple-900 mb-4">{nav('more_features')}</h3>
                      <div className="space-y-3">
                        <Link href={lang === 'en' ? `/en/event-templates` : `/sv/eventmallar`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/templates.svg" alt="Event Templates" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('event_templates')}</h4>
                            <p className="text-xs text-gray-600">{nav('event_templates_desc')}</p>
                          </div>
                        </Link>
                        <Link href={`/${lang}/event-coach`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/event-coach.svg" alt="Event Coach" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('event_coach')}</h4>
                            <p className="text-xs text-gray-600">{nav('event_coach_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/strategic-meeting-management` : `/sv/strategisk-moteshantering`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/strategic.svg" alt="Strategic Meeting Management" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('strategic_meeting_management')}</h4>
                            <p className="text-xs text-gray-600">{nav('strategic_meeting_management_desc')}</p>
                          </div>
                        </Link>
                        <Link href={lang === 'en' ? `/en/communication` : `/sv/kommunikation`} className="flex items-start gap-2 group/item">
                          <div className="mt-1">
                            <img src="/images/el/header-icon/communication.svg" alt="Communication" className="w-5 h-5 menu-icon" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">{nav('communication')}</h4>
                            <p className="text-xs text-gray-600">{nav('communication_desc')}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
                {nav('about')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                  <Link href={lang === 'en' ? '/en/about' : '/sv/om-oss'} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                    {nav('about_us')}
                  </Link>
                  <Link href={lang === 'en' ? '/en/about/data-protection' : '/sv/om-oss/dataskydd'} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                    {nav('data_protection')}
                  </Link>
                  <Link href={lang === 'en' ? '/en/about/career' : '/sv/om-oss/karriar'} className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                    {nav('career')}
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href={lang === 'en' ? '/en/pricing' : '/sv/priser'}
              className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300"
            >
              {nav('pricing')}
            </Link>

            <Link
              href={lang === 'en' ? '/en/contact' : '/sv/kontakt'}
              className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300"
            >
              {nav('contact')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Language switcher - client component for dynamic path translation */}
            <LanguageSwitcher currentLang={lang} />

            <Link
              href={lang === 'en' ? '/en/login' : '/sv/logga-in'}
              className="text-white hover:text-gray-300 transition-colors dark:text-white dark:hover:text-gray-300"
            >
              {nav('login')}
            </Link>

            <Link
              href={`/${lang}/demo`}
              className="bg-white text-purple-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors dark:bg-black dark:text-purple-200 dark:hover:bg-gray-900"
            >
              {nav('demo')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}