import type { WeatherData } from '@/lib/types';
import { apiClient } from './client';

/** Fetch current weather for a location */
export async function getCurrentWeather(
  token: string,
  location?: string,
): Promise<WeatherData> {
  const query = location ? `?location=${encodeURIComponent(location)}` : '';
  return apiClient<WeatherData>(`/api/v1/weather/current${query}`, { token });
}
