import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "@/features/event-builder/data/translations";
import { WeddingCalculator } from "@/features/event-builder/components/WeddingCalculator";

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{dictionary.calculator.weddingTitle}</h1>
      <p className="text-lg mb-8">{dictionary.calculator.weddingDescription}</p>

      <div className="max-w-3xl mx-auto">
        <WeddingCalculator locale={locale} dictionary={dictionary} />
      </div>
    </div>
  );
}
