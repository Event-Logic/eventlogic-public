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

export interface RetreatPricingData {
  baseRates: PricingRate;
  seasonalPeriods: {
    highSeason: SeasonalPeriod[];
    lowSeason: SeasonalPeriod[];
  };
  addOnCategories: AddOnCategory[];
}

// Retreat pricing data based on the pricing framework
export const retreatPricingData: RetreatPricingData = {
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
            en: 'Exclusive use of the entire inn including all rooms, restaurant, and common areas for your retreat. All accommodation is included in this price.',
            sv: 'Exklusiv användning av hela värdshuset inklusive alla rum, restaurang och gemensamma utrymmen för din retreat. Allt boende ingår i detta pris.',
          },
          price: 15000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/full-venue.jpg',
        },
        {
          id: 'restaurant-and-lounge',
          name: {
            en: 'Restaurant & Lounge',
            sv: 'Restaurang & Lounge',
          },
          description: {
            en: 'Use of the restaurant and lounge areas for your retreat activities, without accommodation.',
            sv: 'Användning av restaurang- och loungeområdena för dina retreataktiviteter, utan boende.',
          },
          price: 8000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/restaurant-lounge.jpg',
        },
        {
          id: 'yoga-space',
          name: {
            en: 'Yoga Space',
            sv: 'Yogautrymme',
          },
          description: {
            en: 'Dedicated space for yoga and meditation sessions, perfect for smaller groups.',
            sv: 'Dedikerat utrymme för yoga- och meditationssessioner, perfekt för mindre grupper.',
          },
          price: 5000, // Base price per day (before seasonal adjustments)
          perDay: true,
          image: '/images/yoga-space.jpg',
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
        en: 'Choose from different catering options for your retreat',
        sv: 'Välj mellan olika cateringalternativ för din retreat',
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
          id: 'vegetarian-menu',
          name: {
            en: 'Vegetarian Menu',
            sv: 'Vegetarisk meny',
          },
          description: {
            en: 'Healthy vegetarian meals prepared by our chefs. Price is per person per day.',
            sv: 'Hälsosamma vegetariska måltider tillagade av våra kockar. Pris per person per dag.',
          },
          price: 550, // Per person per day
          perPerson: true,
          perDay: true,
          image: '/images/vegetarian-menu.jpg',
        },
        {
          id: 'vegan-menu',
          name: {
            en: 'Vegan Menu',
            sv: 'Vegansk meny',
          },
          description: {
            en: 'Nutritious vegan meals prepared by our chefs. Price is per person per day.',
            sv: 'Näringsrika veganska måltider tillagade av våra kockar. Pris per person per dag.',
          },
          price: 550, // Per person per day
          perPerson: true,
          perDay: true,
          image: '/images/vegan-menu.jpg',
        },
        {
          id: 'juice-cleanse',
          name: {
            en: 'Juice Cleanse Package',
            sv: 'Juicerensningspaket',
          },
          description: {
            en: 'Fresh juices and smoothies throughout the day. Price is per person per day.',
            sv: 'Färska juicer och smoothies under hela dagen. Pris per person per dag.',
          },
          price: 450, // Per person per day
          perPerson: true,
          perDay: true,
          image: '/images/juice-cleanse.jpg',
        },
      ],
    },
    {
      id: 'staff',
      name: {
        en: 'Staff & Instructors',
        sv: 'Personal & Instruktörer',
      },
      description: {
        en: 'Professional staff and instructors for your retreat',
        sv: 'Professionell personal och instruktörer för din retreat',
      },
      multiSelect: true, // Allow multiple staff selections
      options: [
        {
          id: 'retreat-coordinator',
          name: {
            en: 'Retreat Coordinator',
            sv: 'Retreatkoordinator',
          },
          description: {
            en: 'On-site coordinator to help manage your retreat. Price is per day.',
            sv: 'Koordinator på plats för att hjälpa till att hantera din retreat. Pris per dag.',
          },
          price: 3500, // Per day
          perDay: true,
          image: '/images/retreat-coordinator.jpg',
        },
        {
          id: 'yoga-instructor',
          name: {
            en: 'Yoga Instructor',
            sv: 'Yogainstruktör',
          },
          description: {
            en: 'Professional yoga instructor for classes. Price is per session (90 minutes).',
            sv: 'Professionell yogainstruktör för klasser. Pris per session (90 minuter).',
          },
          price: 1500, // Per session
          image: '/images/yoga-instructor.jpg',
        },
        {
          id: 'meditation-guide',
          name: {
            en: 'Meditation Guide',
            sv: 'Meditationsguide',
          },
          description: {
            en: 'Experienced meditation guide for group or individual sessions. Price is per session (60 minutes).',
            sv: 'Erfaren meditationsguide för grupp- eller individuella sessioner. Pris per session (60 minuter).',
          },
          price: 1200, // Per session
          image: '/images/meditation-guide.jpg',
        },
        {
          id: 'massage-therapist',
          name: {
            en: 'Massage Therapist',
            sv: 'Massageterapeut',
          },
          description: {
            en: 'Professional massage therapist for relaxation and wellness. Price is per hour.',
            sv: 'Professionell massageterapeut för avslappning och välbefinnande. Pris per timme.',
          },
          price: 800, // Per hour
          image: '/images/massage-therapist.jpg',
        },
      ],
    },
    {
      id: 'equipment',
      name: {
        en: 'Equipment & Supplies',
        sv: 'Utrustning & Tillbehör',
      },
      description: {
        en: 'Equipment and supplies for your retreat activities',
        sv: 'Utrustning och tillbehör för dina retreataktiviteter',
      },
      multiSelect: true, // Allow multiple equipment selections
      options: [
        {
          id: 'yoga-mats',
          name: {
            en: 'Yoga Mats & Props',
            sv: 'Yogamattor & Tillbehör',
          },
          description: {
            en: 'Set of yoga mats, blocks, straps, and blankets for up to 20 people.',
            sv: 'Set med yogamattor, block, remmar och filtar för upp till 20 personer.',
          },
          price: 1000, // Flat fee
          image: '/images/yoga-mats.jpg',
        },
        {
          id: 'meditation-cushions',
          name: {
            en: 'Meditation Cushions',
            sv: 'Meditationskuddar',
          },
          description: {
            en: 'Comfortable meditation cushions and mats for up to 20 people.',
            sv: 'Bekväma meditationskuddar och mattor för upp till 20 personer.',
          },
          price: 500, // Flat fee
          image: '/images/meditation-cushions.jpg',
        },
        {
          id: 'sound-system',
          name: {
            en: 'Sound System',
            sv: 'Ljudsystem',
          },
          description: {
            en: 'High-quality sound system for music and guided meditations.',
            sv: 'Högkvalitativt ljudsystem för musik och guidade meditationer.',
          },
          price: 1000, // Flat fee per day
          perDay: true,
          image: '/images/sound-system.jpg',
        },
        {
          id: 'projector',
          name: {
            en: 'Projector & Screen',
            sv: 'Projektor & Skärm',
          },
          description: {
            en: 'Projector and screen for presentations or video content.',
            sv: 'Projektor och skärm för presentationer eller videoinnehåll.',
          },
          price: 800, // Flat fee per day
          perDay: true,
          image: '/images/projector.jpg',
        },
      ],
    },
    {
      id: 'activities',
      name: {
        en: 'Wellness Activities',
        sv: 'Wellnessaktiviteter',
      },
      description: {
        en: 'Special activities to enhance your retreat experience',
        sv: 'Speciella aktiviteter för att förhöja din retreatupplevelse',
      },
      multiSelect: true, // Allow multiple activity selections
      options: [
        {
          id: 'guided-hike',
          name: {
            en: 'Guided Nature Hike',
            sv: 'Guidad naturvandring',
          },
          description: {
            en: 'Guided hike through the beautiful coastal landscape. Price is per group (up to 15 people).',
            sv: 'Guidad vandring genom det vackra kustlandskapet. Pris per grupp (upp till 15 personer).',
          },
          price: 1500, // Per group
          image: '/images/guided-hike.jpg',
        },
        {
          id: 'sound-bath',
          name: {
            en: 'Sound Bath Session',
            sv: 'Ljudbadssession',
          },
          description: {
            en: 'Immersive sound experience for deep relaxation. Price is per session (60 minutes).',
            sv: 'Immersiv ljudupplevelse för djup avslappning. Pris per session (60 minuter).',
          },
          price: 2500, // Per session
          image: '/images/sound-bath.jpg',
        },
        {
          id: 'sauna-ritual',
          name: {
            en: 'Sauna Ritual',
            sv: 'Basturitual',
          },
          description: {
            en: 'Traditional sauna experience with aromatherapy and cold plunge. Price is per session (2 hours).',
            sv: 'Traditionell bastuupplevelse med aromaterapi och kallbad. Pris per session (2 timmar).',
          },
          price: 3000, // Per session
          image: '/images/sauna-ritual.jpg',
        },
        {
          id: 'kayaking',
          name: {
            en: 'Kayaking Excursion',
            sv: 'Kajakutflykt',
          },
          description: {
            en: 'Guided kayaking tour of the archipelago. Price is per person.',
            sv: 'Guidad kajaktur i skärgården. Pris per person.',
          },
          price: 700, // Per person
          perPerson: true,
          image: '/images/kayaking.jpg',
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
  baseRates: PricingRate = retreatPricingData.baseRates,
  seasonalPeriods = retreatPricingData.seasonalPeriods
): number {
  // If no venue is selected, return 0
  if (!selectedVenue) {
    return 0;
  }
  
  // Find the selected venue option
  const venueCategory = retreatPricingData.addOnCategories.find(cat => cat.id === 'venue');
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
  seasonalPeriods = retreatPricingData.seasonalPeriods
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
    
    const category = retreatPricingData.addOnCategories.find(cat => cat.id === categoryId);
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

// Helper function to calculate traditional retreat cost (for comparison)
export function calculateTraditionalRetreatCost(
  days: number = 1,
  attendees: number = 1
): number {
  // Average cost per person per day for a traditional retreat venue
  const averageCostPerPersonPerDay = 2000; // SEK
  
  return averageCostPerPersonPerDay * attendees * days;
}

// Helper function to calculate potential savings
export function calculatePotentialSavings(
  diyTotal: number,
  days: number = 1,
  attendees: number = 1
): number {
  const traditionalCost = calculateTraditionalRetreatCost(days, attendees);
  return traditionalCost - diyTotal;
}
