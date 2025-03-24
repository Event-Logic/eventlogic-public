import type { NextConfig } from "next";

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
  // Add redirects for SEO to maintain Google indexed URLs
  async redirects() {
    return [
      // Root redirects to default language (handled by middleware)
      
      // Legacy URLs without language prefix - redirect to Swedish versions
      // These match the Google indexed URLs
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
      
      // Cross-language redirects for consistent URL structure
      // Swedish to English
      {
        source: "/en/konferens",
        destination: "/en/conference",
        permanent: true,
      },
      {
        source: "/en/restaurang",
        destination: "/en/restaurant",
        permanent: true,
      },
      {
        source: "/en/kontakt",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/en/rum",
        destination: "/en/rooms",
        permanent: true,
      },
      
      // English to Swedish
      {
        source: "/sv/conference",
        destination: "/sv/konferens",
        permanent: true,
      },
      {
        source: "/sv/restaurant",
        destination: "/sv/restaurang",
        permanent: true,
      },
      {
        source: "/sv/contact",
        destination: "/sv/kontakt",
        permanent: true,
      },
      {
        source: "/sv/rooms",
        destination: "/sv/rum",
        permanent: true,
      },
      
      // Event pages redirects
      // English to Swedish
      {
        source: "/en/weddings",
        destination: "/en/brollop",
        permanent: true,
      },
      {
        source: "/en/celebrations",
        destination: "/en/fester",
        permanent: true,
      },
      {
        source: "/en/retreats",
        destination: "/en/retreats",
        permanent: true,
      },
      
      // Swedish to English
      {
        source: "/sv/weddings",
        destination: "/sv/brollop",
        permanent: true,
      },
      {
        source: "/sv/celebrations",
        destination: "/sv/fester",
        permanent: true,
      },
      {
        source: "/sv/retreats",
        destination: "/sv/retreats",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
