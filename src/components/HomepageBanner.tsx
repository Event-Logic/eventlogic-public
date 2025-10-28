import Link from "next/link";
import { Locale } from "../dictionaries";

type HomepageBannerProps = {
  lang: Locale;
  dictionary: {
    home: {
      hero: {
        title: string;
        subtitle: string;
        cta: string;
        create_event: string;
      };
    };
  };
};

export default function HomepageBanner({ lang, dictionary }: HomepageBannerProps) {
  const { hero } = dictionary.home;

  return (
    <section className="relative h-screen flex items-start justify-center text-white">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-800 opacity-70"></div>
        <img
          src="/images/main-banner/banner.jpg"
          alt="Event Logic Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-40 md:pt-48">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-12">
          {hero.subtitle}
        </p>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            href={`/${lang}/demo`}
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            {hero.cta}
          </Link>
          <Link
            href={`/${lang}/register`}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            {hero.create_event}
          </Link>
        </div>
      </div>
    </section>
  );
}
