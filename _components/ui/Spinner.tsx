interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

export function Spinner({ size = 'md', label = 'Loading…' }: SpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} border-primary-500/30 border-t-primary-500 rounded-full animate-spin`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
