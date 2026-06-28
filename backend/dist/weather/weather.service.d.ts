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
export declare class WeatherService {
    private readonly accessRequestsService;
    private readonly telegramService;
    private readonly logger;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly defaultCity;
    constructor(accessRequestsService: AccessRequestsService, telegramService: TelegramService);
    getCurrentWeather(location: string): Promise<WeatherApiResponse>;
    sendDailyWeatherAlerts(): Promise<void>;
}
