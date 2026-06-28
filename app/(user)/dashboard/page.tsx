'use client';

import { useAccessRequest } from '@/hooks/useAccessRequest';
import { RequestForm } from '@/components/requests/RequestForm';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { StatusBadge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { Card } from '@/components/ui/Card';
import type { Metadata } from 'next';

// Note: metadata must be in a Server Component; this is a Client Component.
// Page-level metadata is defined in the parent layout or a separate server wrapper.

export default function DashboardPage() {
  const { request, userProfile, isLoading, isSubmitting, error, submit, refetch, clerkId } = useAccessRequest();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Manage your weather alert subscription.
        </p>
      </div>

      {/* ── No request yet ── */}
      {!request && (
        <div className="animate-fade-in-up-delay-1">
          <RequestForm
            onSubmit={submit}
            userProfile={userProfile}
            onRefreshPairing={refetch}
            isSubmitting={isSubmitting}
            error={error}
            clerkId={clerkId || undefined}
          />
        </div>
      )}

      {/* ── Pending ── */}
      {request?.status === 'pending' && (
        <Card accent className="animate-fade-in-up-delay-1">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              ⏳
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold text-text-primary">Request Submitted</h2>
                <StatusBadge status="pending" />
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Your access request is being reviewed. You&apos;ll receive a Telegram message once
                an admin approves your request.
              </p>
              <div className="mt-4 p-3 bg-surface-2 rounded-xl border border-surface-border">
                <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                  Your reason
                </p>
                <p className="text-text-secondary text-sm">{request.reason}</p>
              </div>
              <p className="text-text-muted text-xs mt-3">
                Submitted on{' '}
                {new Date(request.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* ── Approved ── */}
      {request?.status === 'approved' && (
        <div className="space-y-6 animate-fade-in-up-delay-1">
          <Card className="border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-xl">
                ✅
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-text-primary">Access Approved!</h2>
                  <StatusBadge status="approved" />
                </div>
                <p className="text-text-secondary text-sm mt-0.5">
                  You&apos;re now receiving daily weather alerts on Telegram.
                </p>
              </div>
            </div>
          </Card>
          <WeatherCard />
        </div>
      )}

      {/* ── Rejected ── */}
      {request?.status === 'rejected' && (
        <Card className="border border-red-500/20 animate-fade-in-up-delay-1">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              ❌
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold text-text-primary">Request Rejected</h2>
                <StatusBadge status="rejected" />
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Unfortunately, your access request was not approved. Please contact the admin or
                submit a new request with more details.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
