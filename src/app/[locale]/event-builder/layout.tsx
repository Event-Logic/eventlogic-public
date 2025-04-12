import { Locale } from "@/dictionaries";

export default async function EventBuilderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Dictionary will be used for future translations
  // const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {locale === 'en'
                ? 'Event Builder'
                : 'Evenemangsbyggare'}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              {locale === 'en'
                ? 'Create your custom event and see potential savings'
                : 'Skapa ditt anpassade evenemang och se potentiella besparingar'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
