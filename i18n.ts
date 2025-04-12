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
    '/kontakt': {
      en: '/kontakt',
      sv: '/kontakt',
    },
    '/contact': {
      en: '/contact',
      sv: '/kontakt',
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
  }
});

// Export navigation utilities
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

// This is the default config for next-intl
export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a string (not undefined)
  const safeLocale = locale || defaultLocale;

  // Load all message files for the locale
  const [common, rooms, restaurant, weddings, conference] = await Promise.all([
    import(`./messages/${safeLocale}/common.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/rooms.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/restaurant.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/weddings.json`).then(module => module.default).catch(() => ({})),
    import(`./messages/${safeLocale}/conference.json`).then(module => module.default).catch(() => ({}))
  ]);

  // Merge all message files
  const messages = {
    ...common,
    rooms,
    restaurant,
    weddings,
    conference
  };

  return {
    messages,
    locale: safeLocale
  };
});
