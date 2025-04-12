"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/dictionaries";
import { EventBuilderDictionary } from "../data/translations";
import { EventConfig } from "../types";

// Calculator Components
import { ClientConferenceCalculator } from "./ClientConferenceCalculator";
import { WeddingCalculator } from "./WeddingCalculator";
import { CelebrationCalculator } from "./CelebrationCalculator";
import { RetreatCalculator } from "./RetreatCalculator";

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmbeddedCalculatorProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  defaultEventType?: 'conference' | 'wedding' | 'celebration' | 'retreat';
}

export function EmbeddedCalculator({
  locale,
  dictionary,
  defaultEventType = 'conference'
}: EmbeddedCalculatorProps) {
  const router = useRouter();
  const t = dictionary;

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>(defaultEventType);

  // Handle continue button click for each calculator type
  const handleContinue = (eventType: string, params: Record<string, string | number | Date | undefined>) => {
    // Convert params object to URLSearchParams
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert Date objects to ISO strings
        if (value instanceof Date) {
          searchParams.append(key, value.toISOString());
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    // Navigate to the appropriate page based on event type
    if (eventType === 'conference') {
      router.push(`/${locale}/${locale === 'en' ? 'conference' : 'konferens'}?${searchParams.toString()}`);
    } else {
      router.push(`/${locale}/event-builder/${eventType}?${searchParams.toString()}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-blue-600 text-white rounded-t-lg">
        <CardTitle>{t.steps.eventType}</CardTitle>
        <CardDescription className="text-blue-100">{t.calculator.subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="pt-6 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="conference">{t.eventTypes.conference}</TabsTrigger>
            <TabsTrigger value="wedding">{t.eventTypes.wedding}</TabsTrigger>
            <TabsTrigger value="celebration">{t.eventTypes.celebration}</TabsTrigger>
            <TabsTrigger value="retreat">{t.eventTypes.retreat}</TabsTrigger>
          </TabsList>

          <TabsContent value="conference" className="px-4 pb-4">
            <ClientConferenceCalculator
              locale={locale}
              dictionary={dictionary}
              embedded={true}
              onAddToCart={(config: EventConfig) => handleContinue('conference', {
                date: config.date,
                days: config.days,
                attendees: config.attendees
              })}
            />
          </TabsContent>

          <TabsContent value="wedding" className="px-4 pb-4">
            <WeddingCalculator
              locale={locale}
              dictionary={dictionary}
              embedded={true}
              onAddToCart={(config: EventConfig) => handleContinue('wedding', {
                date: config.date,
                days: config.days,
                attendees: config.attendees,
                venue: config.selectedAddOns.venue.optionId
              })}
            />
          </TabsContent>

          <TabsContent value="celebration" className="px-4 pb-4">
            <CelebrationCalculator
              locale={locale}
              dictionary={dictionary}
              embedded={true}
              onAddToCart={(config: EventConfig) => handleContinue('celebration', {
                date: config.date,
                days: config.days,
                attendees: config.attendees,
                venue: config.selectedAddOns.venue.optionId
              })}
            />
          </TabsContent>

          <TabsContent value="retreat" className="px-4 pb-4">
            <RetreatCalculator
              locale={locale}
              dictionary={dictionary}
              embedded={true}
              onAddToCart={(config: EventConfig) => handleContinue('retreat', {
                date: config.date,
                days: config.days,
                attendees: config.attendees,
                venue: config.selectedAddOns.venue.optionId
              })}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
