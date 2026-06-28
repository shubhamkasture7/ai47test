'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';
import { getCurrentWeather } from '@/lib/api/weather';
import type { WeatherData } from '@/lib/types';

interface UseWeatherReturn {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWeather(location?: string): UseWeatherReturn {
  const { getToken } = useAuth();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await getCurrentWeather(token, location);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setIsLoading(false);
    }
  }, [getToken, location]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, isLoading, error, refetch: fetchWeather };
}
