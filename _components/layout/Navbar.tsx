'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isAdmin?: boolean;
}

export function Navbar({ isAdmin = false }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-text-primary text-lg hidden sm:block">
              Weather<span className="gradient-text">Guard</span>
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="flex items-center gap-1">
            <NavLink href="/dashboard" active={pathname === '/dashboard'}>
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink href="/admin" active={pathname === '/admin'}>
                Admin
              </NavLink>
            )}
          </nav>

          {/* User avatar + sign-out */}
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8 ring-2 ring-primary-500/30',
                  userButtonPopoverCard: 'glass border border-surface-border',
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
        active
          ? 'bg-primary-500/10 text-primary-600 border border-primary-500/20'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-2',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}
