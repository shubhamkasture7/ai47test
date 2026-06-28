'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { AccessRequest } from '@/lib/types';

interface RequestsTableProps {
  requests: AccessRequest[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function RequestsTable({
  requests,
  onApprove,
  onReject,
  isLoading = false,
}: RequestsTableProps) {
  const [actioningId, setActioningId] = useState<string | null>(null);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActioningId(id);
    try {
      if (action === 'approve') await onApprove(id);
      else await onReject(id);
    } finally {
      setActioningId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-text-secondary font-medium">No requests yet</p>
        <p className="text-text-muted text-sm mt-1">Access requests will appear here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border text-text-muted text-xs uppercase tracking-wider">
            <th className="text-left pb-3 pr-4 font-semibold">User</th>
            <th className="text-left pb-3 pr-4 font-semibold">Reason</th>
            <th className="text-left pb-3 pr-4 font-semibold">Telegram ID</th>
            <th className="text-left pb-3 pr-4 font-semibold">Status</th>
            <th className="text-left pb-3 pr-4 font-semibold">Submitted</th>
            <th className="text-left pb-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border/50">
          {requests.map((req) => (
            <tr key={req._id} className="hover:bg-surface-2/40 transition-colors group">
              <td className="py-4 pr-4">
                <div>
                  <p className="font-medium text-text-primary">{req.userName}</p>
                  <p className="text-text-muted text-xs mt-0.5">{req.userEmail}</p>
                </div>
              </td>
              <td className="py-4 pr-4 max-w-[220px]">
                <p className="text-text-secondary truncate" title={req.reason}>
                  {req.reason}
                </p>
              </td>
              <td className="py-4 pr-4">
                <code className="text-accent-600 text-xs bg-surface-2 px-2 py-1 rounded-lg">
                  {req.telegramChatId}
                </code>
              </td>
              <td className="py-4 pr-4">
                <StatusBadge status={req.status} />
              </td>
              <td className="py-4 pr-4 text-text-muted whitespace-nowrap">
                {new Date(req.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="py-4">
                {req.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <Button
                      id={`approve-${req._id}`}
                      variant="outline"
                      size="sm"
                      isLoading={actioningId === req._id}
                      onClick={() => handleAction(req._id, 'approve')}
                      className="border-green-500/40 text-green-600 hover:bg-green-500/10 hover:border-green-500/60"
                    >
                      Approve
                    </Button>
                    <Button
                      id={`reject-${req._id}`}
                      variant="danger"
                      size="sm"
                      isLoading={actioningId === req._id}
                      onClick={() => handleAction(req._id, 'reject')}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-text-muted text-xs">
                    {req.reviewedAt
                      ? `${req.status} ${new Date(req.reviewedAt).toLocaleDateString()}`
                      : '—'}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
