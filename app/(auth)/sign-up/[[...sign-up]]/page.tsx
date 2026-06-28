import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign Up' };

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'glass border border-surface-border shadow-2xl rounded-2xl',
          headerTitle: 'text-text-primary',
          headerSubtitle: 'text-text-secondary',
          socialButtonsBlockButton:
            'bg-surface-2 border border-surface-border text-text-primary hover:bg-surface-3 transition-colors',
          formButtonPrimary:
            'bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 text-white font-semibold',
          footerActionLink: 'text-accent-600 hover:text-accent-700',
          formFieldInput:
            'bg-surface-2 border-surface-border text-text-primary placeholder-text-muted',
          dividerLine: 'bg-surface-border',
          dividerText: 'text-text-muted',
        },
      }}
    />
  );
}
