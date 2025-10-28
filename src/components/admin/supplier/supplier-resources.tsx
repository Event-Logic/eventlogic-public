import { Locale } from '@/dictionaries';
import { Building2, Utensils, Bed, Activity } from 'lucide-react';

interface SupplierResourcesProps {
  supplierId: number;
  resources: {
    conference_rooms_count: number;
    restaurants_count: number;
    accommodations_count: number;
    activities_count: number;
  };
  locale: Locale;
}

export function SupplierResources({ resources }: SupplierResourcesProps) {
  return (
    <div className="grid gap-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <ResourceCard
          icon={Building2}
          title="Conference Rooms"
          count={resources.conference_rooms_count}
          color="blue"
        />
        <ResourceCard
          icon={Utensils}
          title="Restaurants"
          count={resources.restaurants_count}
          color="green"
        />
        <ResourceCard
          icon={Bed}
          title="Accommodations"
          count={resources.accommodations_count}
          color="purple"
        />
        <ResourceCard
          icon={Activity}
          title="Activities"
          count={resources.activities_count}
          color="orange"
        />
      </div>

      {/* Detailed lists would go here */}
      <div className="bg-white border rounded-lg p-6">
        <p className="text-gray-500 text-center py-8">
          Detailed resource listings will be implemented in next phase.
          <br />
          For now, see counts above.
        </p>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function ResourceCard({ icon: Icon, title, count, color }: ResourceCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
      <Icon className="w-8 h-8 mb-3" />
      <div className="text-3xl font-bold mb-1">{count}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
}
