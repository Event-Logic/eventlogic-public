import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { PotentialSupplier } from '@/types/supplier';
import { MapPin, Globe, Image as ImageIcon } from 'lucide-react';

interface SupplierCardProps {
  supplier: PotentialSupplier;
  locale: string;
}

export function SupplierCard({ supplier, locale }: SupplierCardProps) {
  // Handle both nested structure (PotentialSupplier) and flat API response
  const name = (supplier as any).name || supplier.business?.supplier_name || 'Unnamed Supplier';
  const location = (supplier as any).location || `${supplier.location?.town || ''}, ${supplier.location?.country || ''}`.trim();
  const website = (supplier as any).website || supplier.urls?.supplier_url;
  const status = (supplier as any).status || supplier.status;
  const rating = (supplier as any).rating || supplier.business?.google_rating;
  const email = (supplier as any).email;
  const phone = (supplier as any).phone;

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
