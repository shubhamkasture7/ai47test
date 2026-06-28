import type { RequestStatus } from '@/lib/types';

interface BadgeProps {
  status: RequestStatus;
}

const labels: Record<RequestStatus, string> = {
  pending: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

const dotColors: Record<RequestStatus, string> = {
  pending: 'bg-yellow-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

export function StatusBadge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide badge-${status}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]} animate-pulse`} />
      {labels[status]}
    </span>
  );
}
