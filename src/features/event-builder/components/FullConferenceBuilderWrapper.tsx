import { Locale } from "@/dictionaries";
import { getEventBuilderDictionary } from "../data/translations";
import ClientConferenceBuilderWrapper from "./ClientConferenceBuilderWrapper";

interface FullConferenceBuilderWrapperProps {
  locale: Locale;
  initialDate?: string;
  initialDays?: string;
  initialAttendees?: string;
  configId?: string;
}

export async function FullConferenceBuilderWrapper({ 
  locale, 
  initialDate,
  initialDays,
  initialAttendees,
  configId
}: FullConferenceBuilderWrapperProps) {
  // Load translations
  const dictionary = await getEventBuilderDictionary(locale);
  
  // Parse initial values
  const parsedDate = initialDate ? new Date(initialDate) : undefined;
  const parsedDays = initialDays ? parseInt(initialDays) : undefined;
  const parsedAttendees = initialAttendees ? parseInt(initialAttendees) : undefined;
  
  return (
    <ClientConferenceBuilderWrapper 
      locale={locale} 
      dictionary={dictionary}
      initialDate={parsedDate}
      initialDays={parsedDays}
      initialAttendees={parsedAttendees}
      configId={configId}
    />
  );
}
