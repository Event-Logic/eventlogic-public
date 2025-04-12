"use client";

import { useCart, EventConfiguration } from "../context/CartContext";
import { EventBuilderDictionary } from "../data/translations";
import { Locale } from "@/dictionaries";
import { useState } from "react";
import Link from "next/link";

// UI Components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface CartDisplayProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
}

export function CartDisplay({ locale, dictionary }: CartDisplayProps) {
  const t = dictionary;
  const { configurations, removeConfiguration, generateShareableLink } = useCart();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP", { locale: locale === 'sv' ? sv : undefined });
  };
  
  // Get event type name
  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'conference':
        return t.eventTypes.conference;
      case 'wedding':
        return t.eventTypes.wedding;
      case 'celebration':
        return t.eventTypes.celebration;
      case 'retreat':
        return t.eventTypes.retreat;
      default:
        return type;
    }
  };
  
  // Get event page URL based on event type
  const getEventPageUrl = (eventType: string, configId: string) => {
    const queryParams = `?id=${configId}`;
    
    switch (eventType) {
      case 'conference':
        return `/${locale}/${locale === 'en' ? 'conference' : 'konferens'}${queryParams}`;
      case 'wedding':
        return `/${locale}/${locale === 'en' ? 'weddings' : 'brollop'}${queryParams}`;
      case 'celebration':
        return `/${locale}/${locale === 'en' ? 'celebrations' : 'fester'}${queryParams}`;
      case 'retreat':
        return `/${locale}/${locale === 'en' ? 'retreats' : 'retreats'}${queryParams}`;
      default:
        // Fallback to the event-builder page if the event type is unknown
        return `/${locale}/event-builder/${eventType}${queryParams}`;
    }
  };
  
  // Handle share button click
  const handleShare = (id: string) => {
    const link = generateShareableLink(id);
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
    });
  };
  
  if (configurations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">{t.cart.empty}</h3>
        <div className="space-y-4">
          <p className="text-gray-600">
            {locale === 'en' 
              ? 'Choose an event type to create a new configuration:' 
              : 'Välj en evenemangstyp för att skapa en ny konfiguration:'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href={`/${locale}/${locale === 'en' ? 'conference' : 'konferens'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              {t.eventTypes.conference}
            </Link>
            <Link 
              href={`/${locale}/${locale === 'en' ? 'weddings' : 'brollop'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              {t.eventTypes.wedding}
            </Link>
            <Link 
              href={`/${locale}/${locale === 'en' ? 'celebrations' : 'fester'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              {t.eventTypes.celebration}
            </Link>
            <Link 
              href={`/${locale}/${locale === 'en' ? 'retreats' : 'retreats'}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              {t.eventTypes.retreat}
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {configurations.length} {t.cart.items}
        </h3>
      </div>
      
      {configurations.map((config) => (
        <Card key={config.id} className="shadow-md">
          <CardHeader className="bg-gray-50 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                {getEventTypeName(config.eventType)}
              </CardTitle>
              <span className="text-sm text-gray-500">
                {locale === 'en' ? 'Created: ' : 'Skapad: '}
                {formatDate(config.createdAt)}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {locale === 'en' ? 'Event Details' : 'Evenemangsdetaljer'}
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="text-gray-600">{t.basicDetails.date}:</span>{' '}
                    {formatDate(config.date)}
                  </li>
                  <li>
                    <span className="text-gray-600">{t.basicDetails.duration}:</span>{' '}
                    {config.days} {t.basicDetails.days}
                  </li>
                  <li>
                    <span className="text-gray-600">{t.basicDetails.attendees}:</span>{' '}
                    {config.attendees}
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">
                  {t.summary.priceSummary}
                </h4>
                <div className="text-xl font-bold text-blue-600">
                  {formatCurrency(config.totalPrice)}
                </div>
                <div className="mt-2">
                  <Link 
                    href={getEventPageUrl(config.eventType, config.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {locale === 'en' ? 'View Details' : 'Visa detaljer'}
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="flex justify-between py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeConfiguration(config.id)}
            >
              {t.common.remove}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare(config.id)}
            >
              {copiedId === config.id 
                ? (locale === 'en' ? 'Copied!' : 'Kopierad!') 
                : t.common.share}
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      <div className="flex justify-end mt-6">
        <Link 
          href={`/${locale}/kontakt`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          {locale === 'en' ? 'Request Quote' : 'Begär offert'}
        </Link>
      </div>
    </div>
  );
}
