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

export interface CelebrationPricingData {
  baseRates: PricingRate;
  seasonalPeriods: {
    highSeason: SeasonalPeriod[];
    lowSeason: SeasonalPeriod[];
  };
  addOnCategories: AddOnCategory[];
}

// Celebration pricing data based on the pricing framework
export const celebrationPricingData: CelebrationPricingData = {
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
            en: 'Exclusive use of the entire inn including all rooms, restaurant, and common areas for your celebration. All accommodation is included in this price.',
            sv: 'Exklusiv användning av hela värdshuset inklusive alla rum, restaurang och gemensamma utrymmen för din fest. Allt boende ingår i detta pris.',
          },
          price: 30000, // Base price per day (before seasonal adjustments)
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
            en: 'Exclusive use of the restaurant area for your celebration, without accommodation.',
            sv: 'Exklusiv användning av restaurangområdet för din fest, utan boende.',
          },
          price: 20000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/restaurant.jpg',
        },
        {
          id: 'lounge-area',
          name: {
            en: 'Lounge Area',
            sv: 'Loungeområde',
          },
          description: {
            en: 'Cozy lounge area perfect for smaller gatherings and cocktail parties.',
            sv: 'Mysigt loungeområde perfekt för mindre sammankomster och cocktailpartyn.',
          },
          price: 10000, // Base price (before seasonal adjustments)
          image: '/images/lounge-area.jpg',
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
        en: 'Choose from different catering options for your celebration',
        sv: 'Välj mellan olika cateringalternativ för din fest',
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
          price: 6000, // Per day
          perDay: true,
          image: '/images/private-chef.jpg',
        },
        {
          id: 'buffet-menu',
          name: {
            en: 'Buffet Menu',
            sv: 'Buffémenyn',
          },
          description: {
            en: 'Delicious buffet with a variety of dishes. Price is per person.',
            sv: 'Läcker buffé med olika rätter. Pris per person.',
          },
          price: 450, // Per person
          perPerson: true,
          image: '/images/buffet-menu.jpg',
        },
        {
          id: 'three-course-menu',
          name: {
            en: 'Three-Course Menu',
            sv: 'Trerättersmeny',
          },
          description: {
            en: 'Elegant three-course dinner prepared by our chefs. Price is per person.',
            sv: 'Elegant trerätters middag tillagad av våra kockar. Pris per person.',
          },
          price: 650, // Per person
          perPerson: true,
          image: '/images/three-course-menu.jpg',
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
        en: 'Professional staff to assist during your celebration',
        sv: 'Professionell personal som hjälper till under din fest',
      },
      multiSelect: true, // Allow multiple staff selections
      options: [
        {
          id: 'event-host',
          name: {
            en: 'Event Host',
            sv: 'Eventvärd',
          },
          description: {
            en: 'On-site host to help manage your celebration. Price is per hour.',
            sv: 'Värd på plats för att hjälpa till att hantera din fest. Pris per timme.',
          },
          price: 500, // Per hour
          image: '/images/event-host.jpg',
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
        en: 'Decoration options and setup assistance for your celebration',
        sv: 'Dekorationsalternativ och hjälp med uppställning för din fest',
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
          price: 4000, // Flat fee
          image: '/images/coastal-decor.jpg',
        },
        {
          id: 'birthday-package',
          name: {
            en: 'Birthday Celebration Package',
            sv: 'Födelsedagspaket',
          },
          description: {
            en: 'Festive birthday decorations including balloons, banners, and table settings.',
            sv: 'Festliga födelsedagsdekorationer inklusive ballonger, banderoller och bordsdekorationer.',
          },
          price: 3000, // Flat fee
          image: '/images/birthday-package.jpg',
        },
      ],
    },
    {
      id: 'activities',
      name: {
        en: 'Entertainment & Activities',
        sv: 'Underhållning & Aktiviteter',
      },
      description: {
        en: 'Special activities to enhance your celebration',
        sv: 'Speciella aktiviteter för att förhöja din fest',
      },
      multiSelect: true, // Allow multiple activity selections
      options: [
        {
          id: 'boat-tour',
          name: {
            en: 'Archipelago Boat Tour',
            sv: 'Skärgårdsbåttur',
          },
          description: {
            en: 'A 2-hour guided boat tour of the beautiful archipelago. Price is per person.',
            sv: 'En 2-timmars guidad båttur i den vackra skärgården. Pris per person.',
          },
          price: 600, // Per person
          perPerson: true,
          image: '/images/boat-tour.jpg',
        },
        {
          id: 'wine-tasting',
          name: {
            en: 'Wine Tasting',
            sv: 'Vinprovning',
          },
          description: {
            en: 'Guided wine tasting with a selection of fine wines. Price is per person.',
            sv: 'Guidad vinprovning med ett urval av fina viner. Pris per person.',
          },
          price: 450, // Per person
          perPerson: true,
          image: '/images/wine-tasting.jpg',
        },
        {
          id: 'live-music',
          name: {
            en: 'Live Music',
            sv: 'Livemusik',
          },
          description: {
            en: 'Live music performance for your celebration. Price is for a 3-hour performance.',
            sv: 'Livemusikuppträdande för din fest. Pris för ett 3-timmars uppträdande.',
          },
          price: 8000, // Flat fee
          image: '/images/live-music.jpg',
        },
        {
          id: 'dj',
          name: {
            en: 'DJ Services',
            sv: 'DJ-tjänster',
          },
          description: {
            en: 'Professional DJ to keep your party going. Price is for a 4-hour set.',
            sv: 'Professionell DJ för att hålla din fest igång. Pris för ett 4-timmars set.',
          },
          price: 6000, // Flat fee
          image: '/images/dj.jpg',
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
  baseRates: PricingRate = celebrationPricingData.baseRates,
  seasonalPeriods = celebrationPricingData.seasonalPeriods
): number {
  // If no venue is selected, return 0
  if (!selectedVenue) {
    return 0;
  }

  // Find the selected venue option
  const venueCategory = celebrationPricingData.addOnCategories.find(cat => cat.id === 'venue');
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
  seasonalPeriods = celebrationPricingData.seasonalPeriods
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

    const category = celebrationPricingData.addOnCategories.find(cat => cat.id === categoryId);
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

// Helper function to calculate traditional celebration cost (for comparison)
export function calculateTraditionalCelebrationCost(
  // days parameter is removed as it's not used
  attendees: number = 1
): number {
  // Average cost per person for a traditional celebration venue
  const averageCostPerPerson = 1500; // SEK

  return averageCostPerPerson * attendees;
}

// Helper function to calculate potential savings
export function calculatePotentialSavings(
  diyTotal: number,
  // days parameter removed
  attendees: number = 1
): number {
  const traditionalCost = calculateTraditionalCelebrationCost(attendees);
  return traditionalCost - diyTotal;
}
