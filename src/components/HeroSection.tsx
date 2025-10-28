'use client';

import { useEffect, useState } from 'react';
import HeroEventFlow from './HeroEventFlow';
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
  const [mounted, setMounted] = useState(false);

  // Only render the animation on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* HeroEventFlow as full background with flowchart mode */}
      {mounted && <HeroEventFlow mode="flowchart" />}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 animate-fade-in animation-delay-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in animation-delay-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-300">{features.planning}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-300">{features.network}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-300">{features.analytics}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-300">{features.integration}</span>
            </div>
          </div>
          
          <div className="animate-fade-in animation-delay-600">
            <a
              href={`/${lang}${ctaLink}`}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg shadow-purple-600/30"
              style={{ pointerEvents: 'auto' }}
            >
              {ctaText}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
