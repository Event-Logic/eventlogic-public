// Define the common event configuration type
export interface EventConfig {
  // Basic details
  date?: Date | string;
  days: number;
  attendees: number;

  // Selected add-ons with their quantities
  selectedAddOns: {
    [key: string]: {
      optionId: string;
      quantity: number;
    };
  };

  // Pricing information
  basePrice?: number;
  totalPrice?: number;
  traditionalCost?: number;
  savings?: number;

  // Metadata
  eventType: 'conference' | 'wedding' | 'celebration' | 'retreat';
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
