export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    rooms: string;
    dining: string;
    conference: string;
    activities: string;
    about: string;
    contact: string;
    book: string;
    information: string;
    events: string;
    weddings: string;
    celebrations: string;
    retreats: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    about: {
      title: string;
      ingress: string;
      description: string;
    };
    history?: {
      title: string;
      ingress: string;
      description: string;
    };
    modernEra?: {
      title: string;
      ingress: string;
      description: string;
    };
    newGeneration?: {
      title: string;
      ingress: string;
      description: string;
    };
    presentDay?: {
      title: string;
      ingress: string;
      description: string;
    };
    diyEvents?: {
      title: string;
      ingress: string;
      description: string;
      cta: string;
      eventTypes: Array<{
        title: string;
        description: string;
      }>;
    };
    features: {
      title: string;
      ingress: string;
      oceanView: {
        title: string;
        description: string;
      };
      dining: {
        title: string;
        description: string;
      };
      activities: {
        title: string;
        description: string;
      };
    };
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    copyright: string;
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
