/**
 * Typed API client that injects the Clerk auth token into every request.
 * Designed to work in both Server Components (via server-side token fetch)
 * and Client Components (token passed in explicitly).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  token?: string;
}

export async function apiClient<T>(
  path: string,
  { body, token, ...options }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `API error ${res.status}`;
    try {
      const errBody = await res.json();
      message = errBody.message ?? message;
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res.status, message);
  }

  // Handle empty responses (204 No Content, empty 200 OK, etc.)
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (null as T);
}
