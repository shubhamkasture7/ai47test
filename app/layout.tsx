import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'WeatherGuard Admin — Smart Weather Alert Platform',
    template: '%s | WeatherGuard Admin',
  },
  description:
    'Get real-time weather alerts delivered directly to your Telegram. WeatherGuard Admin provides intelligent weather monitoring for approved users.',
  keywords: ['weather alerts', 'telegram notifications', 'weather monitoring'],
  authors: [{ name: 'WeatherGuard Team' }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  ),
  openGraph: {
    title: 'WeatherGuard Admin — Smart Weather Alert Platform',
    description: 'Real-time weather alerts delivered to your Telegram.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
