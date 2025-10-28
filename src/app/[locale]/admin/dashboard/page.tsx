import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Locale } from '@/dictionaries';
import { suppliersAPI } from '@/lib/api/suppliers';

/**
 * Admin Dashboard - Landing Page
 *
 * Overview of the supplier management system
 */
export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Fetch real queue stats
  let queueStats = null;
  let error = null;

  try {
    queueStats = await suppliersAPI.getQueueStatus();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load stats';
    console.error('Dashboard stats error:', error);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage suppliers, monitor pipelines, and visualize data
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          <p className="font-medium">Unable to load dashboard stats</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Queue Depth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queueStats ? queueStats.queue_depth.toLocaleString() : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              Total items in queue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queueStats ? queueStats.in_progress.toLocaleString() : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {queueStats?.active_workers || 0} workers active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queueStats ? queueStats.completed_today.toLocaleString() : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              Total completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queueStats ? queueStats.failed.toLocaleString() : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href={`/${locale}/admin/suppliers`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>
                Browse, search, and manage all suppliers
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/${locale}/admin/suppliers/canvas`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>AI Canvas</CardTitle>
              <CardDescription>
                Generate custom visualizations with AI
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/${locale}/admin/pipeline/live`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Pipeline Monitor</CardTitle>
              <CardDescription>
                Real-time processing status and metrics
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/${locale}/admin/suppliers/queue`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Queue Status</CardTitle>
              <CardDescription>
                View and manage the processing queue
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/${locale}/admin/analytics`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Quality metrics, trends, and insights
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href={`/${locale}/admin/settings`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Configure system preferences
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
