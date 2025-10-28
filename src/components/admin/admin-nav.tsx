'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  ListChecks,
  Activity,
  BarChart3,
  Settings,
  Map,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Suppliers', href: '/admin/suppliers', icon: Building2 },
  { name: 'Map', href: '/admin/suppliers/map', icon: Map },
  { name: 'AI Canvas', href: '/admin/suppliers/canvas', icon: Sparkles },
  { name: 'Queue', href: '/admin/suppliers/queue', icon: ListChecks },
  { name: 'Pipeline', href: '/admin/pipeline/live', icon: Activity },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminNav({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 border-b px-6 py-4">
      <Link href={`/${locale}/admin/dashboard`} className="font-bold text-xl">
        EventLogic Admin
      </Link>
      <div className="flex-1 flex items-center space-x-4">
        {navigation.map((item) => {
          const href = `/${locale}${item.href}`;
          const isActive = pathname === href || pathname?.startsWith(href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
