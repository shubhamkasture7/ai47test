import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WeatherService } from './weather/weather.service';

async function bootstrap() {
  console.log('Bootstrapping app context...');
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('App context loaded. Triggering weather alerts...');
  
  const weatherService = app.get(WeatherService);
  await weatherService.sendDailyWeatherAlerts();
  
  console.log('Done triggering alerts! Closing...');
  await app.close();
  process.exit(0);
}

bootstrap().catch(err => {
  console.error('Error triggering alerts:', err);
  process.exit(1);
});
