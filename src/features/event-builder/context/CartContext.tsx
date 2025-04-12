"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Locale } from "@/dictionaries";
import { SelectedAddOn } from "../data/conference-pricing";

// Define the event configuration type
export interface EventConfiguration {
  id: string;
  eventType: 'conference' | 'wedding' | 'celebration' | 'retreat';
  date: string;
  days: number;
  attendees: number;
  selectedAddOns: Record<string, SelectedAddOn | SelectedAddOn[]>;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

// Define the cart context type
interface CartContextType {
  configurations: EventConfiguration[];
  addConfiguration: (config: Omit<EventConfiguration, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateConfiguration: (id: string, config: Partial<EventConfiguration>) => void;
  removeConfiguration: (id: string) => void;
  clearCart: () => void;
  getConfiguration: (id: string) => EventConfiguration | undefined;
  generateShareableLink: (id: string) => string;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key for cart data
const CART_STORAGE_KEY = 'event-builder-cart';

// Provider component
export function CartProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const [configurations, setConfigurations] = useState<EventConfiguration[]>([]);

  // Load cart data from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setConfigurations(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart data from local storage:', error);
      }
    }
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(configurations));
  }, [configurations]);

  // Add a new configuration to the cart
  const addConfiguration = (config: Omit<EventConfiguration, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newConfig: EventConfiguration = {
      ...config,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setConfigurations((prev) => [...prev, newConfig]);
  };

  // Update an existing configuration
  const updateConfiguration = (id: string, config: Partial<EventConfiguration>) => {
    setConfigurations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...config, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  // Remove a configuration from the cart
  const removeConfiguration = (id: string) => {
    setConfigurations((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all configurations from the cart
  const clearCart = () => {
    setConfigurations([]);
  };

  // Get a specific configuration by ID
  const getConfiguration = (id: string) => {
    return configurations.find((config) => config.id === id);
  };

  // Generate a shareable link for a configuration
  const generateShareableLink = (id: string) => {
    // In a real implementation, this would likely involve a backend API call
    // to store the configuration and generate a unique URL
    // For now, we'll just create a URL with the configuration ID
    return `${window.location.origin}/${locale}/event-builder/shared/${id}`;
  };

  return (
    <CartContext.Provider
      value={{
        configurations,
        addConfiguration,
        updateConfiguration,
        removeConfiguration,
        clearCart,
        getConfiguration,
        generateShareableLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Helper function to generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
