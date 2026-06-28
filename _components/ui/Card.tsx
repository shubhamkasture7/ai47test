import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  /** Adds a top accent border in primary gradient */
  accent?: boolean;
}

export function Card({ children, className = '', glow = false, accent = false }: CardProps) {
  return (
    <div
      className={[
        'glass rounded-2xl p-6',
        glow ? 'glow-primary' : '',
        accent
          ? 'border-t-2 border-t-transparent'
          : '',
        className,
      ].join(' ')}
      style={
        accent
          ? {
              borderTop: '2px solid transparent',
              backgroundImage:
                'linear-gradient(var(--glass-bg), var(--glass-bg)), linear-gradient(135deg, hsl(26,88%,55%), hsl(32,90%,52%))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
