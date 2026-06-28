"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WeatherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = __importDefault(require("axios"));
const access_requests_service_1 = require("../access-requests/access-requests.service");
const telegram_service_1 = require("../telegram/telegram.service");
let WeatherService = WeatherService_1 = class WeatherService {
    accessRequestsService;
    telegramService;
    logger = new common_1.Logger(WeatherService_1.name);
    apiKey = process.env.WEATHER_API_KEY;
    baseUrl = 'https://api.weatherapi.com/v1';
    defaultCity = process.env.WEATHER_DEFAULT_CITY ?? 'London';
    constructor(accessRequestsService, telegramService) {
        this.accessRequestsService = accessRequestsService;
        this.telegramService = telegramService;
    }
    async getCurrentWeather(location) {
        const response = await axios_1.default.get(`${this.baseUrl}/current.json`, {
            params: { key: this.apiKey, q: location, aqi: 'no' },
        });
        return response.data;
    }
    async sendDailyWeatherAlerts() {
        this.logger.log('Running daily weather alert cron job…');
        const approvedRequests = await this.accessRequestsService.findApproved();
        this.logger.log(`Found ${approvedRequests.length} approved users to notify`);
        if (approvedRequests.length === 0)
            return;
        const notifyPromises = approvedRequests.map(async (req) => {
            try {
                const targetLocation = req.location || this.defaultCity;
                const weather = await this.getCurrentWeather(targetLocation);
                await this.telegramService.sendWeatherAlert(req.telegramChatId, req.userName, {
                    location: weather.location.name,
                    country: weather.location.country,
                    tempC: weather.current.temp_c,
                    feelsLikeC: weather.current.feelslike_c,
                    condition: weather.current.condition.text,
                    humidity: weather.current.humidity,
                    windKph: weather.current.wind_kph,
                });
            }
            catch (err) {
                this.logger.error(`Failed to fetch weather or notify user ${req.userId}`, err);
            }
        });
        await Promise.all(notifyPromises);
        this.logger.log(`Weather alerts sent to ${approvedRequests.length} users`);
    }
};
exports.WeatherService = WeatherService;
__decorate([
    (0, schedule_1.Cron)('0 8 * * *', { name: 'daily-weather-alerts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WeatherService.prototype, "sendDailyWeatherAlerts", null);
exports.WeatherService = WeatherService = WeatherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [access_requests_service_1.AccessRequestsService,
        telegram_service_1.TelegramService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map