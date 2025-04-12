"use client";

import { Locale } from "@/dictionaries";
import { EventBuilderDictionary } from "../../data/translations";
import { calculateBasePrice } from "../../data/conference-pricing";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BasicDetailsTabProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  days: number;
  setDays: (days: number) => void;
  attendees: number;
  setAttendees: (attendees: number) => void;
  onContinue: () => void;
}

export function BasicDetailsTab({ 
  locale, 
  dictionary,
  date,
  setDate,
  days,
  setDays,
  attendees,
  setAttendees,
  onContinue
}: BasicDetailsTabProps) {
  const t = dictionary;
  
  // Calculate base price
  const basePrice = date ? calculateBasePrice(date, days) : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.basicDetails.title}</CardTitle>
        <CardDescription>{t.basicDetails.subtitle}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Date Picker */}
        <div className="space-y-2">
          <Label htmlFor="date">{t.basicDetails.date}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="date"
              >
                {date ? (
                  format(date, "PPP", { locale: locale === 'sv' ? sv : undefined })
                ) : (
                  <span>{t.basicDetails.selectDate}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={locale === 'sv' ? sv : undefined}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Duration Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="days">{t.basicDetails.duration}</Label>
            <span>
              {days} {t.basicDetails.days}
            </span>
          </div>
          <Slider
            id="days"
            min={1}
            max={5}
            step={1}
            value={[days]}
            onValueChange={(value) => setDays(value[0])}
            className="py-4"
          />
        </div>
        
        {/* Attendees Input */}
        <div className="space-y-2">
          <Label htmlFor="attendees">{t.basicDetails.attendees}</Label>
          <Input
            id="attendees"
            type="number"
            min={5}
            max={100}
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value) || 10)}
          />
        </div>
        
        {/* Base Price Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between font-semibold">
            <span>{t.calculator.basePrice}:</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {locale === 'en' 
              ? 'This is the base price for venue rental. Add-ons can be selected in the next step.'
              : 'Detta är grundpriset för lokalhyra. Tillägg kan väljas i nästa steg.'}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button onClick={onContinue}>
          {t.common.next}
        </Button>
      </CardFooter>
    </Card>
  );
}
