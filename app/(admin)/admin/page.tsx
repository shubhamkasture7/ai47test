'use client';

import { useAdminRequests } from '@/hooks/useAdminRequests';
import { RequestsTable } from '@/components/requests/RequestsTable';
import { Card } from '@/components/ui/Card';
import type { AdminStats } from '@/lib/types';

function StatCard({
  label,
  value,
  icon,
  colorClass,
}: {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
}) {
  return (
    <Card className={`border ${colorClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">{label}</p>
          <p className="text-3xl font-extrabold text-text-primary mt-1">{value}</p>
        </div>
        <span className="text-3xl" role="img" aria-hidden>
          {icon}
        </span>
      </div>
    </Card>
  );
}

export default function AdminPage() {
  const { requests, stats, isLoading, error, approve, reject, refetch } = useAdminRequests();

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">
            Review and manage all access requests.
          </p>
        </div>
        <button
          id="admin-refresh"
          onClick={refetch}
          disabled={isLoading}
          className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary glass border border-surface-border rounded-xl transition-all hover:bg-surface-2 disabled:opacity-50"
        >
          {isLoading ? '⟳ Refreshing…' : '⟳ Refresh'}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up-delay-1">
        <StatCard label="Total" value={stats.total} icon="📋" colorClass="border-surface-border" />
        <StatCard
          label="Pending"
          value={stats.pending}
          icon="⏳"
          colorClass="border-yellow-500/20"
        />
        <StatCard
          label="Approved"
          value={stats.approved}
          icon="✅"
          colorClass="border-green-500/20"
        />
        <StatCard
          label="Rejected"
          value={stats.rejected}
          icon="❌"
          colorClass="border-red-500/20"
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Requests table */}
      <Card className="animate-fade-in-up-delay-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-text-primary text-lg">All Requests</h2>
          {stats.pending > 0 && (
            <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-xs font-semibold">
              {stats.pending} awaiting review
            </span>
          )}
        </div>
        <RequestsTable
          requests={requests}
          onApprove={approve}
          onReject={reject}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}
