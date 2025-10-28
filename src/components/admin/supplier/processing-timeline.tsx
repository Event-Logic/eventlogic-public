'use client';

import { CheckCircle, Clock, XCircle, Loader } from 'lucide-react';
import { CompleteSupplierResponse } from '@/types/supplier';
import { Button } from '@/components/ui/button';
import { suppliersAPI } from '@/lib/api/suppliers';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProcessingTimelineProps {
  timeline: CompleteSupplierResponse['processing_timeline'];
  queue?: CompleteSupplierResponse['queue'];
  supplierId: number;
}

const statusIcons = {
  completed: CheckCircle,
  in_progress: Loader,
  failed: XCircle,
  pending: Clock,
};

const statusColors = {
  completed: 'text-green-600 bg-green-50 border-green-200',
  in_progress: 'text-blue-600 bg-blue-50 border-blue-200',
  failed: 'text-red-600 bg-red-50 border-red-200',
  pending: 'text-gray-600 bg-gray-50 border-gray-200',
};

export function ProcessingTimeline({ timeline, queue, supplierId }: ProcessingTimelineProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReprocess = async (stages?: string[]) => {
    setIsProcessing(true);
    try {
      await suppliersAPI.processSupplier(supplierId, {
        stages,
        priority: 200,
        force: true,
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to reprocess:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Queue Status */}
      {queue && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Current Queue Status</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {queue.position !== undefined && (
              <div>
                <div className="text-sm text-gray-500">Position</div>
                <div className="text-2xl font-bold">{queue.position}</div>
              </div>
            )}
            {queue.priority !== undefined && (
              <div>
                <div className="text-sm text-gray-500">Priority</div>
                <div className="text-2xl font-bold">{queue.priority}</div>
              </div>
            )}
            {queue.current_stage && (
              <div>
                <div className="text-sm text-gray-500">Current Stage</div>
                <div className="text-xl font-medium">{queue.current_stage}</div>
              </div>
            )}
            {queue.worker && (
              <div>
                <div className="text-sm text-gray-500">Worker</div>
                <div className="text-xl font-medium">{queue.worker}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Processing Timeline */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Processing Timeline</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReprocess()}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Reprocess All'}
            </Button>
          </div>
        </div>

        {timeline && timeline.length > 0 ? (
          <div className="space-y-4">
            {timeline.map((stage, index) => {
              const Icon = statusIcons[stage.status as keyof typeof statusIcons] || Clock;
              const colorClass = statusColors[stage.status as keyof typeof statusColors] || statusColors.pending;

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${colorClass}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon
                        className={`w-5 h-5 mt-0.5 ${
                          stage.status === 'in_progress' ? 'animate-spin' : ''
                        }`}
                      />
                      <div>
                        <h3 className="font-medium capitalize">{stage.stage}</h3>
                        <p className="text-sm mt-1 capitalize">{stage.status}</p>
                        {stage.duration_seconds !== undefined && (
                          <p className="text-xs mt-1">
                            Duration: {formatDuration(stage.duration_seconds)}
                          </p>
                        )}
                        {stage.started_at && (
                          <p className="text-xs mt-1">
                            Started: {new Date(stage.started_at).toLocaleString()}
                          </p>
                        )}
                        {stage.completed_at && (
                          <p className="text-xs">
                            Completed: {new Date(stage.completed_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {stage.status === 'failed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReprocess([stage.stage])}
                        disabled={isProcessing}
                      >
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No processing timeline available yet.
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Reprocess</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            onClick={() => handleReprocess(['crawl'])}
            disabled={isProcessing}
          >
            Crawl Only
          </Button>
          <Button
            variant="outline"
            onClick={() => handleReprocess(['images'])}
            disabled={isProcessing}
          >
            Images Only
          </Button>
          <Button
            variant="outline"
            onClick={() => handleReprocess(['summarize'])}
            disabled={isProcessing}
          >
            Summarize Only
          </Button>
          <Button
            variant="outline"
            onClick={() => handleReprocess(['resources'])}
            disabled={isProcessing}
          >
            Resources Only
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
