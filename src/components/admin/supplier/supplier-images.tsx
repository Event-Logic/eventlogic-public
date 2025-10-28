'use client';

import { useState } from 'react';
import { ImageData } from '@/types/supplier';
import { Locale } from '@/dictionaries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Check, X, Copy } from 'lucide-react';
import { suppliersAPI } from '@/lib/api/suppliers';
import { useRouter } from 'next/navigation';

interface SupplierImagesProps {
  supplierId: number;
  images: ImageData[];
  locale: Locale;
}

// Classification label colors (from classification_data.labels array)
const classificationColors: Record<string, string> = {
  logo: 'bg-purple-100 text-purple-800',
  hotel_room: 'bg-blue-100 text-blue-800',
  conference_room: 'bg-green-100 text-green-800',
  exterior: 'bg-yellow-100 text-yellow-800',
  restaurant_interior: 'bg-orange-100 text-orange-800',
  food: 'bg-red-100 text-red-800',
  amenities: 'bg-teal-100 text-teal-800',
  other_of_value: 'bg-gray-100 text-gray-800',
};

export function SupplierImages({ supplierId, images, locale }: SupplierImagesProps) {
  const router = useRouter();
  const [isAISelecting, setIsAISelecting] = useState(false);
  const [selectedView, setSelectedView] = useState<'all' | 'selected' | 'unselected'>('all');

  const handleAISelect = async () => {
    setIsAISelecting(true);
    try {
      const result = await suppliersAPI.aiSelectImages(supplierId, {
        min_quality_score: 0.7,
        max_images: 12,
        remove_duplicates: true,
      });
      console.log('AI selection result:', result);
      router.refresh();
    } catch (error) {
      console.error('Failed to AI select images:', error);
    } finally {
      setIsAISelecting(false);
    }
  };

  const filteredImages = images.filter((img) => {
    if (selectedView === 'selected') return img.is_selected;
    if (selectedView === 'unselected') return !img.is_selected;
    return true;
  });

  const selectedCount = images.filter((img) => img.is_selected).length;
  const duplicateCount = images.filter((img) => img.is_duplicate).length;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Image Management</h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedCount} selected · {duplicateCount} duplicates · {images.length} total
            </p>
          </div>
          <Button
            onClick={handleAISelect}
            disabled={isAISelecting}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isAISelecting ? 'AI Selecting...' : 'AI Select Best'}
          </Button>
        </div>

        {/* View filters */}
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('all')}
          >
            All ({images.length})
          </Button>
          <Button
            variant={selectedView === 'selected' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('selected')}
          >
            Selected ({selectedCount})
          </Button>
          <Button
            variant={selectedView === 'unselected' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('unselected')}
          >
            Unselected ({images.length - selectedCount})
          </Button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={`relative group border rounded-lg overflow-hidden ${
              image.is_selected ? 'ring-2 ring-green-500' : ''
            } ${image.is_duplicate ? 'opacity-50' : ''}`}
          >
            {/* Image */}
            <div className="aspect-video bg-gray-100">
              <img
                src={image.url}
                alt={`Image ${image.id}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay with info */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                {/* Top badges */}
                <div className="flex flex-wrap gap-1">
                  {/* Show labels from classification_data if available */}
                  {image.classification_data?.labels?.map((label) => (
                    <Badge
                      key={label}
                      className={
                        classificationColors[label] || 'bg-gray-100 text-gray-800'
                      }
                    >
                      {label.replace(/_/g, ' ')}
                    </Badge>
                  ))}

                  {/* Fallback to old classification field */}
                  {!image.classification_data?.labels && image.classification && (
                    <Badge
                      className={
                        classificationColors[image.classification] || 'bg-gray-100 text-gray-800'
                      }
                    >
                      {image.classification}
                    </Badge>
                  )}

                  {/* Show score (1-10 scale from new system or 0-1 from old) */}
                  {image.classification_data?.score !== undefined && (
                    <Badge variant="secondary">
                      Score: {image.classification_data.score}/10
                    </Badge>
                  )}
                  {!image.classification_data?.score && image.quality_score !== undefined && (
                    <Badge variant="secondary">
                      {Math.round(image.quality_score * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Bottom info */}
                <div className="text-white text-xs space-y-1">
                  {image.width && image.height && (
                    <div>
                      {image.width} × {image.height}
                    </div>
                  )}
                  {image.file_size && (
                    <div>{(image.file_size / 1024).toFixed(0)} KB</div>
                  )}
                </div>
              </div>
            </div>

            {/* Selection indicator */}
            {image.is_selected && (
              <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Duplicate indicator */}
            {image.is_duplicate && (
              <div className="absolute top-2 left-2 bg-yellow-500 rounded-full p-1">
                <Copy className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images to display
        </div>
      )}
    </div>
  );
}
