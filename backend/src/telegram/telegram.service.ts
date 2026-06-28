import { Injectable, Logger } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: TelegramBot;

  constructor(private readonly usersService: UsersService) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      this.logger.warn('TELEGRAM_BOT_TOKEN not set — Telegram notifications disabled');
    }
    this.bot = new TelegramBot(token ?? 'PLACEHOLDER', { polling: true });

    // Listen for deep link /start <clerkId>
    this.bot.on('message', (msg) => {
      this.logger.log(`Received message from ${msg.chat.id}: "${msg.text}"`);
    });

    this.bot.on('polling_error', (error) => {
      this.logger.error('Telegram Bot Polling Error:', error);
    });

    // Handle /start with optional clerkId deep link
    this.bot.onText(/\/start(?:\s+(.+))?$/, async (msg, match) => {
      const clerkId = match?.[1]?.trim();
      const chatId = msg.chat.id.toString();

      this.logger.log(`Received /start command. clerkId: "${clerkId}", chatId: "${chatId}"`);

      if (!clerkId || clerkId === 'undefined') {
        await this.sendMessage(
          chatId,
          `👋 <b>Welcome to WeatherGuard Bot!</b>\n\nTo connect your account, please click the <b>"💬 Connect Telegram"</b> button directly from your WeatherGuard web dashboard.`
        );
        return;
      }

      try {
        const updatedUser = await this.usersService.updateTelegramChatId(clerkId, chatId);
        if (updatedUser) {
          await this.sendMessage(
            chatId,
            `✅ <b>Telegram Paired Successfully!</b>\n\nWelcome, <b>${updatedUser.name}</b>. Your Telegram account is now connected to WeatherGuard.\n\nYou can return to the dashboard and submit your weather alert request.`
          );
        } else {
          await this.sendMessage(
            chatId,
            `⚠️ <b>User not found.</b>\n\nPlease ensure you have logged into the WeatherGuard web dashboard first before pairing.`
          );
        }
      } catch (err) {
        this.logger.error(`Failed to handle deep link start for clerkId ${clerkId}`, err);
        await this.sendMessage(
          chatId,
          `⚠️ <b>An error occurred during pairing.</b>\n\nPlease try again or contact support.`
        );
      }
    });
  }

  /** Send a raw text message to a chat. */
  async sendMessage(chatId: string, text: string): Promise<void> {
    try {
      await this.bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
    } catch (err) {
      this.logger.error(`Failed to send Telegram message to ${chatId}`, err);
    }
  }

  /** Notify a user that their access request was approved. */
  async sendApprovalNotification(chatId: string, userName: string): Promise<void> {
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

  /** Send a formatted weather alert to a user. */
  async sendWeatherAlert(
    chatId: string,
    userName: string,
    weather: {
      location: string;
      country: string;
      tempC: number;
      condition: string;
      humidity: number;
      windKph: number;
      feelsLikeC: number;
    },
  ): Promise<void> {
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

  private getEmoji(condition: string): string {
    const lower = condition.toLowerCase();
    if (lower.includes('sunny') || lower.includes('clear')) return '☀️';
    if (lower.includes('cloud')) return '⛅';
    if (lower.includes('rain')) return '🌧️';
    if (lower.includes('storm') || lower.includes('thunder')) return '⛈️';
    if (lower.includes('snow')) return '❄️';
    if (lower.includes('fog') || lower.includes('mist')) return '🌫️';
    return '🌤️';
  }
}
