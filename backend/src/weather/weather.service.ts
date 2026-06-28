import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { AccessRequestsService } from '../access-requests/access-requests.service';
import { TelegramService } from '../telegram/telegram.service';

export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    vis_km: number;
    uv: number;
    cloud: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey = process.env.WEATHER_API_KEY;
  private readonly baseUrl = 'https://api.weatherapi.com/v1';
  private readonly defaultCity = process.env.WEATHER_DEFAULT_CITY ?? 'London';

  constructor(
    private readonly accessRequestsService: AccessRequestsService,
    private readonly telegramService: TelegramService,
  ) {}

  /** Fetch current weather for a given location. */
  async getCurrentWeather(location: string): Promise<WeatherApiResponse> {
    const response = await axios.get<WeatherApiResponse>(`${this.baseUrl}/current.json`, {
      params: { key: this.apiKey, q: location, aqi: 'no' },
    });
    return response.data;
  }

  /**
   * Daily cron: runs every day at 8:00 AM server time.
   * Fetches weather and sends Telegram alerts to all approved users.
   */
  @Cron('0 8 * * *', { name: 'daily-weather-alerts' })
  async sendDailyWeatherAlerts(): Promise<void> {
    this.logger.log('Running daily weather alert cron job…');

    const approvedRequests = await this.accessRequestsService.findApproved();
    this.logger.log(`Found ${approvedRequests.length} approved users to notify`);

    if (approvedRequests.length === 0) return;

    // Send alerts in parallel (with concurrency consideration)
    const notifyPromises = approvedRequests.map(async (req) => {
      try {
        // Fetch weather specifically for this user's location
        const targetLocation = (req as any).location || this.defaultCity;
        const weather = await this.getCurrentWeather(targetLocation);

        await this.telegramService.sendWeatherAlert(
          req.telegramChatId,
          req.userName,
          {
            location: weather.location.name,
            country: weather.location.country,
            tempC: weather.current.temp_c,
            feelsLikeC: weather.current.feelslike_c,
            condition: weather.current.condition.text,
            humidity: weather.current.humidity,
            windKph: weather.current.wind_kph,
          },
        );
      } catch (err) {
        this.logger.error(`Failed to fetch weather or notify user ${req.userId}`, err);
      }
    });

    await Promise.all(notifyPromises);
    this.logger.log(`Weather alerts sent to ${approvedRequests.length} users`);
  }
}
