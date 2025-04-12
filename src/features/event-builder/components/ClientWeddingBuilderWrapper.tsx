"use client";

import { Locale } from "@/dictionaries";
import { FullWeddingBuilder } from "./FullWeddingBuilder";
import { EventBuilderDictionary } from "../data/translations";

interface ClientWeddingBuilderWrapperProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  initialDate?: Date;
  initialDays?: number;
  initialAttendees?: number;
  initialVenue?: string;
  configId?: string;
}

export default function ClientWeddingBuilderWrapper({ 
  locale, 
  dictionary,
  initialDate,
  initialDays,
  initialAttendees,
  initialVenue,
  configId
}: ClientWeddingBuilderWrapperProps) {
  return (
    <FullWeddingBuilder 
      locale={locale} 
      dictionary={dictionary}
      initialDate={initialDate}
      initialDays={initialDays}
      initialAttendees={initialAttendees}
      initialVenue={initialVenue}
      configId={configId}
    />
  );
}
