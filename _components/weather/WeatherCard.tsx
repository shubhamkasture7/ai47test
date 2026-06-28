'use client';

import { useWeather } from '@/hooks/useWeather';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

// Map WMO-like conditions to emoji
const conditionToEmoji = (condition: string): string => {
  const lower = condition.toLowerCase();
  if (lower.includes('sunny') || lower.includes('clear')) return '☀️';
  if (lower.includes('cloud')) return '☁️';
  if (lower.includes('rain') || lower.includes('drizzle')) return '🌧️';
  if (lower.includes('storm') || lower.includes('thunder')) return '⛈️';
  if (lower.includes('snow')) return '❄️';
  if (lower.includes('fog') || lower.includes('mist')) return '🌫️';
  if (lower.includes('wind')) return '💨';
  return '🌤️';
};

export function WeatherCard({ location }: { location?: string }) {
  const { weather, isLoading, error } = useWeather(location);

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center min-h-[200px]">
        <Spinner />
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="text-center py-10">
        <p className="text-text-muted text-sm">{error ?? 'Could not load weather data.'}</p>
      </Card>
    );
  }

  const { current, location: loc } = weather;
  const emoji = conditionToEmoji(current.condition.text);

  return (
    <Card accent glow className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-widest font-semibold">
            Current Weather
          </p>
          <h3 className="text-xl font-bold text-text-primary mt-1">
            {loc.name},{' '}
            <span className="text-text-secondary font-normal">{loc.country}</span>
          </h3>
          <p className="text-text-muted text-xs mt-0.5">
            {new Date(loc.localtime).toLocaleString('en-US', {
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span className="text-5xl animate-float" role="img" aria-label={current.condition.text}>
          {emoji}
        </span>
      </div>

      {/* Temperature */}
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className="text-6xl font-bold gradient-text">{Math.round(current.temp_c)}°</span>
          <span className="text-text-secondary text-2xl mb-2 font-light">C</span>
        </div>
        <p className="text-text-secondary font-medium mt-1">{current.condition.text}</p>
        <p className="text-text-muted text-sm">Feels like {Math.round(current.feelslike_c)}°C</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Humidity', value: `${current.humidity}%`, icon: '💧' },
          { label: 'Wind', value: `${Math.round(current.wind_kph)} km/h`, icon: '💨' },
          { label: 'UV Index', value: String(current.uv), icon: '☀️' },
          { label: 'Visibility', value: `${current.vis_km} km`, icon: '👁️' },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-surface-2 rounded-xl p-3 border border-surface-border text-center"
          >
            <span className="text-lg" role="img" aria-hidden>
              {icon}
            </span>
            <p className="text-text-primary font-semibold text-sm mt-1">{value}</p>
            <p className="text-text-muted text-xs">{label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
