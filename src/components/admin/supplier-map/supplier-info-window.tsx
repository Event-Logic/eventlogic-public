'use client';

import { MapSupplierData } from '@/types/supplier';
import { Locale } from '@/dictionaries';
import { Star, MapPin, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SupplierInfoWindowProps {
  supplier: MapSupplierData;
  onClose: () => void;
  locale: Locale;
}

export function SupplierInfoWindow({ supplier, onClose, locale }: SupplierInfoWindowProps) {
  if (!supplier) return null;

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-2xl border max-w-sm w-full z-10">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{supplier.name}</h3>
          {supplier.primary_category && (
            <p className="text-sm text-gray-500 capitalize">{supplier.primary_category}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Status */}
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: supplier.status_color }}
          />
          <span className="text-sm text-gray-700 capitalize">{supplier.status}</span>
        </div>

        {/* Rating */}
        {supplier.google_rating && (
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{supplier.google_rating.toFixed(1)}</span>
          </div>
        )}

        {/* Coordinates */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            {supplier.coordinates.lat.toFixed(4)}, {supplier.coordinates.lng.toFixed(4)}
          </span>
        </div>

        {/* Image count */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Image className="w-4 h-4" aria-label="Images" />
          <span>{supplier.image_count} images</span>
        </div>

        {/* Resources */}
        {supplier.has_resources && (
          <div className="text-sm text-green-600 font-medium">✓ Has resources</div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
        <Button asChild className="w-full">
          <Link href={`/${locale}/admin/suppliers/${supplier.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
