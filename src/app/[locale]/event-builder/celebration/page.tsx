import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "@/features/event-builder/data/translations";
import { CelebrationCalculator } from "@/features/event-builder/components/CelebrationCalculator";

interface CelebrationPageProps {
  params: {
    locale: Locale;
  };
}

export default async function CelebrationPage({ params: { locale } }: CelebrationPageProps) {
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{dictionary.calculator.celebrationTitle}</h1>
      <p className="text-lg mb-8">{dictionary.calculator.celebrationDescription}</p>

      <div className="max-w-3xl mx-auto">
        <CelebrationCalculator locale={locale} dictionary={dictionary} />
      </div>
    </div>
  );
}
