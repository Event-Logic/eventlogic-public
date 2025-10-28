'use client';

import Image from 'next/image';

interface ClientLogosProps {
  title?: string;
  subtitle?: string;
  lang?: string;
}

export default function ClientLogos({ title, subtitle, lang = 'sv' }: ClientLogosProps) {
  // Define the client logos with their paths and alt text
  const clientLogos = [
    { src: '/images/el/satisfied-customers/coop.svg', alt: 'Coop' },
    { src: '/images/el/satisfied-customers/BDX_logo.svg', alt: 'BDX' },
    { src: '/images/el/satisfied-customers/ICA.svg', alt: 'ICA' },
    { src: '/images/el/satisfied-customers/alleima.svg', alt: 'Alleima' },
    { src: '/images/el/satisfied-customers/boliden.svg', alt: 'Boliden' },
    { src: '/images/el/satisfied-customers/StockholmsStad.svg', alt: 'Stockholms Stad' },
    { src: '/images/el/satisfied-customers/Svenska_Spel.svg', alt: 'Svenska Spel' },
    { src: '/images/el/satisfied-customers/tetra-pak.svg', alt: 'Tetra Pak' },
    { src: '/images/el/satisfied-customers/Umea_kommun.svg', alt: 'Umea Kommun' }
  ];

  return (
    <section className="py-16 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {(title || subtitle) && (
          <div className="text-center mb-12 relative z-10">
            {title && (
              <div className="inline-block relative">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{title}</h2>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-purple-400 opacity-50 -rotate-1"></div>
              </div>
            )}
            {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Marquee Container */}
        <div className="relative z-10">
          {/* Subtle Heading */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {lang === 'en' ? 'Some of our satisfied customers' : 'Några av våra nöjda användare'}
            </p>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 dark:from-black"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 dark:from-black"></div>

          {/* Infinite Marquee */}
          <div className="marquee-container py-4">
            <div className="marquee">
              {/* First set of logos */}
              {clientLogos.map((logo, index) => (
                <div
                  key={`${logo.alt}-${index}`}
                  className="marquee-item"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className="max-h-16 w-auto object-contain"
                    priority={index < 5}
                  />
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {clientLogos.map((logo, index) => (
                <div
                  key={`${logo.alt}-duplicate-${index}`}
                  className="marquee-item"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 relative z-10">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <div className="text-4xl font-bold text-purple-800 dark:text-white mb-2 animate-count">250+</div>
            <div className="text-purple-600 dark:text-purple-200">Satisfied Clients</div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <div className="text-4xl font-bold text-purple-800 dark:text-white mb-2 animate-count">70%</div>
            <div className="text-purple-600 dark:text-purple-200">Time Saved</div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <div className="text-4xl font-bold text-purple-800 dark:text-white mb-2 animate-count">10k+</div>
            <div className="text-purple-600 dark:text-purple-200">Events Managed</div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <div className="text-4xl font-bold text-purple-800 dark:text-white mb-2 animate-count">98%</div>
            <div className="text-purple-600 dark:text-purple-200">Client Retention</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }

        @keyframes count {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-count {
          animation: count 1s ease-out forwards;
        }

        /* Marquee styles */
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee {
          display: flex;
          animation: marquee 30s linear infinite;
          width: max-content;
          padding: 0.5rem 0;
        }

        /* Pause animation on hover */
        .marquee-container:hover .marquee {
          animation-play-state: paused;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          margin: 0 2rem;
          height: 5rem;
          width: 10rem;
          transition: all 0.3s;
        }

        .marquee-item:hover {
          transform: scale(1.1);
          z-index: 5;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
