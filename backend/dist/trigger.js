"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const weather_service_1 = require("./weather/weather.service");
async function bootstrap() {
    console.log('Bootstrapping app context...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    console.log('App context loaded. Triggering weather alerts...');
    const weatherService = app.get(weather_service_1.WeatherService);
    await weatherService.sendDailyWeatherAlerts();
    console.log('Done triggering alerts! Closing...');
    await app.close();
    process.exit(0);
}
bootstrap().catch(err => {
    console.error('Error triggering alerts:', err);
    process.exit(1);
});
//# sourceMappingURL=trigger.js.map