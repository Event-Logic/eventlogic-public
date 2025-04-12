import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "../data/translations";
import { CartDisplay } from "./CartDisplay";

interface CartDisplayWrapperProps {
  locale: Locale;
}

export async function CartDisplayWrapper({ locale }: CartDisplayWrapperProps) {
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);
  
  return <CartDisplay locale={locale} dictionary={dictionary} />;
}
