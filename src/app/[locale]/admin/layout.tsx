import { AdminNav } from '@/components/admin/admin-nav';
import { Locale } from '@/dictionaries';

export const dynamic = 'force-dynamic';

/**
 * Admin Layout - Protected Section
 *
 * This layout wraps all admin routes and provides:
 * - Authentication check (TODO: integrate NextAuth)
 * - Admin navigation
 * - Consistent admin UI structure
 */
export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // TODO: Add authentication check here
  // const session = await getServerSession();
  // if (!session || !session.user.isAdmin) {
  //   redirect(`/${locale}/auth/signin`);
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNav locale={locale} />
      <main className="flex-1 container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
