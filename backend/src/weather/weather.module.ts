import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { AccessRequestsModule } from '../access-requests/access-requests.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [AccessRequestsModule, TelegramModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
