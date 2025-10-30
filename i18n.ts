import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define the supported locales
export const locales = ['en', 'sv'];
export const defaultLocale = 'en';

// Define the routing configuration
export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    // Legacy hotel paths (can be removed if not needed)
    '/rum': {
      en: '/rum',
      sv: '/rum',
    },
    '/rooms': {
      en: '/rooms',
      sv: '/rum',
    },
    '/restaurang': {
      en: '/restaurang',
      sv: '/restaurang',
    },
    '/restaurant': {
      en: '/restaurant',
      sv: '/restaurang',
    },
    '/konferens': {
      en: '/konferens',
      sv: '/konferens',
    },
    '/conference': {
      en: '/conference',
      sv: '/konferens',
    },
    '/brollop': {
      en: '/brollop',
      sv: '/brollop',
    },
    '/weddings': {
      en: '/weddings',
      sv: '/brollop',
    },
    '/fester': {
      en: '/fester',
      sv: '/fester',
    },
    '/celebrations': {
      en: '/celebrations',
      sv: '/fester',
    },
    '/retreats': {
      en: '/retreats',
      sv: '/retreats',
    },
    // Event Logic main pages
    '/about': {
      en: '/about',
      sv: '/om-oss',
    },
    '/om-oss': {
      en: '/about',
      sv: '/om-oss',
    },
    '/buyers': {
      en: '/buyers',
      sv: '/kopare',
    },
    '/kopare': {
      en: '/buyers',
      sv: '/kopare',
    },
    '/suppliers': {
      en: '/suppliers',
      sv: '/leverantorer',
    },
    '/leverantorer': {
      en: '/suppliers',
      sv: '/leverantorer',
    },
    '/meeting-planners': {
      en: '/meeting-planners',
      sv: '/motesplanerare',
    },
    '/motesplanerare': {
      en: '/meeting-planners',
      sv: '/motesplanerare',
    },
    '/travel-agencies': {
      en: '/travel-agencies',
      sv: '/resebyraer',
    },
    '/resebyraer': {
      en: '/travel-agencies',
      sv: '/resebyraer',
    },
    '/demo': {
      en: '/demo',
      sv: '/demo',
    },
    '/login': {
      en: '/login',
      sv: '/logga-in',
    },
    '/logga-in': {
      en: '/login',
      sv: '/logga-in',
    },
    '/register': {
      en: '/register',
      sv: '/registrera',
    },
    '/registrera': {
      en: '/register',
      sv: '/registrera',
    },
    '/pricing': {
      en: '/pricing',
      sv: '/priser',
    },
    '/priser': {
      en: '/pricing',
      sv: '/priser',
    },
    '/kontakt': {
      en: '/contact',
      sv: '/kontakt',
    },
    '/contact': {
      en: '/contact',
      sv: '/kontakt',
    },
    // Feature pages
    '/event-coach': '/event-coach',
    '/communication': {
      en: '/communication',
      sv: '/kommunikation',
    },
    '/kommunikation': {
      en: '/communication', 
      sv: '/kommunikation',
    },
    '/compare-offers': {
      en: '/compare-offers',
      sv: '/jamfor-offerter',
    },
    '/jamfor-offerter': {
      en: '/compare-offers',
      sv: '/jamfor-offerter',
    },
    '/find-suppliers': {
      en: '/find-suppliers',
      sv: '/hitta-leverantorer',
    },
    '/hitta-leverantorer': {
      en: '/find-suppliers',
      sv: '/hitta-leverantorer',
    },
    '/participant-management': {
      en: '/participant-management',
      sv: '/deltagarhantering',
    },
    '/deltagarhantering': {
      en: '/participant-management',
      sv: '/deltagarhantering',
    },
    '/reports': {
      en: '/reports',
      sv: '/rapporter',
    },
    '/rapporter': {
      en: '/reports',
      sv: '/rapporter',
    },
    '/schedule': {
      en: '/schedule',
      sv: '/schema',
    },
    '/schema': {
      en: '/schedule',
      sv: '/schema',
    },
    '/strategic-meeting': {
      en: '/strategic-meeting',
      sv: '/strategiska-moten',
    },
    '/strategiska-moten': {
      en: '/strategic-meeting',
      sv: '/strategiska-moten',
    },
    '/strategic-meeting-management': {
      en: '/strategic-meeting-management',
      sv: '/strategisk-moteshantering',
    },
    '/strategisk-moteshantering': {
      en: '/strategic-meeting-management',
      sv: '/strategisk-moteshantering',
    },
    '/negotiate-book': {
      en: '/negotiate-book',
      sv: '/forhandla-boka',
    },
    '/forhandla-boka': {
      en: '/negotiate-book',
      sv: '/forhandla-boka',
    },
    '/collective-invoice': {
      en: '/collective-invoice',
      sv: '/samlingsfaktura',
    },
    '/samlingsfaktura': {
      en: '/collective-invoice',
      sv: '/samlingsfaktura',
    },
    '/design-invitation': {
      en: '/design-invitation',
      sv: '/designa-inbjudan',
    },
    '/designa-inbjudan': {
      en: '/design-invitation',
      sv: '/designa-inbjudan',
    },
    '/name-badges': {
      en: '/name-badges',
      sv: '/namnskyltar',
    },
    '/namnskyltar': {
      en: '/name-badges',
      sv: '/namnskyltar',
    },
    '/event-templates': {
      en: '/event-templates',
      sv: '/eventmallar',
    },
    '/eventmallar': {
      en: '/event-templates',
      sv: '/eventmallar',
    },
    '/express-booking': {
      en: '/express-booking',
      sv: '/expressbokning',
    },
    '/expressbokning': {
      en: '/express-booking',
      sv: '/expressbokning',
    },
    '/booking': '/booking',
    '/decision-making': {
      en: '/decision-making',
      sv: '/forenkla-beslutsprocessen',
    },
    '/forenkla-beslutsprocessen': {
      en: '/decision-making',
      sv: '/forenkla-beslutsprocessen',
    },
    // About subpages
    '/about/career': {
      en: '/about/career',
      sv: '/om-oss/karriar',
    },
    '/om-oss/karriar': {
      en: '/about/career',
      sv: '/om-oss/karriar',
    },
    '/about/data-protection': {
      en: '/about/data-protection',
      sv: '/om-oss/dataskydd',
    },
    '/om-oss/dataskydd': {
      en: '/about/data-protection',
      sv: '/om-oss/dataskydd',
    },
  }
});

// Export navigation utilities
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

// This is the default config for next-intl
export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a string (not undefined)
  const safeLocale = locale || defaultLocale;

  // Load all message files for the locale
  const [
    common, home, about, buyers, suppliers, contact, demo, login, register,
    meetingPlanners, travelAgencies, eventCoach, pricing, communication,
    compareOffers, findSuppliers, participantManagement, reports, schedule,
    strategicMeeting, strategicMeetingManagement, career, dataProtection,
    negotiateBook, collectiveInvoice, designInvitation, nameBadges, eventTemplates,
    decisionMaking, expressBooking
  ] = await Promise.all([
    import(`./messages/${safeLocale}/common.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/home.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/about.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/buyers.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/suppliers.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/contact.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/demo.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/login.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/register.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/meeting-planners.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/travel-agencies.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/event-coach.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/pricing.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/communication.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/compare-offers.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/find-suppliers.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/participant-management.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/reports.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/schedule.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/strategic-meeting.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/strategic-meeting-management.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/career.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/data-protection.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/negotiate-book.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/collective-invoice.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/design-invitation.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/name-badges.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/event-templates.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/decision-making.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/express-booking.json`).then(module => module.default).catch(() => ({}))
  ]);

  // Merge all message files into namespaced structure
  const messages = {
    ...common,
    home,
    about,
    buyers,
    suppliers,
    contact,
    demo,
    login,
    register,
    'meeting-planners': meetingPlanners,
    'travel-agencies': travelAgencies,
    'event-coach': eventCoach,
    pricing,
    communication,
    'compare-offers': compareOffers,
    'find-suppliers': findSuppliers,
    'participant-management': participantManagement,
    reports,
    schedule,
    'strategic-meeting': strategicMeeting,
    'strategic-meeting-management': strategicMeetingManagement,
    career,
    'data-protection': dataProtection,
    'negotiate-book': negotiateBook,
    'collective-invoice': collectiveInvoice,
    'design-invitation': designInvitation,
    'name-badges': nameBadges,
    'event-templates': eventTemplates,
    'decision-making': decisionMaking,
    'express-booking': expressBooking
  };

  return {
    messages,
    locale: safeLocale
  };
});
