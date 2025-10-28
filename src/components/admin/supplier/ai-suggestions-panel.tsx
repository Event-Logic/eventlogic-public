'use client';

import { AISuggestion } from '@/types/supplier';
import { Sparkles, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AISuggestionsPanelProps {
  suggestions: AISuggestion[];
  supplierId: number;
}

const priorityColors = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-yellow-200 bg-yellow-50',
  low: 'border-blue-200 bg-blue-50',
};

const priorityIcons = {
  high: AlertCircle,
  medium: Info,
  low: CheckCircle,
};

const typeLabels = {
  missing_data: 'Missing Data',
  image_selection: 'Image Selection',
  resource_extraction: 'Resource Extraction',
  categorization: 'Categorization',
};

export function AISuggestionsPanel({ suggestions, supplierId }: AISuggestionsPanelProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold">AI Suggestions</h2>
        <span className="text-sm text-gray-600">({suggestions.length})</span>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => {
          const Icon = priorityIcons[suggestion.priority] || Info;
          const colorClass = priorityColors[suggestion.priority] || 'border-gray-200 bg-gray-50';

          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${colorClass}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{suggestion.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/50">
                        {typeLabels[suggestion.type]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {suggestion.description}
                    </p>
                  </div>
                </div>

                {suggestion.action && (
                  <Button size="sm" variant="outline" className="ml-4">
                    {suggestion.action}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
