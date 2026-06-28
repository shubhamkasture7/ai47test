import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  // Enforce admin-only access
  const adminIds = (process.env.ADMIN_USER_IDS ?? '').split(',').map((id) => id.trim());
  if (!adminIds.includes(userId)) redirect('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
