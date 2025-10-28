export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    solutions: string;
    features: string;
    about: string;
    resources: string;
    pricing: string;
    contact: string;
    login: string;
    demo: string;
    register: string;
    meeting_planners: string;
    meeting_planners_desc: string;
    buyers: string;
    buyers_desc: string;
    travel_agencies: string;
    travel_agencies_desc: string;
    suppliers: string;
    suppliers_desc: string;
    express_booking: string;
    find_suppliers: string;
    find_suppliers_desc: string;
    compare_offers: string;
    compare_offers_desc: string;
    participant_management: string;
    participant_management_desc: string;
    reports: string;
    reports_desc: string;
    event_coach: string;
    event_coach_desc: string;
    strategic_meeting_management: string;
    strategic_meeting_management_desc: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      create_event: string;
    };
    about: {
      title: string;
      ingress: string;
      description: string;
    };
    for_types: {
      title: string;
      meeting_planners: {
        title: string;
        description: string;
      };
      buyers: {
        title: string;
        description: string;
      };
      travel_agencies: {
        title: string;
        description: string;
      };
      suppliers: {
        title: string;
        description: string;
      };
    };
    event_types: {
      title: string;
      conferences: string;
      meetings: string;
      dinners: string;
      events: string;
      christmas: string;
    };
    steps: {
      title: string;
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
      step4: {
        title: string;
        description: string;
      };
      step5: {
        title: string;
        description: string;
      };
      step6: {
        title: string;
        description: string;
      };
    };
    testimonials: {
      title: string;
      testimonial1: {
        text: string;
        author: string;
      };
      testimonial2: {
        text: string;
        author: string;
      };
      testimonial3: {
        text: string;
        author: string;
      };
    };
    help: {
      title: string;
      description: string;
      contact_text: string;
      contact_button: string;
    };
    event_coach: {
      title: string;
      description1: string;
      description2: string;
    };
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    copyright: string;
    quick_links: {
      title: string;
      home: string;
      contact: string;
      pricing: string;
      suppliers: string;
      all_categories: string;
      all_locations: string;
      all_activity_types: string;
    };
    about: {
      title: string;
      description: string;
    };
    follow_us: string;
    all_rights_reserved: string;
    cookies: string;
    privacy_policy: string;
    strategic_meeting: string;
  };
  booking: {
    title: string;
    subtitle: string;
    intro: string;
    roomTypes: {
      title: string;
      standard: {
        title: string;
        description: string;
      };
      deluxe: {
        title: string;
        description: string;
      };
      suite: {
        title: string;
        description: string;
      };
    };
    policies: {
      title: string;
      checkIn: string;
      checkOut: string;
      cancellation: string;
      pets: string;
      payment: string;
    };
    faq: {
      title: string;
      questions: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
  konferens?: {
    title: string;
    subtitle: string;
    intro: string;
    packages?: {
      title: string;
      included: string;
      items: string[];
      day?: {
        title: string;
        description: string;
        includes: string[];
        price: string;
      };
      overnight?: {
        title: string;
        description: string;
        includes: string[];
        price: string;
      };
    };
    facilities?: {
      title: string;
      mainHall?: {
        title: string;
        description: string;
        features: string[];
      };
      seaRoom?: {
        title: string;
        description: string;
        features: string[];
      };
    };
    activities?: {
      title: string;
      description: string;
      options: Array<{
        title: string;
        description: string;
      }>;
    };
    contact?: {
      title: string;
      email: string;
      phone: string;
      note: string;
    };
  };
  restaurang?: {
    title: string;
    subtitle: string;
    status: string;
    note: string;
    about: {
      title: string;
      description1: string;
      description2: string;
    };
    events: {
      title: string;
      description: string;
      options: Array<{
        title: string;
        description: string;
      }>;
      note: string;
    };
    menu: {
      title: string;
      description: string;
      starters: {
        title: string;
        items: Array<{
          name: string;
          description: string;
        }>;
      };
      mains: {
        title: string;
        items: Array<{
          name: string;
          description: string;
        }>;
      };
      desserts: {
        title: string;
        items: Array<{
          name: string;
          description: string;
        }>;
      };
    };
    contact: {
      title: string;
      email: string;
      phone: string;
      note: string;
    };
  };
  kontakt?: {
    title: string;
    subtitle: string;
    info: {
      title: string;
      address: {
        label: string;
        street: string;
        postal: string;
        country: string;
      };
      phone: {
        label: string;
        number: string;
      };
      email: {
        label: string;
        address: string;
      };
      hours: {
        label: string;
        weekdays: string;
        weekend: string;
        note: string;
      };
    };
    departments: {
      title: string;
      hotel: {
        title: string;
        description: string;
        email: string;
        phone: string;
      };
      restaurant: {
        title: string;
        description: string;
        email: string;
        phone: string;
      };
      conference: {
        title: string;
        description: string;
        email: string;
        phone: string;
      };
    };
    directions: {
      title: string;
      car: {
        title: string;
        from: string;
        steps: string[];
        parking: string;
      };
      public: {
        title: string;
        from: string;
        steps: string[];
        note: string;
      };
    };
    faq: {
      title: string;
      questions: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
}
