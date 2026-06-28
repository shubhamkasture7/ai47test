'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import { createAccessRequest, getMyRequest, getMyProfile } from '@/lib/api/access-requests';
import type { AccessRequest, CreateAccessRequestDto, User } from '@/lib/types';

interface UseAccessRequestReturn {
  request: AccessRequest | null;
  userProfile: User | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  submit: (dto: CreateAccessRequestDto) => Promise<void>;
  refetch: () => void;
  clerkId?: string | null;
}

export function useAccessRequest(): UseAccessRequestReturn {
  const { userId, getToken } = useAuth();
  const [request, setRequest] = useState<AccessRequest | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequest = useCallback(async (showLoading: boolean = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      const [reqData, profileData] = await Promise.all([
        getMyRequest(token),
        getMyProfile(token),
      ]);
      setRequest(reqData);
      setUserProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch request');
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }, [getToken]);

  useEffect(() => {
    fetchRequest(true);
  }, [fetchRequest]);

  const submit = useCallback(
    async (dto: CreateAccessRequestDto) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) throw new Error('Not authenticated');
        const newRequest = await createAccessRequest(dto, token);
        setRequest(newRequest);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit request');
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [getToken],
  );

  return { request, userProfile, isLoading, isSubmitting, error, submit, refetch: () => fetchRequest(false), clerkId: userId || null };
}
