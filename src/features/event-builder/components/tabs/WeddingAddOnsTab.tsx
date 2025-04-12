"use client";

import { Locale } from "@/dictionaries";
import { EventBuilderDictionary } from "../../data/translations";
import { 
  calculateBasePrice, 
  calculateTotalPrice,
  weddingPricingData,
  SelectedAddOn
} from "../../data/wedding-pricing";

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WeddingAddOnsTabProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  date: Date | undefined;
  days: number;
  attendees: number;
  selectedAddOns: Record<string, SelectedAddOn | SelectedAddOn[]>;
  setSelectedAddOns: React.Dispatch<React.SetStateAction<Record<string, SelectedAddOn | SelectedAddOn[]>>>;
  onContinue: () => void;
  onBack: () => void;
}

export function WeddingAddOnsTab({ 
  locale, 
  dictionary,
  date,
  days,
  attendees,
  selectedAddOns,
  setSelectedAddOns,
  onContinue,
  onBack
}: WeddingAddOnsTabProps) {
  const t = dictionary;
  
  // Calculate prices
  const basePrice = date ? calculateBasePrice(date, days, selectedAddOns.venue as SelectedAddOn) : 0;
  const totalPrice = date ? calculateTotalPrice(date, days, attendees, selectedAddOns) : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle add-on selection
  const handleAddOnSelect = (categoryId: string, optionId: string, quantity: number = 1) => {
    setSelectedAddOns(prev => {
      const category = weddingPricingData.addOnCategories.find(cat => cat.id === categoryId);
      
      if (category?.multiSelect) {
        // For multi-select categories
        const currentSelections = Array.isArray(prev[categoryId]) 
          ? prev[categoryId] as SelectedAddOn[] 
          : [];
          
        // Check if this option is already selected
        const existingIndex = currentSelections.findIndex(item => item.optionId === optionId);
        
        if (existingIndex >= 0) {
          // Option already selected, remove it (toggle behavior)
          const newSelections = [...currentSelections];
          newSelections.splice(existingIndex, 1);
          
          // If no selections left, remove the category entirely
          if (newSelections.length === 0) {
            const newSelected = { ...prev };
            delete newSelected[categoryId];
            return newSelected;
          } else {
            return {
              ...prev,
              [categoryId]: newSelections
            };
          }
        } else {
          // Add new selection
          return {
            ...prev,
            [categoryId]: [...currentSelections, { optionId, quantity }]
          };
        }
      } else {
        // For single-select categories
        if (optionId === "none") {
          // Remove the category from selected add-ons
          const newSelected = { ...prev };
          delete newSelected[categoryId];
          return newSelected;
        } else {
          // Add or update the category in selected add-ons
          return {
            ...prev,
            [categoryId]: { optionId, quantity }
          };
        }
      }
    });
  };
  
  // Handle add-on quantity change
  const handleQuantityChange = (categoryId: string, optionId: string, quantity: number) => {
    setSelectedAddOns(prev => {
      const category = weddingPricingData.addOnCategories.find(cat => cat.id === categoryId);
      
      if (category?.multiSelect) {
        // For multi-select categories
        if (!Array.isArray(prev[categoryId])) return prev;
        
        const currentSelections = prev[categoryId] as SelectedAddOn[];
        const updatedSelections = currentSelections.map(item => 
          item.optionId === optionId ? { ...item, quantity } : item
        );
        
        return {
          ...prev,
          [categoryId]: updatedSelections
        };
      } else {
        // For single-select categories
        if (!prev[categoryId]) return prev;
        
        return {
          ...prev,
          [categoryId]: { 
            ...(prev[categoryId] as SelectedAddOn), 
            quantity 
          }
        };
      }
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.addOns.title}</CardTitle>
        <CardDescription>{t.addOns.subtitle}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {weddingPricingData.addOnCategories.map((category) => {
          // Skip venue category as it's handled in the basic details tab
          if (category.id === 'venue') return null;
          
          return (
            <div key={category.id} className="space-y-4">
              <h3 className="text-lg font-semibold">{category.name[locale]}</h3>
              <p className="text-sm text-gray-500">{category.description[locale]}</p>
              
              {category.multiSelect ? (
                // Multi-select UI with checkboxes
                <div className="space-y-3">
                  {category.options.map((option) => {
                    // Check if this option is selected
                    const selections = Array.isArray(selectedAddOns[category.id]) 
                      ? selectedAddOns[category.id] as SelectedAddOn[] 
                      : [];
                    const isSelected = selections.some(item => item.optionId === option.id);
                    const selectedItem = selections.find(item => item.optionId === option.id);
                    
                    return (
                      <div key={option.id} className="flex flex-col space-y-2 border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-${option.id}`} 
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleAddOnSelect(category.id, option.id);
                              } else {
                                handleAddOnSelect(category.id, option.id); // Will toggle it off
                              }
                            }}
                          />
                          <Label htmlFor={`${category.id}-${option.id}`} className="font-semibold">
                            {option.name[locale]}
                          </Label>
                        </div>
                        
                        <p className="text-sm text-gray-500 ml-6">{option.description[locale]}</p>
                        
                        <div className="flex justify-between items-center ml-6 mt-2">
                          <div className="text-sm">
                            {typeof option.price === 'number' ? (
                              <span>
                                {formatCurrency(option.price)}
                                {option.perPerson && ` ${t.common.perPerson}`}
                                {option.perDay && ` ${t.common.perDay}`}
                              </span>
                            ) : (
                              <span>
                                {locale === 'en' ? 'Various prices' : 'Olika priser'}
                              </span>
                            )}
                          </div>
                          
                          {isSelected && (
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`${category.id}-${option.id}-quantity`} className="text-sm">
                                {t.common.quantity}:
                              </Label>
                              <Input
                                id={`${category.id}-${option.id}-quantity`}
                                type="number"
                                min={1}
                                max={20}
                                value={selectedItem?.quantity || 1}
                                onChange={(e) => handleQuantityChange(category.id, option.id, parseInt(e.target.value) || 1)}
                                className="w-20 h-8"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Single-select UI with radio buttons
                <RadioGroup 
                  value={selectedAddOns[category.id] ? 
                    (selectedAddOns[category.id] as SelectedAddOn).optionId : 
                    "none"
                  }
                  onValueChange={(value) => {
                    if (value === "none") {
                      // Remove the category from selected add-ons
                      const newSelected = { ...selectedAddOns };
                      delete newSelected[category.id];
                      setSelectedAddOns(newSelected);
                    } else {
                      // Add or update the category in selected add-ons
                      handleAddOnSelect(category.id, value);
                    }
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id={`${category.id}-none`} />
                    <Label htmlFor={`${category.id}-none`} className="font-normal">
                      {locale === 'en' ? 'None' : 'Ingen'}
                    </Label>
                  </div>
                  
                  {category.options.map((option) => {
                    const selection = selectedAddOns[category.id] as SelectedAddOn | undefined;
                    
                    return (
                      <div key={option.id} className="flex flex-col space-y-2 border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={`${category.id}-${option.id}`} />
                          <Label htmlFor={`${category.id}-${option.id}`} className="font-semibold">
                            {option.name[locale]}
                          </Label>
                        </div>
                        
                        <p className="text-sm text-gray-500 ml-6">{option.description[locale]}</p>
                        
                        <div className="flex justify-between items-center ml-6 mt-2">
                          <div className="text-sm">
                            {typeof option.price === 'number' ? (
                              <span>
                                {formatCurrency(option.price)}
                                {option.perPerson && ` ${t.common.perPerson}`}
                                {option.perDay && ` ${t.common.perDay}`}
                              </span>
                            ) : (
                              <span>
                                {locale === 'en' ? 'Various prices' : 'Olika priser'}
                              </span>
                            )}
                          </div>
                          
                          {selection?.optionId === option.id && (
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`${category.id}-quantity`} className="text-sm">
                                {t.common.quantity}:
                              </Label>
                              <Input
                                id={`${category.id}-quantity`}
                                type="number"
                                min={1}
                                max={20}
                                value={selection?.quantity || 1}
                                onChange={(e) => handleQuantityChange(category.id, option.id, parseInt(e.target.value) || 1)}
                                className="w-20 h-8"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}
            </div>
          );
        })}
        
        {/* Updated Price Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{t.calculator.basePrice}:</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t.calculator.addOns}:</span>
            <span>{formatCurrency(totalPrice - basePrice)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>{t.calculator.totalPrice}:</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t.common.back}
        </Button>
        <Button onClick={onContinue}>
          {t.common.next}
        </Button>
      </CardFooter>
    </Card>
  );
}
