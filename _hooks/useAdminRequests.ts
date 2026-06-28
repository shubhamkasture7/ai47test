'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import { getAllRequests, updateRequestStatus, computeStats } from '@/lib/api/access-requests';
import type { AccessRequest, AdminStats } from '@/lib/types';

interface UseAdminRequestsReturn {
  requests: AccessRequest[];
  stats: AdminStats;
  isLoading: boolean;
  error: string | null;
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  refetch: () => void;
}

export function useAdminRequests(): UseAdminRequestsReturn {
  const { getToken } = useAuth();
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await getAllRequests(token);
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /** Optimistic update helper */
  const updateLocal = (id: string, status: 'approved' | 'rejected') => {
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status, reviewedAt: new Date().toISOString() } : r,
      ),
    );
  };

  const changeStatus = useCallback(
    async (id: string, status: 'approved' | 'rejected') => {
      // Optimistic update
      updateLocal(id, status);
      try {
        const token = await getToken();
        if (!token) throw new Error('Not authenticated');
        await updateRequestStatus(id, status, token);
      } catch (err) {
        // Revert on error
        await fetchAll();
        throw err;
      }
    },
    [getToken, fetchAll],
  );

  const approve = useCallback((id: string) => changeStatus(id, 'approved'), [changeStatus]);
  const reject = useCallback((id: string) => changeStatus(id, 'rejected'), [changeStatus]);

  const stats = computeStats(requests);

  return { requests, stats, isLoading, error, approve, reject, refetch: fetchAll };
}
