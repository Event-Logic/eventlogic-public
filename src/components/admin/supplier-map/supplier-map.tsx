'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGoogleMapsLoader } from '@/hooks/useGoogleMapsLoader';
import { suppliersAPI } from '@/lib/api/suppliers';
import { MapSupplierData } from '@/types/supplier';
import { Locale } from '@/dictionaries';
import { MapControls } from './map-controls';
import { MapStats } from './map-stats';
import { SupplierInfoWindow } from './supplier-info-window';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface SupplierMapProps {
  locale: Locale;
}

export function SupplierMap({ locale }: SupplierMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<Map<number, any>>(new Map());

  const [suppliers, setSuppliers] = useState<MapSupplierData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<MapSupplierData | null>(null);
  const [hoveredSupplier, setHoveredSupplier] = useState<number | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const { isLoaded, loadError } = useGoogleMapsLoader({
    apiKey: GOOGLE_MAPS_API_KEY,
  });

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map.current) return;

    map.current = new google.maps.Map(mapRef.current, {
      center: { lat: 59.3293, lng: 18.0686 }, // Stockholm default
      zoom: 6,
      mapId: 'supplier-admin-map', // For advanced markers
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    // Click map to deselect
    map.current.addListener('click', () => {
      setSelectedSupplier(null);
      setHoveredSupplier(null);
    });
  }, [isLoaded]);

  // Fetch suppliers
  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const bounds = map.current?.getBounds();
      const params: any = {};

      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;

      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        params.north = ne.lat();
        params.south = sw.lat();
        params.east = ne.lng();
        params.west = sw.lng();
      }

      const data = await suppliersAPI.getMapData(params);
      setSuppliers(data);
    } catch (error) {
      console.error('Failed to fetch map suppliers:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter]);

  // Load suppliers when map is ready
  useEffect(() => {
    if (!map.current) return;
    fetchSuppliers();
  }, [fetchSuppliers]);

  // Refresh on bounds change (debounced)
  useEffect(() => {
    if (!map.current) return;

    const debouncedFetch = debounce(fetchSuppliers, 500);
    const listener = map.current.addListener('idle', debouncedFetch);

    return () => {
      if (listener) google.maps.event.removeListener(listener);
    };
  }, [fetchSuppliers]);

  // Update markers
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    const updateMarkers = async () => {
      // Import AdvancedMarkerElement
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

      // Remove markers not in current supplier list
      markers.current.forEach((marker, id) => {
        if (!suppliers.find(s => s.id === id)) {
          marker.map = null;
          markers.current.delete(id);
        }
      });

      // Add/update markers
      suppliers.forEach((supplier) => {
        if (!supplier.coordinates) return;

        let marker = markers.current.get(supplier.id);

        if (!marker) {
          // Create marker content
          const content = document.createElement('div');
          content.className = 'relative';
          content.innerHTML = `
            <div class="relative">
              <div class="w-6 h-6 rounded-full shadow-lg transition-transform hover:scale-125 cursor-pointer"
                   style="background-color: ${supplier.status_color}">
              </div>
              ${supplier.google_rating ? `
                <div class="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
                  ${supplier.google_rating.toFixed(1)}
                </div>
              ` : ''}
            </div>
          `;

          marker = new AdvancedMarkerElement({
            map: map.current,
            position: supplier.coordinates,
            content,
            title: supplier.name,
          });

          // Click handler
          marker.addListener('click', () => {
            setSelectedSupplier(supplier);
            setHoveredSupplier(supplier.id);
          });

          // Hover handlers
          content.addEventListener('mouseenter', () => {
            setHoveredSupplier(supplier.id);
          });

          content.addEventListener('mouseleave', () => {
            if (selectedSupplier?.id !== supplier.id) {
              setHoveredSupplier(null);
            }
          });

          markers.current.set(supplier.id, marker);
        }
      });
    };

    updateMarkers();
  }, [suppliers, isLoaded, selectedSupplier]);

  if (loadError) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Failed to load Google Maps</p>
          <p className="text-red-500 text-sm mt-1">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 border rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <MapStats suppliers={suppliers} loading={loading} />

      {/* Controls */}
      <MapControls
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        onStatusFilterChange={setStatusFilter}
        onCategoryFilterChange={setCategoryFilter}
        onRefresh={fetchSuppliers}
        loading={loading}
      />

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-[calc(100vh-350px)] min-h-[500px] rounded-lg border shadow-lg"
        />

        {/* Loading overlay */}
        {loading && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm font-medium">Loading suppliers...</span>
          </div>
        )}

        {/* Info Window */}
        {(selectedSupplier || hoveredSupplier) && (
          <SupplierInfoWindow
            supplier={suppliers.find(s => s.id === (selectedSupplier?.id || hoveredSupplier))!}
            onClose={() => {
              setSelectedSupplier(null);
              setHoveredSupplier(null);
            }}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}

// Simple debounce utility
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}
