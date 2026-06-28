import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  // Guard — redirect unauthenticated users
  if (!userId) {
    redirect('/sign-in');
  }

  // Check if user is an admin (env-var based)
  const adminIds = (process.env.ADMIN_USER_IDS ?? '').split(',').map((id) => id.trim());
  const isAdmin = adminIds.includes(userId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin={isAdmin} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
