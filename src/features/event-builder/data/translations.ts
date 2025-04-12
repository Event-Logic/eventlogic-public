import 'server-only';
import { Locale } from "@/dictionaries";

// Define the EventBuilderDictionary type based on the structure of our JSON files
export interface EventBuilderDictionary {
  common: {
    next: string;
    back: string;
    save: string;
    cancel: string;
    add: string;
    remove: string;
    total: string;
    perPerson: string;
    perDay: string;
    included: string;
    optional: string;
    quantity: string;
    continue: string;
    submit: string;
    share: string;
    edit: string;
    compare: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    basePrice: string;
    addOns: string;
    totalPrice: string;
    savings: string;
    traditionalCost: string;
    potentialSavings: string;
    savingsPercentage: string;
    date: string;
    duration: string;
    day: string;
    days: string;
    attendees: string;
    venue: string;
    selectDuration: string;
    selectVenue: string;
    savingsComparison: string;
    addToCart: string;
    weddingTitle: string;
    weddingDescription: string;
    celebrationTitle: string;
    celebrationDescription: string;
    retreatTitle: string;
    retreatDescription: string;
  };
  steps: {
    eventType: string;
    basicDetails: string;
    addOns: string;
    summary: string;
    complete: string;
  };
  eventTypes: {
    conference: string;
    wedding: string;
    celebration: string;
    retreat: string;
  };
  basicDetails: {
    title: string;
    subtitle: string;
    date: string;
    selectDate: string;
    duration: string;
    days: string;
    attendees: string;
    selectAttendees: string;
  };
  addOns: {
    title: string;
    subtitle: string;
    selectAddOns: string;
    categoryTitle: string;
    optionTitle: string;
  };
  summary: {
    title: string;
    subtitle: string;
    eventDetails: string;
    selectedAddOns: string;
    priceSummary: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    contactInfo: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    termsAndConditions: string;
    termsText: string;
    submitRequest: string;
  };
  cart: {
    title: string;
    empty: string;
    items: string;
    checkout: string;
    remove: string;
    saveForLater: string;
    shareConfiguration: string;
    configurationsCount: string;
  };
  seasons: {
    highSeason: string;
    lowSeason: string;
  };
  dayTypes: {
    weekday: string;
    weekend: string;
  };
  notifications: {
    addedToCart: string;
    removedFromCart: string;
    configurationSaved: string;
    configurationShared: string;
    requestSubmitted: string;
    errorOccurred: string;
  };
}

// Define the dictionaries object with dynamic imports
const eventBuilderDictionaries = {
  en: () => import('./en.json').then((module) => module.default as EventBuilderDictionary),
  sv: () => import('./sv.json').then((module) => module.default as EventBuilderDictionary),
};

/**
 * Get event builder translations for the specified locale
 * @param locale The locale to get translations for
 * @returns The translations for the specified locale
 */
export const getEventBuilderDictionary = async (locale: Locale): Promise<EventBuilderDictionary> => {
  return eventBuilderDictionaries[locale]();
};
