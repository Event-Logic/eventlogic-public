"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/dictionaries";
import { EventBuilderDictionary } from "../data/translations";
import { 
  calculateTotalPrice,
  SelectedAddOn
} from "../data/wedding-pricing";
import { useCart } from "../context/CartContext";
import { useToast } from "@/hooks/use-toast";

// Tab Components
import { WeddingBasicDetailsTab } from "./tabs/WeddingBasicDetailsTab";
import { WeddingAddOnsTab } from "./tabs/WeddingAddOnsTab";
import { WeddingSummaryTab } from "./tabs/WeddingSummaryTab";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FullWeddingBuilderProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  initialDate?: Date;
  initialDays?: number;
  initialAttendees?: number;
  initialVenue?: string;
  configId?: string;
}

export function FullWeddingBuilder({ 
  locale, 
  dictionary,
  initialDate,
  initialDays,
  initialAttendees,
  initialVenue,
  configId
}: FullWeddingBuilderProps) {
  const t = dictionary;
  const { addConfiguration, getConfiguration } = useCart();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState("details");
  
  // State for calculator inputs
  const [date, setDate] = useState<Date | undefined>(initialDate || new Date());
  const [days, setDays] = useState<number>(initialDays || 1);
  const [attendees, setAttendees] = useState<number>(initialAttendees || 50);
  
  // State for selected add-ons - updated to support multiple selections
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, SelectedAddOn | SelectedAddOn[]>>({
    venue: { optionId: initialVenue || 'full-venue', quantity: 1 }
  });
  
  // State for saving status
  const [isSaved, setIsSaved] = useState(false);
  
  // Toast hook
  const { toast } = useToast();
  
  // Load configuration if configId is provided
  useEffect(() => {
    if (configId) {
      const config = getConfiguration(configId);
      if (config) {
        setDate(new Date(config.date));
        setDays(config.days);
        setAttendees(config.attendees);
        setSelectedAddOns(config.selectedAddOns);
      }
    }
  }, [configId, getConfiguration]);
  
  // Handle save button click
  const handleSave = () => {
    if (!date) return;
    
    const totalPrice = calculateTotalPrice(date, days, attendees, selectedAddOns);
    
    addConfiguration({
      eventType: 'wedding',
      date: date.toISOString(),
      days,
      attendees,
      selectedAddOns,
      totalPrice,
    });
    
    // Show toast notification
    toast({
      title: locale === 'en' ? 'Configuration Saved' : 'Konfiguration sparad',
      description: locale === 'en' 
        ? 'Your wedding configuration has been saved to the cart.' 
        : 'Din bröllopskonfiguration har sparats i kundvagnen.',
      variant: 'default',
    });
    
    // Update saved state for button feedback
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };
  
  // Handle continue to next tab
  const handleContinue = () => {
    if (activeTab === "details") {
      setActiveTab("addons");
    } else if (activeTab === "addons") {
      setActiveTab("summary");
    }
  };
  
  // Handle back to previous tab
  const handleBack = () => {
    if (activeTab === "addons") {
      setActiveTab("details");
    } else if (activeTab === "summary") {
      setActiveTab("addons");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="details">{t.steps.basicDetails}</TabsTrigger>
          <TabsTrigger value="addons">{t.steps.addOns}</TabsTrigger>
          <TabsTrigger value="summary">{t.steps.summary}</TabsTrigger>
        </TabsList>
        
        {/* Basic Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <WeddingBasicDetailsTab 
            locale={locale}
            dictionary={dictionary}
            date={date}
            setDate={setDate}
            days={days}
            setDays={setDays}
            attendees={attendees}
            setAttendees={setAttendees}
            selectedVenue={selectedAddOns.venue as SelectedAddOn}
            setSelectedVenue={(venue) => setSelectedAddOns(prev => ({ ...prev, venue }))}
            onContinue={handleContinue}
          />
        </TabsContent>
        
        {/* Add-ons Tab */}
        <TabsContent value="addons" className="space-y-6">
          <WeddingAddOnsTab 
            locale={locale}
            dictionary={dictionary}
            date={date}
            days={days}
            attendees={attendees}
            selectedAddOns={selectedAddOns}
            setSelectedAddOns={setSelectedAddOns}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        </TabsContent>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <WeddingSummaryTab 
            locale={locale}
            dictionary={dictionary}
            date={date}
            days={days}
            attendees={attendees}
            selectedAddOns={selectedAddOns}
            isSaved={isSaved}
            onSave={handleSave}
            onBack={handleBack}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
