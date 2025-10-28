'use client';

import { Star, MapPin, Globe, ExternalLink } from 'lucide-react';
import { CompleteSupplierResponse } from '@/types/supplier';
import { Locale } from '@/dictionaries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { suppliersAPI } from '@/lib/api/suppliers';
import { useRouter } from 'next/navigation';

interface SupplierHeaderProps {
  supplier: CompleteSupplierResponse;
  locale: Locale;
}

// Status color mapping
const statusColors: Record<string, string> = {
  ready: 'bg-green-500',
  'auto-approved': 'bg-green-500',
  'auto-approved-classification-done': 'bg-green-500',
  'auto-approved-initial-collect-done': 'bg-green-500',
  scraped: 'bg-yellow-500',
  'scraped, fetched contacts': 'bg-yellow-500',
  failed: 'bg-red-500',
  'auto-approved-error': 'bg-red-500',
  pending: 'bg-blue-500',
};

export function SupplierHeader({ supplier, locale }: SupplierHeaderProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      await suppliersAPI.processSupplier(supplier.id, {
        priority: 200,
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to process supplier:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const statusColor =
    statusColors[supplier.basic_info.status] || 'bg-gray-500';

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Logo */}
          {supplier.basic_info.logo_url && (
            <img
              src={supplier.basic_info.logo_url}
              alt={supplier.basic_info.name}
              className="w-16 h-16 object-contain rounded"
            />
          )}

          {/* Main info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{supplier.basic_info.name}</h1>
              <div className={`w-3 h-3 rounded-full ${statusColor}`} />
              <Badge variant="secondary">{supplier.basic_info.status}</Badge>
            </div>

            {supplier.basic_info.subtitle && (
              <p className="text-gray-600 mb-3">{supplier.basic_info.subtitle}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Rating */}
              {supplier.basic_info.google_rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">
                    {supplier.basic_info.google_rating.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Location */}
              {supplier.location.town && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {supplier.location.town}
                    {supplier.location.country && `, ${supplier.location.country}`}
                  </span>
                </div>
              )}

              {/* Website */}
              {supplier.contact.website && (
                <a
                  href={supplier.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Categories */}
            {supplier.basic_info.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {supplier.basic_info.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleProcess}
            disabled={isProcessing}
            variant="default"
          >
            {isProcessing ? 'Processing...' : 'Reprocess'}
          </Button>
          {supplier.external_ids.el_supplier_id && (
            <Button variant="outline" asChild>
              <a
                href={`https://eventlogic.se/admin/suppliers/${supplier.external_ids.el_supplier_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View in EL
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
