import Link from "next/link";
import { Locale } from "../dictionaries";

type FooterProps = {
  lang: Locale;
  dictionary: {
    footer: {
      address: string;
      phone: string;
      email: string;
      copyright: string;
      quick_links: {
        title: string;
        home: string;
        contact: string;
        pricing: string;
        suppliers: string;
        all_categories: string;
        all_locations: string;
        all_activity_types: string;
      };
      about: {
        title: string;
        description: string;
      };
      follow_us: string;
      all_rights_reserved: string;
      cookies: string;
      privacy_policy: string;
      strategic_meeting: string;
    };
  };
};

export default function Footer({ lang, dictionary }: FooterProps) {
  const { footer } = dictionary;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{footer.quick_links.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href={`/${lang}`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.home}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/contact`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.contact}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/pricing`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.pricing}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/suppliers`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.suppliers}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href={`/${lang}/categories`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.all_categories}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/locations`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.all_locations}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/activities`} className="hover:text-blue-400 transition-colors">
                      {footer.quick_links.all_activity_types}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{footer.about.title}</h3>
            <p className="text-gray-300">
              {footer.about.description}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Event Logic</h3>
            <p className="mb-2">{footer.address}</p>
            <p className="mb-2">{footer.phone}</p>
            <p className="mb-2">{footer.email}</p>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Event Logic. {footer.all_rights_reserved}
            <span className="mx-2">|</span>
            <Link href={`/${lang}/cookies`} className="hover:text-blue-400 transition-colors">
              {footer.cookies}
            </Link>
            <span className="mx-2">|</span>
            <Link href={`/${lang}/privacy-policy`} className="hover:text-blue-400 transition-colors">
              {footer.privacy_policy}
            </Link>
          </p>
          <div className="flex space-x-4">
            <span className="text-gray-400">{footer.follow_us}:</span>
            <a href="https://www.facebook.com/eventlogic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/event-logic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/eventlogic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
