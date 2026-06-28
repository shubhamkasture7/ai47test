import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 shadow-lg glow-accent">
            <span className="text-white font-bold text-lg">WG</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            Weather<span className="gradient-text">Guard</span>
          </h1>
          <p className="text-text-secondary text-sm mt-1">Smart Weather Alert Platform</p>
        </div>
        {children}
      </div>
    </div>
  );
}
