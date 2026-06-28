// Shared TypeScript types across the frontend

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  telegramChatId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccessRequest {
  _id: string;
  userId: string;
  userEmail: string;
  userName: string;
  telegramChatId: string;
  location: string;
  reason: string;
  status: RequestStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccessRequestDto {
  reason: string;
  telegramChatId: string;
  location: string;
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    uv: number;
    vis_km: number;
    cloud: number;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}
