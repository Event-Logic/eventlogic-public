import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { PotentialSupplier } from '@/types/supplier';
import { MapPin, Globe } from 'lucide-react';

interface FlatSupplierResponse {
  id: number;
  name?: string;
  location?: string;
  website?: string;
  status?: string;
  rating?: number;
  email?: string;
  phone?: string;
}

type SupplierData = PotentialSupplier | FlatSupplierResponse;

interface SupplierCardProps {
  supplier: SupplierData;
  locale: string;
}

function isFlatSupplier(supplier: SupplierData): supplier is FlatSupplierResponse {
  return 'name' in supplier;
}

export function SupplierCard({ supplier, locale }: SupplierCardProps) {
  // Handle both nested structure (PotentialSupplier) and flat API response
  const name = isFlatSupplier(supplier)
    ? supplier.name || 'Unnamed Supplier'
    : supplier.business?.supplier_name || 'Unnamed Supplier';

  const location = isFlatSupplier(supplier)
    ? supplier.location
    : `${supplier.location?.town || ''}, ${supplier.location?.country || ''}`.trim();

  const website = isFlatSupplier(supplier)
    ? supplier.website
    : supplier.urls?.supplier_url;

  const status = supplier.status;

  const rating = isFlatSupplier(supplier)
    ? supplier.rating
    : supplier.business?.google_rating;

  const email = isFlatSupplier(supplier) ? supplier.email : undefined;
  const phone = isFlatSupplier(supplier) ? supplier.phone : undefined;

  return (
    <Link href={`/${locale}/admin/suppliers/${supplier.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-2 flex-1">
              {name}
            </CardTitle>
            {status && (
              <Badge
                variant={status.includes('fail') || status.includes('error') ? 'destructive' : 'secondary'}
                className="shrink-0"
              >
                {status.split(':')[0].trim()}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {location && location !== ',' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </span>
            </div>
          )}
          {rating && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">⭐ {typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
            </div>
          )}
          {(email || phone) && (
            <div className="text-xs text-muted-foreground pt-2 border-t">
              {email && <div className="truncate">{email}</div>}
              {phone && <div>{phone}</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
