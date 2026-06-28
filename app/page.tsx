import { Show, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WeatherGuard Admin — Smart Weather Alert Platform',
};

const features = [
  {
    icon: '🌦️',
    title: 'Real-Time Alerts',
    desc: 'Daily weather updates powered by WeatherAPI delivered straight to your Telegram.',
  },
  {
    icon: '🔐',
    title: 'Access Control',
    desc: 'Request-based access ensures only authorized users receive critical weather data.',
  },
  {
    icon: '⚡',
    title: 'Instant Notifications',
    desc: 'Telegram bot delivers alerts in seconds — no app to download or refresh.',
  },
  {
    icon: '🛡️',
    title: 'Admin Dashboard',
    desc: 'Full visibility over all requests with one-click approve and reject actions.',
  },
];

export default function LandingPage() {
  return (
    <div className="hero-gradient min-h-screen flex flex-col">
      {/* ── Navigation ── */}
      <header className="w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg glow-accent">
            <span className="text-white font-bold text-sm">WG</span>
          </div>
          <span className="font-bold text-xl text-text-primary">
            Weather<span className="gradient-text">Guard</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button id="nav-sign-in" className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button id="nav-sign-up" className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                Get Started
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Go to Dashboard →
            </Link>
          </Show>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-accent-600 text-sm font-medium mb-8 animate-fade-in-up border border-accent-500/20">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          Powered by WeatherAPI + Telegram Bot
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-primary leading-tight max-w-4xl animate-fade-in-up-delay-1">
          Weather Alerts,{' '}
          <span className="gradient-text">Intelligently</span>{' '}
          Delivered
        </h1>

        <p className="mt-6 text-text-secondary text-lg sm:text-xl max-w-2xl leading-relaxed animate-fade-in-up-delay-2">
          Sign in, request access, and get daily weather alerts sent directly to your Telegram.
          Admins approve requests and keep full control over who receives notifications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-in-up-delay-3">
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button id="hero-google-signin" className="flex items-center gap-3 px-7 py-3.5 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </SignInButton>
            <SignInButton mode="redirect">
              <button id="hero-github-signin" className="flex items-center gap-3 px-7 py-3.5 glass border border-surface-border text-text-primary font-semibold rounded-xl hover:bg-surface-2 transition-all shadow-lg text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="px-8 py-3.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-xl text-sm">
              Open Dashboard →
            </Link>
          </Show>
        </div>
      </main>

      {/* ── Features Grid ── */}
      <section className="max-w-6xl mx-auto w-full px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={f.title} className={`glass rounded-2xl p-6 border border-surface-border hover:border-primary-600/40 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up-delay-${Math.min(i + 1, 3)}`}>
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="font-bold text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-surface-border py-6 text-center text-text-muted text-sm">
        © {new Date().getFullYear()} WeatherGuard Admin · Built with NestJS, Next.js & Clerk
      </footer>
    </div>
  );
}
