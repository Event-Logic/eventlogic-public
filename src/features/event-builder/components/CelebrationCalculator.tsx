"use client";

import { useState } from "react";
import { Locale } from "@/dictionaries";
import { EventBuilderDictionary } from "../data/translations";
import { 
  calculateBasePrice, 
  calculateTotalPrice,
  calculateTraditionalCelebrationCost,
  calculatePotentialSavings,
  celebrationPricingData,
  SelectedAddOn
} from "../data/celebration-pricing";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

interface CelebrationCalculatorProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  embedded?: boolean;
  onAddToCart?: (configuration: any) => void;
}

export function CelebrationCalculator({ 
  locale, 
  dictionary,
  embedded = false,
  onAddToCart
}: CelebrationCalculatorProps) {
  const t = dictionary;
  
  // State for calculator inputs
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState<number>(1);
  const [attendees, setAttendees] = useState<number>(30);
  const [selectedVenue, setSelectedVenue] = useState<SelectedAddOn>({
    optionId: 'restaurant-only',
    quantity: 1
  });
  
  // Calculate prices
  const basePrice = date ? calculateBasePrice(date, days, selectedVenue) : 0;
  const totalPrice = date ? calculateTotalPrice(date, days, attendees, { venue: selectedVenue }) : 0;
  const traditionalCost = calculateTraditionalCelebrationCost(days, attendees);
  const savings = calculatePotentialSavings(totalPrice, days, attendees);
  const savingsPercentage = traditionalCost > 0 ? Math.round((savings / traditionalCost) * 100) : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!date || !onAddToCart) return;
    
    onAddToCart({
      eventType: 'celebration',
      date: date.toISOString(),
      days,
      attendees,
      selectedAddOns: { venue: selectedVenue },
      totalPrice,
    });
  };
  
  return (
    <Card className={cn(embedded ? "shadow-none border-0" : "")}>
      <CardHeader className={cn(embedded ? "px-0" : "")}>
        <CardTitle>{t.calculator.celebrationTitle}</CardTitle>
        <CardDescription>{t.calculator.celebrationDescription}</CardDescription>
      </CardHeader>
      
      <CardContent className={cn("space-y-6", embedded ? "px-0" : "")}>
        {/* Date Selection */}
        <div className="space-y-2">
          <Label htmlFor="date">{t.calculator.date}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", { locale: locale === 'sv' ? sv : undefined })
                ) : (
                  <span>{locale === 'en' ? 'Select date' : 'Välj datum'}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Duration Selection */}
        <div className="space-y-2">
          <Label htmlFor="days">{t.calculator.duration}</Label>
          <Select
            value={days.toString()}
            onValueChange={(value) => setDays(parseInt(value))}
          >
            <SelectTrigger id="days">
              <SelectValue placeholder={t.calculator.selectDuration} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 {t.calculator.day}</SelectItem>
              <SelectItem value="2">2 {t.calculator.days}</SelectItem>
              <SelectItem value="3">3 {t.calculator.days}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Attendees Input */}
        <div className="space-y-2">
          <Label htmlFor="attendees">{t.calculator.attendees}</Label>
          <Input
            id="attendees"
            type="number"
            min={1}
            max={100}
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value) || 1)}
          />
        </div>
        
        {/* Venue Selection */}
        <div className="space-y-2">
          <Label htmlFor="venue">{t.calculator.venue}</Label>
          <Select
            value={selectedVenue.optionId}
            onValueChange={(value) => setSelectedVenue({ optionId: value, quantity: 1 })}
          >
            <SelectTrigger id="venue">
              <SelectValue placeholder={t.calculator.selectVenue} />
            </SelectTrigger>
            <SelectContent>
              {celebrationPricingData.addOnCategories
                .find(cat => cat.id === 'venue')?.options
                .map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name[locale]}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Summary */}
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">{t.calculator.basePrice}:</span>
              <span>{formatCurrency(basePrice)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>{t.calculator.totalPrice}:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
        
        {/* Savings Comparison */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold mb-2">{t.calculator.savingsComparison}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>{t.calculator.traditionalCost}:</span>
              <span className="font-semibold">{formatCurrency(traditionalCost)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>DIY {t.calculator.totalPrice}:</span>
              <span className="font-semibold">{formatCurrency(totalPrice)}</span>
            </div>
            
            <div className="flex justify-between items-center text-green-600">
              <span>{t.calculator.potentialSavings}:</span>
              <span className="font-semibold">{formatCurrency(savings)} ({savingsPercentage}%)</span>
            </div>
            
            {/* Savings Visualization */}
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{locale === 'en' ? 'Your Cost' : 'Din kostnad'}</span>
                <span>{locale === 'en' ? 'Traditional Cost' : 'Traditionell kostnad'}</span>
              </div>
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  style={{ width: `${Math.min(100, (totalPrice / traditionalCost) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>{formatCurrency(totalPrice)}</span>
                <span>{formatCurrency(traditionalCost)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {onAddToCart && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
          >
            {t.calculator.addToCart}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
