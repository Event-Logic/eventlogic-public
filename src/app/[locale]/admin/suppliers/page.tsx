'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { SupplierCard } from '@/components/suppliers/supplier-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { suppliersAPI, type SearchSuppliersParams } from '@/lib/api/suppliers';
import type { PotentialSupplier } from '@/types/supplier';
import { Search, Filter } from 'lucide-react';

export default function SuppliersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const [suppliers, setSuppliers] = useState<PotentialSupplier[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<SearchSuppliersParams>({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || undefined,
    country: searchParams.get('country') || undefined,
    limit: 50,
    offset: 0,
  });

  useEffect(() => {
    loadSuppliers();
  }, [filters]);

  async function loadSuppliers() {
    setLoading(true);
    setError(null);
    try {
      const response = await suppliersAPI.search(filters);
      setSuppliers(response.suppliers || []);
      setTotal(response.total || 0);
    } catch (err) {
      console.error('Failed to load suppliers:', err);
      setError(err instanceof Error ? err.message : 'Failed to load suppliers');
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchChange(value: string) {
    setFilters((prev) => ({ ...prev, search: value, offset: 0 }));
  }

  function handleStatusChange(value: string) {
    setFilters((prev) => ({ ...prev, status: value, offset: 0 }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Browse and manage all suppliers ({total} total)
          </p>
        </div>
        <Button>Add Supplier</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="auto-approved">Auto-approved</SelectItem>
            <SelectItem value="scraped">Scraped</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading suppliers...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          <p className="font-medium">Error loading suppliers</p>
          <p className="text-sm">{error}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={loadSuppliers}>
            Retry
          </Button>
        </div>
      )}

      {/* Suppliers Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {suppliers && suppliers.length > 0 && suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} locale={locale} />
            ))}
          </div>

          {suppliers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No suppliers found</p>
            </div>
          )}

          {/* Pagination */}
          {suppliers.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filters.offset! + 1} to {Math.min(filters.offset! + filters.limit!, total)} of {total}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.offset === 0}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      offset: Math.max(0, prev.offset! - prev.limit!),
                    }))
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.offset! + filters.limit! >= total}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      offset: prev.offset! + prev.limit!,
                    }))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
