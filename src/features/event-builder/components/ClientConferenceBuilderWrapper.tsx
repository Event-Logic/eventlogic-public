"use client";

import { Locale } from "@/dictionaries";
import { FullConferenceBuilder } from "./FullConferenceBuilder";
import { EventBuilderDictionary } from "../data/translations";

interface ClientConferenceBuilderWrapperProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  initialDate?: Date;
  initialDays?: number;
  initialAttendees?: number;
  configId?: string;
}

export default function ClientConferenceBuilderWrapper({ 
  locale, 
  dictionary,
  initialDate,
  initialDays,
  initialAttendees,
  configId
}: ClientConferenceBuilderWrapperProps) {
  return (
    <FullConferenceBuilder 
      locale={locale} 
      dictionary={dictionary}
      initialDate={initialDate}
      initialDays={initialDays}
      initialAttendees={initialAttendees}
      configId={configId}
    />
  );
}
