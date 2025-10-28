import { MapSupplierData } from '@/types/supplier';
import { Building2, Loader } from 'lucide-react';

interface MapStatsProps {
  suppliers: MapSupplierData[];
  loading: boolean;
}

export function MapStats({ suppliers, loading }: MapStatsProps) {
  const statusCounts = suppliers.reduce((acc, supplier) => {
    acc[supplier.status] = (acc[supplier.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const readyCount = Object.entries(statusCounts)
    .filter(([status]) => status.includes('ready') || status.includes('auto-approved'))
    .reduce((sum, [, count]) => sum + count, 0);

  const processingCount = Object.entries(statusCounts)
    .filter(([status]) => status.includes('scraped') || status.includes('processing'))
    .reduce((sum, [, count]) => sum + count, 0);

  const failedCount = Object.entries(statusCounts)
    .filter(([status]) => status.includes('failed') || status.includes('error'))
    .reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Total Visible"
        value={suppliers.length}
        color="blue"
        loading={loading}
        icon={Building2}
      />
      <StatCard
        label="Ready"
        value={readyCount}
        color="green"
        loading={loading}
      />
      <StatCard
        label="Processing"
        value={processingCount}
        color="yellow"
        loading={loading}
      />
      <StatCard
        label="Failed"
        value={failedCount}
        color="red"
        loading={loading}
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: 'blue' | 'green' | 'yellow' | 'red';
  loading: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

function StatCard({ label, value, color, loading, icon: Icon }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium opacity-80">{label}</div>
          <div className="text-2xl font-bold mt-1">
            {loading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              value.toLocaleString()
            )}
          </div>
        </div>
        {Icon && <Icon className="w-8 h-8 opacity-50" />}
      </div>
    </div>
  );
}
