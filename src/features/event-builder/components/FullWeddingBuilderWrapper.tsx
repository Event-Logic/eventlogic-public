import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "../data/translations";
// These imports will be used in future implementations
// import { FullWeddingBuilder } from "./FullWeddingBuilder";
// import { CartProvider } from "../context/CartContext";
import ClientWeddingBuilderWrapper from "./ClientWeddingBuilderWrapper";

interface FullWeddingBuilderWrapperProps {
  locale: Locale;
  initialDate?: string;
  initialDays?: string;
  initialAttendees?: string;
  initialVenue?: string;
  configId?: string;
}

export async function FullWeddingBuilderWrapper({
  locale,
  initialDate,
  initialDays,
  initialAttendees,
  initialVenue,
  configId
}: FullWeddingBuilderWrapperProps) {
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);

  // Parse initial values
  const parsedDate = initialDate ? new Date(initialDate) : undefined;
  const parsedDays = initialDays ? parseInt(initialDays) : undefined;
  const parsedAttendees = initialAttendees ? parseInt(initialAttendees) : undefined;

  return (
    <ClientWeddingBuilderWrapper
      locale={locale}
      dictionary={dictionary}
      initialDate={parsedDate}
      initialDays={parsedDays}
      initialAttendees={parsedAttendees}
      initialVenue={initialVenue}
      configId={configId}
    />
  );
}
