// next.config.ts
import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use the recommended output option for SSR
  output: "standalone",
  // Add trailing slash to help with routing
  trailingSlash: true,
  // Ensure all routes are accessible
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ];
  },
  // Legacy redirects for SEO
  async redirects() {
    return [
      // Legacy URLs without language prefix - redirect to Swedish versions
      {
        source: "/konferens",
        destination: "/sv/konferens",
        permanent: true,
      },
      {
        source: "/restaurang",
        destination: "/sv/restaurang",
        permanent: true,
      },
      {
        source: "/kontakt",
        destination: "/sv/kontakt",
        permanent: true,
      },
      {
        source: "/hotell",
        destination: "/sv/rum",
        permanent: true,
      },

      // Handle www versions as well
      {
        source: "/www.wards.se/konferens",
        destination: "/sv/konferens",
        permanent: true,
      },
      {
        source: "/www.wards.se/restaurang",
        destination: "/sv/restaurang",
        permanent: true,
      },
      {
        source: "/www.wards.se/kontakt",
        destination: "/sv/kontakt",
        permanent: true,
      },
      {
        source: "/www.wards.se/hotell",
        destination: "/sv/rum",
        permanent: true,
      },

      // Event Logic legacy URL redirects for SEO
      {
        source: "/leverantorer-event",
        destination: "/en/find-suppliers",
        permanent: true,
      },
      {
        source: "/sv/leverantorer-event",
        destination: "/sv/hitta-leverantorer",
        permanent: true,
      },
      {
        source: "/smmp",
        destination: "/en/strategic-meeting-management",
        permanent: true,
      },
      {
        source: "/sv/smmp",
        destination: "/sv/strategisk-moteshantering",
        permanent: true,
      },
      {
        source: "/for-business-travel-agencies",
        destination: "/en/travel-agencies",
        permanent: true,
      },
      {
        source: "/sv/for-business-travel-agencies",
        destination: "/sv/resebyraer",
        permanent: true,
      },
      {
        source: "/for-suppliers",
        destination: "/en/suppliers",
        permanent: true,
      },
      {
        source: "/sv/for-suppliers",
        destination: "/sv/leverantorer",
        permanent: true,
      },
      {
        source: "/contact-info",
        destination: "/en/about",
        permanent: true,
      },
      {
        source: "/sv/contact-info",
        destination: "/sv/om-oss",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/en/about/data-protection",
        permanent: true,
      },
      {
        source: "/sv/privacy-policy",
        destination: "/sv/om-oss/dataskydd",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/en/about/career",
        permanent: true,
      },
      {
        source: "/sv/career",
        destination: "/sv/om-oss/karriar",
        permanent: true,
      },
      {
        source: "/inbjudan",
        destination: "/sv/designa-inbjudan",
        permanent: true,
      },
      {
        source: "/anmalan",
        destination: "/sv/deltagarhantering",
        permanent: true,
      },
      {
        source: "/eventsida",
        destination: "/sv/deltagarhantering",
        permanent: true,
      },
      {
        source: "/korschema",
        destination: "/sv/schema",
        permanent: true,
      },
      {
        source: "/statisik-rapporter",
        destination: "/sv/rapporter",
        permanent: true,
      },
    ];
  },
};

// Wrap the config with next-intl
export default withNextIntl('./i18n.ts')(nextConfig);
