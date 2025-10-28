import { Locale } from '@/dictionaries';
import { SupplierMap } from '@/components/admin/supplier-map/supplier-map';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export const metadata = {
  title: 'Supplier Map - Admin',
  description: 'Live map visualization of all suppliers',
};

export default async function AdminSupplierMapPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supplier Map</h1>
        <p className="text-gray-600 mt-2">
          Live visualization of all suppliers with geographic filtering and real-time updates
        </p>
      </div>

      <SupplierMap locale={locale} />
    </div>
  );
}
