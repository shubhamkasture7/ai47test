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
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const users_service_1 = require("../users/users.service");
let TelegramService = TelegramService_1 = class TelegramService {
    usersService;
    logger = new common_1.Logger(TelegramService_1.name);
    bot;
    constructor(usersService) {
        this.usersService = usersService;
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) {
            this.logger.warn('TELEGRAM_BOT_TOKEN not set — Telegram notifications disabled');
        }
        this.bot = new node_telegram_bot_api_1.default(token ?? 'PLACEHOLDER', { polling: true });
        this.bot.on('message', (msg) => {
            this.logger.log(`Received message from ${msg.chat.id}: "${msg.text}"`);
        });
        this.bot.on('polling_error', (error) => {
            this.logger.error('Telegram Bot Polling Error:', error);
        });
        this.bot.onText(/\/start(?:\s+(.+))?$/, async (msg, match) => {
            const clerkId = match?.[1]?.trim();
            const chatId = msg.chat.id.toString();
            this.logger.log(`Received /start command. clerkId: "${clerkId}", chatId: "${chatId}"`);
            if (!clerkId || clerkId === 'undefined') {
                await this.sendMessage(chatId, `👋 <b>Welcome to WeatherGuard Bot!</b>\n\nTo connect your account, please click the <b>"💬 Connect Telegram"</b> button directly from your WeatherGuard web dashboard.`);
                return;
            }
            try {
                const updatedUser = await this.usersService.updateTelegramChatId(clerkId, chatId);
                if (updatedUser) {
                    await this.sendMessage(chatId, `✅ <b>Telegram Paired Successfully!</b>\n\nWelcome, <b>${updatedUser.name}</b>. Your Telegram account is now connected to WeatherGuard.\n\nYou can return to the dashboard and submit your weather alert request.`);
                }
                else {
                    await this.sendMessage(chatId, `⚠️ <b>User not found.</b>\n\nPlease ensure you have logged into the WeatherGuard web dashboard first before pairing.`);
                }
            }
            catch (err) {
                this.logger.error(`Failed to handle deep link start for clerkId ${clerkId}`, err);
                await this.sendMessage(chatId, `⚠️ <b>An error occurred during pairing.</b>\n\nPlease try again or contact support.`);
            }
        });
    }
    async sendMessage(chatId, text) {
        try {
            await this.bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
        }
        catch (err) {
            this.logger.error(`Failed to send Telegram message to ${chatId}`, err);
        }
    }
    async sendApprovalNotification(chatId, userName) {
        const message = [
            `🎉 <b>Access Approved, ${userName}!</b>`,
            '',
            `Your WeatherGuard access request has been <b>approved</b> by an admin.`,
            '',
            `You will now receive daily weather alerts every morning at 8 AM. 🌤️`,
            '',
            `<i>Visit the WeatherGuard dashboard to check your current weather status.</i>`,
        ].join('\n');
        await this.sendMessage(chatId, message);
    }
    async sendWeatherAlert(chatId, userName, weather) {
        const conditionEmoji = this.getEmoji(weather.condition);
        const message = [
            `${conditionEmoji} <b>Daily Weather Alert for ${userName}</b>`,
            '',
            `📍 <b>${weather.location}, ${weather.country}</b>`,
            `🌡️ Temperature: <b>${Math.round(weather.tempC)}°C</b> (feels like ${Math.round(weather.feelsLikeC)}°C)`,
            `☁️ Condition: <b>${weather.condition}</b>`,
            `💧 Humidity: <b>${weather.humidity}%</b>`,
            `💨 Wind: <b>${Math.round(weather.windKph)} km/h</b>`,
            '',
            `<i>Have a great day! — WeatherGuard 🛡️</i>`,
        ].join('\n');
        await this.sendMessage(chatId, message);
    }
    getEmoji(condition) {
        const lower = condition.toLowerCase();
        if (lower.includes('sunny') || lower.includes('clear'))
            return '☀️';
        if (lower.includes('cloud'))
            return '⛅';
        if (lower.includes('rain'))
            return '🌧️';
        if (lower.includes('storm') || lower.includes('thunder'))
            return '⛈️';
        if (lower.includes('snow'))
            return '❄️';
        if (lower.includes('fog') || lower.includes('mist'))
            return '🌫️';
        return '🌤️';
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map