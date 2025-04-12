import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "../data/translations";
import { EmbeddedCalculator } from "./EmbeddedCalculator";

interface ConferenceCalculatorProps {
  locale: Locale;
}

export async function ConferenceCalculator({ locale }: ConferenceCalculatorProps) {
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);
  
  return (
    <div className="my-8">
      <EmbeddedCalculator locale={locale} dictionary={dictionary} />
    </div>
  );
}
