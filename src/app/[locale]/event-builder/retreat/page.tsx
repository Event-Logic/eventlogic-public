import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "@/features/event-builder/data/translations";
import { RetreatCalculator } from "@/features/event-builder/components/RetreatCalculator";

export default async function RetreatPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{dictionary.calculator.retreatTitle}</h1>
      <p className="text-lg mb-8">{dictionary.calculator.retreatDescription}</p>

      <div className="max-w-3xl mx-auto">
        <RetreatCalculator locale={locale} dictionary={dictionary} />
      </div>
    </div>
  );
}
