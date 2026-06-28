import type { AccessRequest, AdminStats, CreateAccessRequestDto, User } from '@/lib/types';
import { apiClient } from './client';

/** Submit a new access request (user) */
export async function createAccessRequest(
  dto: CreateAccessRequestDto,
  token: string,
): Promise<AccessRequest> {
  return apiClient<AccessRequest>('/api/v1/access-requests', {
    method: 'POST',
    body: dto,
    token,
  });
}

/** Get the current user's own access request */
export async function getMyRequest(token: string): Promise<AccessRequest | null> {
  try {
    return await apiClient<AccessRequest>('/api/v1/access-requests/me', { token });
  } catch {
    return null;
  }
}

/** Get the current user's profile (including telegramChatId) */
export async function getMyProfile(token: string): Promise<User | null> {
  try {
    return await apiClient<User>('/api/v1/users/me', { token });
  } catch {
    return null;
  }
}

/** Admin: get all access requests */
export async function getAllRequests(token: string): Promise<AccessRequest[]> {
  return apiClient<AccessRequest[]>('/api/v1/access-requests', { token });
}

/** Admin: approve or reject a request */
export async function updateRequestStatus(
  requestId: string,
  status: 'approved' | 'rejected',
  token: string,
): Promise<AccessRequest> {
  return apiClient<AccessRequest>(`/api/v1/access-requests/${requestId}/status`, {
    method: 'PATCH',
    body: { status },
    token,
  });
}

/** Compute stats from a list of requests */
export function computeStats(requests: AccessRequest[]): AdminStats {
  return {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };
}
