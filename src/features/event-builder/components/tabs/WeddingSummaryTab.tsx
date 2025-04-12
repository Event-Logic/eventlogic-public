"use client";

import { Locale } from "@/dictionaries";
import { EventBuilderDictionary } from "../../data/translations";
import {
  calculateBasePrice,
  calculateTotalPrice,
  calculateTraditionalWeddingCost,
  calculatePotentialSavings,
  weddingPricingData,
  SelectedAddOn
} from "../../data/wedding-pricing";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

// UI Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface WeddingSummaryTabProps {
  locale: Locale;
  dictionary: EventBuilderDictionary;
  date: Date | undefined;
  days: number;
  attendees: number;
  selectedAddOns: Record<string, SelectedAddOn | SelectedAddOn[]>;
  isSaved: boolean;
  onSave: () => void;
  onBack: () => void;
}

export function WeddingSummaryTab({
  locale,
  dictionary,
  date,
  days,
  attendees,
  selectedAddOns,
  isSaved,
  onSave,
  onBack
}: WeddingSummaryTabProps) {
  const t = dictionary;

  // Calculate prices
  const basePrice = date ? calculateBasePrice(date, days, selectedAddOns.venue as SelectedAddOn) : 0;
  const totalPrice = date ? calculateTotalPrice(date, days, attendees, selectedAddOns) : 0;
  const traditionalCost = calculateTraditionalWeddingCost(attendees);
  const savings = calculatePotentialSavings(totalPrice, attendees);
  const savingsPercentage = traditionalCost > 0 ? Math.round((savings / traditionalCost) * 100) : 0;

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
        <CardTitle>{t.summary.title}</CardTitle>
        <CardDescription>{t.summary.subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Event Details Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.summary.eventDetails}</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t.basicDetails.date}</p>
                <p className="font-medium">
                  {date ? format(date, "PPP", { locale: locale === 'sv' ? sv : undefined }) : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.basicDetails.duration}</p>
                <p className="font-medium">{days} {t.basicDetails.days}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.basicDetails.attendees}</p>
                <p className="font-medium">{attendees}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.calculator.venue}</p>
                <p className="font-medium">
                  {selectedAddOns.venue ?
                    weddingPricingData.addOnCategories
                      .find(cat => cat.id === 'venue')?.options
                      .find(opt => opt.id === (selectedAddOns.venue as SelectedAddOn).optionId)
                      ?.name[locale] || '-'
                    : '-'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Add-ons Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.summary.selectedAddOns}</h3>
          {Object.keys(selectedAddOns).length > 1 ? ( // > 1 because venue is always selected
            <div className="space-y-3">
              {Object.entries(selectedAddOns).map(([categoryId, selection]) => {
                // Skip venue as it's shown in the event details
                if (categoryId === 'venue') return null;

                const category = weddingPricingData.addOnCategories.find(cat => cat.id === categoryId);
                if (!category) return null;

                if (Array.isArray(selection)) {
                  // Handle multiple selections
                  return (
                    <div key={categoryId} className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium mb-2">{category.name[locale]}</p>
                      {selection.map((item) => {
                        const option = category.options.find(opt => opt.id === item.optionId);
                        if (!option) return null;

                        return (
                          <div key={`${categoryId}-${item.optionId}`} className="ml-4 mb-2 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm">{option.name[locale]}</p>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-gray-500">
                                    {t.common.quantity}: {item.quantity}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {typeof option.price === 'number' ? (
                                    formatCurrency(option.price * item.quantity)
                                  ) : (
                                    locale === 'en' ? 'Various prices' : 'Olika priser'
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {option.perPerson && `${t.common.perPerson}`}
                                  {option.perDay && `${t.common.perDay}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                } else {
                  // Handle single selection
                  const option = category.options.find(opt => opt.id === selection.optionId);
                  if (!option) return null;

                  return (
                    <div key={categoryId} className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{category.name[locale]}</p>
                          <p className="text-sm">{option.name[locale]}</p>
                          {selection.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              {t.common.quantity}: {selection.quantity}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {typeof option.price === 'number' ? (
                              formatCurrency(option.price * selection.quantity)
                            ) : (
                              locale === 'en' ? 'Various prices' : 'Olika priser'
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {option.perPerson && `${t.common.perPerson}`}
                            {option.perDay && `${t.common.perDay}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              {locale === 'en' ? 'No additional add-ons selected' : 'Inga ytterligare tillägg valda'}
            </p>
          )}
        </div>

        {/* Price Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.summary.priceSummary}</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.calculator.basePrice}:</span>
                <span>{formatCurrency(basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.calculator.addOns}:</span>
                <span>{formatCurrency(totalPrice - basePrice)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>{t.calculator.totalPrice}:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.summary.comparisonTitle}</h3>
          <p className="text-sm text-gray-500 mb-4">{t.summary.comparisonSubtitle}</p>

          <div className="bg-gray-50 p-4 rounded-md">
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
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          {t.common.back}
        </Button>
        <Button
          onClick={onSave}
          className={isSaved ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isSaved
            ? (locale === 'en' ? 'Saved to Cart!' : 'Sparad i kundvagnen!')
            : t.common.save}
        </Button>
      </CardFooter>
    </Card>
  );
}
