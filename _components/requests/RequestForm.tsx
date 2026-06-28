'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { CreateAccessRequestDto, User } from '@/lib/types';

interface RequestFormProps {
  onSubmit: (dto: CreateAccessRequestDto) => Promise<void>;
  userProfile?: User | null;
  onRefreshPairing?: () => void;
  isSubmitting?: boolean;
  error?: string | null;
  clerkId?: string;
}

export function RequestForm({ onSubmit, userProfile, onRefreshPairing, isSubmitting = false, error, clerkId }: RequestFormProps) {
  const [reason, setReason] = useState('');
  const [location, setLocation] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setFieldErrors((prev) => ({ ...prev, location: 'Geolocation is not supported by your browser' }));
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`${position.coords.latitude.toFixed(4)},${position.coords.longitude.toFixed(4)}`);
        setFieldErrors((prev) => ({ ...prev, location: '' }));
        setIsDetectingLocation(false);
      },
      (err) => {
        setFieldErrors((prev) => ({ ...prev, location: 'Failed to detect location. Please type it.' }));
        setIsDetectingLocation(false);
      }
    );
  };

  const handleRefresh = () => {
    if (onRefreshPairing) {
      setIsRefreshing(true);
      onRefreshPairing();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (reason.trim().length < 10) {
      errors.reason = 'Please provide at least 10 characters explaining your reason.';
    }
    if (reason.trim().length > 500) {
      errors.reason = 'Reason must be under 500 characters.';
    }
    if (!userProfile?.telegramChatId) {
      errors.telegram = 'Please connect your Telegram account first using the button above.';
    }
    if (!location.trim()) {
      errors.location = 'Location is required.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      reason: reason.trim(),
      telegramChatId: userProfile?.telegramChatId || '',
      location: location.trim(),
    });
  };

  const isTelegramPaired = Boolean(userProfile?.telegramChatId);

  return (
    <Card accent className="max-w-lg w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary">Request Weather Alert Access</h2>
        <p className="text-text-secondary text-sm mt-1">
          Tell us a bit about yourself and connect your Telegram account to receive daily weather alerts.
        </p>
      </div>

      <form onSubmit={handleSubmit} id="access-request-form" className="space-y-5" noValidate>
        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-text-primary mb-1.5">
            Why do you need weather alerts?
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="E.g. I'm a farmer and need daily weather updates for crop planning…"
            className={[
              'w-full bg-surface-2 border rounded-xl px-4 py-3 text-text-primary text-sm',
              'placeholder-text-muted resize-none transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60',
              fieldErrors.reason ? 'border-red-500/50' : 'border-surface-border',
            ].join(' ')}
          />
          <div className="flex justify-between mt-1">
            {fieldErrors.reason ? (
              <p className="text-red-400 text-xs">{fieldErrors.reason}</p>
            ) : (
              <span />
            )}
            <span className="text-text-muted text-xs">{reason.length}/500</span>
          </div>
        </div>

        {/* Telegram Deep Link Pairing */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Telegram Pairing Status
          </label>
          <div className="p-4 rounded-xl bg-surface-2 border border-surface-border flex flex-col gap-3">
            {isTelegramPaired ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                  <span className="text-lg">✅</span> Telegram Connected
                </div>
                <span className="text-xs text-text-muted font-mono">ID: {userProfile?.telegramChatId}</span>
              </div>
            ) : (
              <>
                <div className="text-sm text-text-secondary">
                  Connect your Telegram account instantly with one click. No manual ID copy-pasting required!
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <a
                    href={`https://t.me/ai47Testbot?start=${clerkId || userProfile?.clerkId || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center font-semibold rounded-xl text-sm px-4 py-2.5 bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 transition-all duration-200 gap-2 ${!(clerkId || userProfile?.clerkId) ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                    💬 Connect Telegram
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="py-2.5"
                  >
                    {isRefreshing ? 'Refreshing...' : '🔄 Refresh Status'}
                  </Button>
                </div>
              </>
            )}
          </div>
          {fieldErrors.telegram && (
            <p className="text-red-400 text-xs mt-1.5">{fieldErrors.telegram}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-1.5">
            Your Location
          </label>
          <div className="flex gap-3">
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country OR lat,lon"
              className={[
                'w-full bg-surface-2 border rounded-xl px-4 py-3 text-text-primary text-sm',
                'placeholder-text-muted transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60',
                fieldErrors.location ? 'border-red-500/50' : 'border-surface-border',
              ].join(' ')}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="flex-shrink-0"
            >
              {isDetectingLocation ? 'Detecting...' : '📍 Detect'}
            </Button>
          </div>
          {fieldErrors.location && (
            <p className="text-red-400 text-xs mt-1">{fieldErrors.location}</p>
          )}
        </div>

        {/* Server error */}
        {error && (
          <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
          Submit Request
        </Button>
      </form>
    </Card>
  );
}
