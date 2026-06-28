import { UsersService } from '../users/users.service';
export declare class TelegramService {
    private readonly usersService;
    private readonly logger;
    private readonly bot;
    constructor(usersService: UsersService);
    sendMessage(chatId: string, text: string): Promise<void>;
    sendApprovalNotification(chatId: string, userName: string): Promise<void>;
    sendWeatherAlert(chatId: string, userName: string, weather: {
        location: string;
        country: string;
        tempC: number;
        condition: string;
        humidity: number;
        windKph: number;
        feelsLikeC: number;
    }): Promise<void>;
    private getEmoji;
}
