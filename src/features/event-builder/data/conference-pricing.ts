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

export interface ConferencePricingData {
  baseRates: PricingRate;
  seasonalPeriods: {
    highSeason: SeasonalPeriod[];
    lowSeason: SeasonalPeriod[];
  };
  addOnCategories: AddOnCategory[];
}

// Conference pricing data based on the pricing framework
export const conferencePricingData: ConferencePricingData = {
  baseRates: {
    // These are now multipliers for the venue options
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
            en: 'Exclusive use of the entire venue including all rooms, restaurant, and common areas. All accommodation is included in this price.',
            sv: 'Exklusiv användning av hela anläggningen inklusive alla rum, restaurang och gemensamma utrymmen. Allt boende ingår i detta pris.',
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
            en: 'Exclusive use of the restaurant area for your event, without accommodation.',
            sv: 'Exklusiv användning av restaurangområdet för ditt evenemang, utan boende.',
          },
          price: 15000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/restaurant.jpg',
        },
        {
          id: 'meeting-rooms',
          name: {
            en: 'Meeting Rooms',
            sv: 'Mötesrum',
          },
          description: {
            en: 'Access to meeting rooms and common areas, without restaurant or accommodation.',
            sv: 'Tillgång till mötesrum och gemensamma utrymmen, utan restaurang eller boende.',
          },
          price: 10000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/meeting-rooms.jpg',
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
        en: 'Choose from different catering options for your conference',
        sv: 'Välj mellan olika cateringalternativ för din konferens',
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
          id: 'full-catering',
          name: {
            en: 'Full-Service Catering',
            sv: 'Komplett catering',
          },
          description: {
            en: 'Professional catering service with staff. Price is per person.',
            sv: 'Professionell cateringtjänst med personal. Pris per person.',
          },
          price: 500, // Per person
          perPerson: true,
          image: '/images/full-catering.jpg',
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
        en: 'Professional staff to assist during your conference',
        sv: 'Professionell personal som hjälper till under din konferens',
      },
      multiSelect: true, // Allow multiple staff selections
      options: [
        {
          id: 'event-coordinator',
          name: {
            en: 'Event Coordinator',
            sv: 'Eventkoordinator',
          },
          description: {
            en: 'On-site coordinator to help manage your event. Price is per hour.',
            sv: 'Koordinator på plats för att hjälpa till att hantera ditt event. Pris per timme.',
          },
          price: 500, // Per hour
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
          id: 'tech-support',
          name: {
            en: 'Technical Support',
            sv: 'Teknisk support',
          },
          description: {
            en: 'Technical assistance for presentations and AV equipment. Price is per hour.',
            sv: 'Teknisk assistans för presentationer och AV-utrustning. Pris per timme.',
          },
          price: 450, // Per hour
          image: '/images/tech-support.jpg',
        },
      ],
    },
    {
      id: 'equipment',
      name: {
        en: 'Equipment Rental',
        sv: 'Utrustningshyra',
      },
      description: {
        en: 'Additional equipment for your conference',
        sv: 'Extra utrustning för din konferens',
      },
      multiSelect: true, // Allow multiple equipment selections
      options: [
        {
          id: 'av-package',
          name: {
            en: 'AV Package',
            sv: 'AV-paket',
          },
          description: {
            en: 'Complete audio-visual setup including projector, screen, sound system, and microphones.',
            sv: 'Komplett audiovisuell installation inklusive projektor, skärm, ljudsystem och mikrofoner.',
          },
          price: 1500, // Flat fee per day
          perDay: true,
          image: '/images/av-package.jpg',
        },
        {
          id: 'conference-supplies',
          name: {
            en: 'Conference Supplies',
            sv: 'Konferensmaterial',
          },
          description: {
            en: 'Notepads, pens, flip charts, markers, and other supplies. Price is per person.',
            sv: 'Anteckningsblock, pennor, blädderblock, markörer och annat material. Pris per person.',
          },
          price: 50, // Per person
          perPerson: true,
          image: '/images/conference-supplies.jpg',
        },
        {
          id: 'extra-tech',
          name: {
            en: 'Additional Technology',
            sv: 'Extra teknik',
          },
          description: {
            en: 'Additional laptops, tablets, or specialized equipment. Price varies by item.',
            sv: 'Extra bärbara datorer, surfplattor eller specialiserad utrustning. Priset varierar beroende på artikel.',
          },
          price: {
            laptop: 500,
            tablet: 300,
            videoConference: 1000,
          },
          image: '/images/extra-tech.jpg',
        },
      ],
    },
    {
      id: 'activities',
      name: {
        en: 'Team Activities',
        sv: 'Teamaktiviteter',
      },
      description: {
        en: 'Engaging activities to enhance team building',
        sv: 'Engagerande aktiviteter för att förbättra teambuilding',
      },
      multiSelect: true, // Allow multiple activity selections
      options: [
        {
          id: 'archipelago-safari',
          name: {
            en: 'Archipelago Safari',
            sv: 'Skärgårdssafari',
          },
          description: {
            en: 'Exciting RIB boat tour through the beautiful Bohuslän archipelago. Price is per person.',
            sv: 'Spännande RIB-båttur genom den vackra Bohusläns skärgård. Pris per person.',
          },
          price: 600, // Per person
          perPerson: true,
          image: '/images/archipelago-safari.jpg',
        },
        {
          id: 'cooking-challenge',
          name: {
            en: 'Cooking Challenge',
            sv: 'Matlagningsutmaning',
          },
          description: {
            en: 'Team cooking competition with professional chef guidance. Price is per person.',
            sv: 'Matlagningsutmaning i lag med professionell kockhandledning. Pris per person.',
          },
          price: 450, // Per person
          perPerson: true,
          image: '/images/cooking-challenge.jpg',
        },
        {
          id: 'guided-tour',
          name: {
            en: 'Historical Village Tour',
            sv: 'Historisk bytur',
          },
          description: {
            en: 'Guided walking tour of Mollösund with local history and stories. Flat fee for the group.',
            sv: 'Guidad promenad i Mollösund med lokal historia och berättelser. Fast pris för gruppen.',
          },
          price: 1500, // Flat fee
          image: '/images/guided-tour.jpg',
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
  baseRates: PricingRate = conferencePricingData.baseRates,
  seasonalPeriods = conferencePricingData.seasonalPeriods
): number {
  // If no venue is selected, return 0
  if (!selectedVenue) {
    return 0;
  }
  
  // Find the selected venue option
  const venueCategory = conferencePricingData.addOnCategories.find(cat => cat.id === 'venue');
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
  seasonalPeriods = conferencePricingData.seasonalPeriods
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
    
    const category = conferencePricingData.addOnCategories.find(cat => cat.id === categoryId);
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

// Helper function to calculate traditional conference cost (for comparison)
export function calculateTraditionalConferenceCost(
  days: number = 1,
  attendees: number = 1
): number {
  // Average cost per person per day at a traditional venue
  const averageCostPerPersonPerDay = 2500; // SEK
  
  return averageCostPerPersonPerDay * days * attendees;
}

// Helper function to calculate potential savings
export function calculatePotentialSavings(
  diyTotal: number,
  days: number = 1,
  attendees: number = 1
): number {
  const traditionalCost = calculateTraditionalConferenceCost(days, attendees);
  return traditionalCost - diyTotal;
}
