import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { AccessRequestsModule } from './access-requests/access-requests.module';
import { WeatherModule } from './weather/weather.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // MongoDB connection via env
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        dbName: 'weatherguard',
      }),
    }),

    // Enable cron scheduling
    ScheduleModule.forRoot(),

    // Feature modules
    UsersModule,
    AccessRequestsModule,
    WeatherModule,
    TelegramModule,
  ],
})
export class AppModule {}
