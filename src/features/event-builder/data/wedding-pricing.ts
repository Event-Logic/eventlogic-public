import { Locale } from "@/dictionaries";

export type Season = 'highSeason' | 'lowSeason';
export type DayType = 'weekday' | 'weekend';

export interface PricingRate {
  lowSeasonWeekday: number;
  lowSeasonWeekend: number;
  highSeasonWeekday: number;
  highSeasonWeekend: number;
}

export interface SeasonalPeriod {
  start: string; // ISO date string
  end: string; // ISO date string
}

export interface AddOnOption {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number | Record<string, number>;
  image?: string;
  perPerson?: boolean;
  perDay?: boolean;
  multiSelect?: boolean; // Allow multiple selections within a category
}

export interface AddOnCategory {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  options: AddOnOption[];
  multiSelect?: boolean; // Allow multiple selections within a category
}

export interface WeddingPricingData {
  baseRates: PricingRate;
  seasonalPeriods: {
    highSeason: SeasonalPeriod[];
    lowSeason: SeasonalPeriod[];
  };
  addOnCategories: AddOnCategory[];
}

// Wedding pricing data based on the pricing framework
export const weddingPricingData: WeddingPricingData = {
  baseRates: {
    // These are multipliers for the venue options
    lowSeasonWeekday: 1.0, // Base multiplier
    lowSeasonWeekend: 1.3, // 30% higher on weekends
    highSeasonWeekday: 1.5, // 50% higher in high season
    highSeasonWeekend: 1.7, // 70% higher in high season weekends
  },
  seasonalPeriods: {
    highSeason: [
      // Summer (June-August)
      { start: '2025-06-01', end: '2025-08-31' },
      // Holiday periods could be added here
    ],
    lowSeason: [
      // Rest of the year
      { start: '2025-01-01', end: '2025-05-31' },
      { start: '2025-09-01', end: '2025-12-31' },
    ],
  },
  addOnCategories: [
    {
      id: 'venue',
      name: {
        en: 'Venue Options',
        sv: 'Lokalval',
      },
      description: {
        en: 'Choose which parts of the venue you want to rent',
        sv: 'Välj vilka delar av anläggningen du vill hyra',
      },
      options: [
        {
          id: 'full-venue',
          name: {
            en: 'Full Venue',
            sv: 'Hela anläggningen',
          },
          description: {
            en: 'Exclusive use of the entire inn including all rooms, restaurant, and common areas for your wedding. All accommodation is included in this price.',
            sv: 'Exklusiv användning av hela värdshuset inklusive alla rum, restaurang och gemensamma utrymmen för ditt bröllop. Allt boende ingår i detta pris.',
          },
          price: 50000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/full-venue.jpg',
        },
        {
          id: 'restaurant-only',
          name: {
            en: 'Restaurant Only',
            sv: 'Endast restaurang',
          },
          description: {
            en: 'Exclusive use of the restaurant area for your wedding reception, without accommodation.',
            sv: 'Exklusiv användning av restaurangområdet för din bröllopsmottagning, utan boende.',
          },
          price: 30000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/restaurant.jpg',
        },
        {
          id: 'ceremony-space',
          name: {
            en: 'Ceremony Space',
            sv: 'Ceremoniplats',
          },
          description: {
            en: 'Beautiful outdoor or indoor ceremony space, perfect for exchanging vows.',
            sv: 'Vacker utomhus- eller inomhusceremoni, perfekt för att utbyta löften.',
          },
          price: 10000, // Base price (before seasonal adjustments)
          image: '/images/ceremony-space.jpg',
        },
      ],
    },
    {
      id: 'catering',
      name: {
        en: 'Catering Options',
        sv: 'Cateringalternativ',
      },
      description: {
        en: 'Choose from different catering options for your wedding',
        sv: 'Välj mellan olika cateringalternativ för ditt bröllop',
      },
      options: [
        {
          id: 'self-catering',
          name: {
            en: 'Self-catering',
            sv: 'Självservering',
          },
          description: {
            en: 'Bring and prepare your own food. Includes use of our fully equipped kitchen.',
            sv: 'Ta med och tillaga din egen mat. Inkluderar användning av vårt fullt utrustade kök.',
          },
          price: 2000, // Flat kitchen-use fee
          image: '/images/self-catering.jpg',
        },
        {
          id: 'private-chef',
          name: {
            en: 'Private Chef',
            sv: 'Privat kock',
          },
          description: {
            en: 'Hire a private chef to cook on-site. Price is per day plus ingredient costs.',
            sv: 'Anlita en privat kock för att laga mat på plats. Pris per dag plus ingredienskostnader.',
          },
          price: 8000, // Per day
          perDay: true,
          image: '/images/private-chef.jpg',
        },
        {
          id: 'wedding-menu',
          name: {
            en: 'Wedding Menu',
            sv: 'Bröllopsmeny',
          },
          description: {
            en: 'Elegant three-course wedding dinner prepared by our chefs. Price is per person.',
            sv: 'Elegant trerätters bröllopsmiddag tillagad av våra kockar. Pris per person.',
          },
          price: 875, // Per person
          perPerson: true,
          image: '/images/wedding-menu.jpg',
        },
        {
          id: 'premium-menu',
          name: {
            en: 'Premium Wedding Menu',
            sv: 'Premium bröllopsmeny',
          },
          description: {
            en: 'Luxurious four-course wedding dinner with wine pairing. Price is per person.',
            sv: 'Lyxig fyrarätters bröllopsmiddag med vinpaket. Pris per person.',
          },
          price: 1395, // Per person
          perPerson: true,
          image: '/images/premium-menu.jpg',
        },
      ],
    },
    {
      id: 'staff',
      name: {
        en: 'Event Staff',
        sv: 'Eventpersonal',
      },
      description: {
        en: 'Professional staff to assist during your wedding',
        sv: 'Professionell personal som hjälper till under ditt bröllop',
      },
      multiSelect: true, // Allow multiple staff selections
      options: [
        {
          id: 'wedding-coordinator',
          name: {
            en: 'Wedding Coordinator',
            sv: 'Bröllopskoordinator',
          },
          description: {
            en: 'On-site coordinator to help manage your wedding day. Price is per hour.',
            sv: 'Koordinator på plats för att hjälpa till att hantera din bröllopsdag. Pris per timme.',
          },
          price: 600, // Per hour
          image: '/images/coordinator.jpg',
        },
        {
          id: 'waitstaff',
          name: {
            en: 'Waitstaff',
            sv: 'Serveringspersonal',
          },
          description: {
            en: 'Professional servers for food and drinks. Price is per staff member per hour.',
            sv: 'Professionell serveringspersonal för mat och dryck. Pris per personal per timme.',
          },
          price: 350, // Per hour per staff
          image: '/images/waitstaff.jpg',
        },
        {
          id: 'bartender',
          name: {
            en: 'Bartender',
            sv: 'Bartender',
          },
          description: {
            en: 'Professional bartender to serve drinks and cocktails. Price is per hour.',
            sv: 'Professionell bartender för att servera drycker och cocktails. Pris per timme.',
          },
          price: 400, // Per hour
          image: '/images/bartender.jpg',
        },
      ],
    },
    {
      id: 'decor',
      name: {
        en: 'Decoration & Setup',
        sv: 'Dekoration & Uppställning',
      },
      description: {
        en: 'Decoration options and setup assistance for your wedding',
        sv: 'Dekorationsalternativ och hjälp med uppställning för ditt bröllop',
      },
      multiSelect: true, // Allow multiple decor selections
      options: [
        {
          id: 'basic-setup',
          name: {
            en: 'Basic Setup Assistance',
            sv: 'Grundläggande uppställningshjälp',
          },
          description: {
            en: 'Our staff helps rearrange furniture, set out tables/chairs, and do basic décor placement.',
            sv: 'Vår personal hjälper till att möblera om, ställa ut bord/stolar och göra grundläggande dekorplacering.',
          },
          price: 2000, // Flat fee
          image: '/images/basic-setup.jpg',
        },
        {
          id: 'coastal-decor',
          name: {
            en: 'Coastal Elegance Package',
            sv: 'Kustelegans-paket',
          },
          description: {
            en: 'Beautiful coastal-themed decorations including candles, lanterns, and nautical accents.',
            sv: 'Vackra kusttema-dekorationer inklusive ljus, lyktor och nautiska accenter.',
          },
          price: 5000, // Flat fee
          image: '/images/coastal-decor.jpg',
        },
        {
          id: 'floral-package',
          name: {
            en: 'Floral Package',
            sv: 'Blomsterpaket',
          },
          description: {
            en: 'Elegant floral arrangements for tables, ceremony, and reception areas.',
            sv: 'Eleganta blomarrangemang för bord, ceremoni och mottagningsområden.',
          },
          price: 8000, // Flat fee
          image: '/images/floral-package.jpg',
        },
      ],
    },
    {
      id: 'activities',
      name: {
        en: 'Wedding Activities',
        sv: 'Bröllopsaktiviteter',
      },
      description: {
        en: 'Special activities to enhance your wedding experience',
        sv: 'Speciella aktiviteter för att förhöja din bröllopsupplevelse',
      },
      multiSelect: true, // Allow multiple activity selections
      options: [
        {
          id: 'boat-arrival',
          name: {
            en: 'Boat Arrival/Departure',
            sv: 'Båtankomst/avfärd',
          },
          description: {
            en: 'Arrive or depart your wedding in style on a beautiful boat. Perfect for photos.',
            sv: 'Ankomst eller avfärd från ditt bröllop med stil på en vacker båt. Perfekt för foton.',
          },
          price: 5000, // Flat fee
          image: '/images/boat-arrival.jpg',
        },
        {
          id: 'champagne-toast',
          name: {
            en: 'Champagne & Oyster Reception',
            sv: 'Champagne & ostronmottagning',
          },
          description: {
            en: 'Welcome your guests with champagne and fresh local oysters. Price is per person.',
            sv: 'Välkomna dina gäster med champagne och färska lokala ostron. Pris per person.',
          },
          price: 400, // Per person
          perPerson: true,
          image: '/images/champagne-toast.jpg',
        },
        {
          id: 'fireworks',
          name: {
            en: 'Fireworks Display',
            sv: 'Fyrverkeriuppvisning',
          },
          description: {
            en: 'End your perfect day with a spectacular fireworks display over the water.',
            sv: 'Avsluta din perfekta dag med ett spektakulärt fyrverkeri över vattnet.',
          },
          price: 15000, // Flat fee
          image: '/images/fireworks.jpg',
        },
      ],
    },
    {
      id: 'accommodation',
      name: {
        en: 'Accommodation',
        sv: 'Boende',
      },
      description: {
        en: 'Select rooms for overnight stays',
        sv: 'Välj rum för övernattning',
      },
      multiSelect: true, // Allow multiple room selections
      options: [
        {
          id: 'room-1',
          name: {
            en: 'Room #1 - Double with Sofa Bed',
            sv: 'Rum #1 - Dubbel med bäddsoffa',
          },
          description: {
            en: 'Double room with 160cm queensize bed and sofa bed for 2 people. 18 sqm with terrace and sea view.',
            sv: 'Dubbelrum med 160 cm queensize-säng och bäddsoffa för 2 personer. 18 kvm med terrass och havsutsikt.',
          },
          price: 2890, // Per night
          perDay: true,
          image: '/images/room-1.jpg',
        },
        {
          id: 'room-2',
          name: {
            en: 'Room #2 - Double with Terrace',
            sv: 'Rum #2 - Dubbel med terrass',
          },
          description: {
            en: 'Double room with 160cm queensize bed. 18 sqm with terrace and sea view.',
            sv: 'Dubbelrum med 160 cm queensize-säng. 18 kvm med terrass och havsutsikt.',
          },
          price: 2890, // Per night
          perDay: true,
          image: '/images/room-2.jpg',
        },
        {
          id: 'room-3',
          name: {
            en: 'Room #3 - King with Sea View',
            sv: 'Rum #3 - King med havsutsikt',
          },
          description: {
            en: 'Double room with 180cm kingsize bed. 18 sqm with sea view and wooden floor.',
            sv: 'Dubbelrum med 180 cm kingsize-säng. 18 kvm med havsutsikt och trägolv.',
          },
          price: 2390, // Per night
          perDay: true,
          image: '/images/room-3.jpg',
        },
        {
          id: 'room-4',
          name: {
            en: 'Room #4 - Double with Garden View',
            sv: 'Rum #4 - Dubbel med trädgårdsutsikt',
          },
          description: {
            en: 'Double room with 160cm queensize bed. 18 sqm with garden view and wooden floor.',
            sv: 'Dubbelrum med 160 cm queensize-säng. 18 kvm med trädgårdsutsikt och trägolv.',
          },
          price: 2390, // Per night
          perDay: true,
          image: '/images/room-4.jpg',
        },
        {
          id: 'room-5',
          name: {
            en: 'Room #5 - Family Room with Bunk Beds',
            sv: 'Rum #5 - Familjerum med våningssängar',
          },
          description: {
            en: 'Small room with two bunk beds (80cm). 11 sqm, perfect for children.',
            sv: 'Lilla rummet med två våningssängar (80 cm). 11 kvm, perfekt för barn.',
          },
          price: 1490, // Per night
          perDay: true,
          image: '/images/room-5.jpg',
        },
        {
          id: 'room-6',
          name: {
            en: 'Room #6 - Family Room',
            sv: 'Rum #6 - Familjerum',
          },
          description: {
            en: 'Large room with 160cm double bed and bunk bed. 20 sqm with wool carpet.',
            sv: 'Stort rum med 160 cm dubbelsäng och våningssäng. 20 kvm med ullmatta.',
          },
          price: 2490, // Per night
          perDay: true,
          image: '/images/room-6.jpg',
        },
        {
          id: 'room-7',
          name: {
            en: 'Room #7 - Twin Room',
            sv: 'Rum #7 - Tvåbäddsrum',
          },
          description: {
            en: 'Cozy room with two separate 90cm beds. 12 sqm with wool carpet.',
            sv: 'Mysigt rum med två separata 90 cm sängar. 12 kvm med ullmatta.',
          },
          price: 2190, // Per night
          perDay: true,
          image: '/images/room-7.jpg',
        },
        {
          id: 'room-8',
          name: {
            en: 'Room #8 - Triple Room',
            sv: 'Rum #8 - Trebäddsrum',
          },
          description: {
            en: 'Room with 140cm bed and 80cm upper bunk. 12 sqm with wool carpet.',
            sv: 'Rum med 140 cm säng och 80 cm överslaf. 12 kvm med ullmatta.',
          },
          price: 2190, // Per night
          perDay: true,
          image: '/images/room-8.jpg',
        },
        {
          id: 'room-9',
          name: {
            en: 'Room #9 - Triple Room with Hanging Chair',
            sv: 'Rum #9 - Trebäddsrum med hängstol',
          },
          description: {
            en: 'Room with 140cm bed and 80cm upper bunk. 14 sqm with hanging chair.',
            sv: 'Rum med 140 cm säng och 80 cm överslaf. 14 kvm med hängstol.',
          },
          price: 2190, // Per night
          perDay: true,
          image: '/images/room-9.jpg',
        },
        {
          id: 'room-10',
          name: {
            en: 'Room #10 - Double Room',
            sv: 'Rum #10 - Dubbelrum',
          },
          description: {
            en: 'Double room with 160cm queensize bed. 15 sqm with wooden floor and wool carpet.',
            sv: 'Dubbelrum med 160 cm queensize-säng. 15 kvm med trägolv och ullmatta.',
          },
          price: 1690, // Per night
          perDay: true,
          image: '/images/room-10.jpg',
        },
      ],
    },
  ],
};

// Helper function to calculate the base price based on venue selection, date, and number of days
export function calculateBasePrice(
  date: Date,
  days: number = 1,
  selectedVenue?: SelectedAddOn,
  baseRates: PricingRate = weddingPricingData.baseRates,
  seasonalPeriods = weddingPricingData.seasonalPeriods
): number {
  // If no venue is selected, return 0
  if (!selectedVenue) {
    return 0;
  }

  // Find the selected venue option
  const venueCategory = weddingPricingData.addOnCategories.find(cat => cat.id === 'venue');
  if (!venueCategory) return 0;

  const venueOption = venueCategory.options.find(opt => opt.id === selectedVenue.optionId);
  if (!venueOption) return 0;

  // Get the base venue price
  const baseVenuePrice = typeof venueOption.price === 'number' ? venueOption.price : 0;

  let totalPrice = 0;

  // Calculate price for each day with seasonal adjustments
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);

    const currentSeason = determineSeasonForDate(currentDate, seasonalPeriods);
    const currentDayType = isWeekend(currentDate) ? 'weekend' : 'weekday';

    // Apply appropriate multiplier based on season and day type
    let multiplier = 1.0;
    if (currentSeason === 'highSeason' && currentDayType === 'weekend') {
      multiplier = baseRates.highSeasonWeekend;
    } else if (currentSeason === 'highSeason' && currentDayType === 'weekday') {
      multiplier = baseRates.highSeasonWeekday;
    } else if (currentSeason === 'lowSeason' && currentDayType === 'weekend') {
      multiplier = baseRates.lowSeasonWeekend;
    } else {
      multiplier = baseRates.lowSeasonWeekday;
    }

    // Add the adjusted price for this day
    totalPrice += baseVenuePrice * multiplier;
  }

  // Apply multi-day discount if applicable
  if (days > 1) {
    // 25% discount on additional days (simplified version of the pricing model)
    totalPrice = totalPrice * (1 - (0.25 * (days - 1) / days));
  }

  return totalPrice;
}

// Helper function to determine if a date is in high season or low season
function determineSeasonForDate(
  date: Date,
  seasonalPeriods = weddingPricingData.seasonalPeriods
): Season {
  const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  // Check if date falls within any high season period
  for (const period of seasonalPeriods.highSeason) {
    if (dateStr >= period.start && dateStr <= period.end) {
      return 'highSeason';
    }
  }

  // Default to low season
  return 'lowSeason';
}

// Helper function to determine if a date is a weekend (Friday, Saturday, Sunday)
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0; // Friday, Saturday, Sunday
}

// Helper function to calculate add-on prices
export function calculateAddOnPrice(
  addOn: AddOnOption,
  quantity: number = 1,
  days: number = 1,
  attendees: number = 1
): number {
  let price = 0;

  if (typeof addOn.price === 'number') {
    price = addOn.price;

    // Apply per person multiplier if applicable
    if (addOn.perPerson) {
      price *= attendees;
    }

    // Apply per day multiplier if applicable
    if (addOn.perDay) {
      price *= days;
    }

    // Apply quantity
    price *= quantity;
  } else if (typeof addOn.price === 'object') {
    // For complex pricing objects, we'd need more specific logic
    // This is a simplified version
    const firstPriceKey = Object.keys(addOn.price)[0];
    price = addOn.price[firstPriceKey] * quantity;
  }

  return price;
}

// Updated to handle multiple selections per category
export interface SelectedAddOn {
  optionId: string;
  quantity: number;
}

// Helper function to calculate total price with multiple selections
export function calculateTotalPrice(
  date: Date,
  days: number = 1,
  attendees: number = 1,
  selectedAddOns: Record<string, SelectedAddOn | SelectedAddOn[]> = {}
): number {
  // Get the venue selection
  const venueSelection = selectedAddOns['venue'] as SelectedAddOn | undefined;
  const isFullVenueSelected = venueSelection && venueSelection.optionId === 'full-venue';

  // Calculate base price using the venue selection
  const basePrice = calculateBasePrice(date, days, venueSelection);

  // Calculate add-ons price
  let addOnsPrice = 0;

  Object.entries(selectedAddOns).forEach(([categoryId, selection]) => {
    // Skip venue category since it's already included in the base price
    // Skip accommodation category if full venue is selected
    if (categoryId === 'venue' || (isFullVenueSelected && categoryId === 'accommodation')) {
      return;
    }

    const category = weddingPricingData.addOnCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    if (Array.isArray(selection)) {
      // Handle multiple selections
      selection.forEach(item => {
        const option = category.options.find(opt => opt.id === item.optionId);
        if (option) {
          addOnsPrice += calculateAddOnPrice(option, item.quantity, days, attendees);
        }
      });
    } else {
      // Handle single selection
      const option = category.options.find(opt => opt.id === selection.optionId);
      if (option) {
        addOnsPrice += calculateAddOnPrice(option, selection.quantity, days, attendees);
      }
    }
  });

  return basePrice + addOnsPrice;
}

// Helper function to calculate traditional wedding cost (for comparison)
export function calculateTraditionalWeddingCost(
  // days parameter is removed as it's not used
  attendees: number = 1
): number {
  // Average cost per person for a traditional wedding venue
  const averageCostPerPerson = 3000; // SEK

  return averageCostPerPerson * attendees;
}

// Helper function to calculate potential savings
export function calculatePotentialSavings(
  diyTotal: number,
  // days parameter removed
  attendees: number = 1
): number {
  const traditionalCost = calculateTraditionalWeddingCost(attendees);
  return traditionalCost - diyTotal;
}
