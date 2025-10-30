'use client';

import { Locale } from '@/dictionaries';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  lang: Locale;
  features: {
    planning: string;
    network: string;
    analytics: string;
    integration: string;
  };
}

export default function HeroSection({ title, subtitle, ctaText, ctaLink, lang, features }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero/phone-mockup.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#7c3aed'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero content */}
            <div className="text-center lg:text-left">
              {/* Logo/Brand mark */}
              <div className="mb-8 inline-block">
                <div className="flex items-center gap-3 animate-fade-in">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-sm animate-pulse"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-sm animate-pulse animation-delay-100"></div>
                    <div className="w-3 h-3 bg-pink-500 rounded-sm animate-pulse animation-delay-200"></div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
                {title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in animation-delay-200">
                {subtitle}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 animate-fade-in animation-delay-300">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-sm border border-white/30">
                  {features.planning}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-sm border border-white/30">
                  {features.network}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-sm border border-white/30">
                  {features.analytics}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-sm border border-white/30">
                  {features.integration}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-400">
                <a
                  href={`/${lang}${ctaLink}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {ctaText}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
                <a
                  href={`/${lang}/demo`}
                  className="bg-white hover:bg-gray-50 text-purple-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center shadow-md hover:shadow-lg border-2 border-purple-200"
                >
                  {lang === 'sv' ? 'Boka demo' : 'Book demo'}
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-12 animate-fade-in animation-delay-500">
                <p className="text-sm text-white/80 mb-4">
                  {lang === 'sv' ? 'Betrodd av ledande organisationer' : 'Trusted by leading organizations'}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-80">
                  <div className="text-white font-semibold text-lg">Coop</div>
                  <div className="text-white font-semibold text-lg">ICA</div>
                  <div className="text-white font-semibold text-lg">Skanska</div>
                  <div className="text-white font-semibold text-lg">Swedavia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
