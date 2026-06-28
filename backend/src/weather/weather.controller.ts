import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/clerk.guard';
import { WeatherService } from './weather.service';

@Controller('weather')
@UseGuards(ClerkAuthGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  /** GET /api/v1/weather/current?location=London */
  @Get('current')
  // Return type is inferred — explicit annotation avoided to prevent TS4053 with non-exported interface
  getCurrent(@Query('location') location?: string) {
    const target = location ?? process.env.WEATHER_DEFAULT_CITY ?? 'London';
    return this.weatherService.getCurrentWeather(target);
  }
}
