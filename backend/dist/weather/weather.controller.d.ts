import { WeatherService } from './weather.service';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    getCurrent(location?: string): Promise<import("./weather.service").WeatherApiResponse>;
}
