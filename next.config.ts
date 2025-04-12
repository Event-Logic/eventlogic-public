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
    ];
  },
};

// Wrap the config with next-intl
export default withNextIntl('./i18n.ts')(nextConfig);
