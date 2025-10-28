import { notFound } from 'next/navigation';
import { Locale } from '@/dictionaries';
import { suppliersAPI } from '@/lib/api/suppliers';
import { SupplierHeader } from '@/components/admin/supplier/supplier-header';
import { SupplierOverview } from '@/components/admin/supplier/supplier-overview';
import { SupplierImages } from '@/components/admin/supplier/supplier-images';
import { SupplierResources } from '@/components/admin/supplier/supplier-resources';
import { ProcessingTimeline } from '@/components/admin/supplier/processing-timeline';
import { AISuggestionsPanel } from '@/components/admin/supplier/ai-suggestions-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export default async function AdminSupplierDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const supplierId = parseInt(id, 10);

  if (isNaN(supplierId)) {
    notFound();
  }

  let supplier;
  try {
    supplier = await suppliersAPI.getCompleteSupplier(supplierId);
  } catch (error) {
    console.error('Failed to load supplier:', error);
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header with name, status, and quick actions */}
      <SupplierHeader supplier={supplier} />

      {/* AI Suggestions at the top for visibility */}
      {supplier.suggestions && supplier.suggestions.length > 0 && (
        <AISuggestionsPanel suggestions={supplier.suggestions} />
      )}

      {/* Main content tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="images">
            Images ({supplier.images.length})
          </TabsTrigger>
          <TabsTrigger value="resources">
            Resources (
            {supplier.resources.conference_rooms_count +
              supplier.resources.restaurants_count +
              supplier.resources.accommodations_count +
              supplier.resources.activities_count}
            )
          </TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <SupplierOverview supplier={supplier} />
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <SupplierImages
            supplierId={supplier.id}
            images={supplier.images}
          />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <SupplierResources
            supplierId={supplier.id}
            resources={supplier.resources}
            locale={locale}
          />
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <ProcessingTimeline
            timeline={supplier.processing_timeline}
            queue={supplier.queue}
            supplierId={supplier.id}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
