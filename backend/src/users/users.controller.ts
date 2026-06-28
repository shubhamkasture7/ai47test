import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { ClerkAuthGuard } from '../auth/clerk.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { ClerkUser } from '../auth/current-user.decorator';
import { UsersService } from './users.service';
import { createClerkClient } from '@clerk/backend';

class UpdateTelegramDto {
  @IsString()
  @IsNotEmpty()
  telegramChatId!: string;
}

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** GET /api/v1/users/me — returns current user profile */
  @Get('me')
  async getMe(@CurrentUser() user: ClerkUser) {
    let found = await this.usersService.findByClerkId(user.userId);
    if (!found) {
      const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY || '',
      });
      const userObj = await clerkClient.users.getUser(user.userId);
      const primaryEmail = userObj.emailAddresses.find((e) => e.id === userObj.primaryEmailAddressId)?.emailAddress 
        || userObj.emailAddresses[0]?.emailAddress 
        || '';
      const name = [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') || primaryEmail.split('@')[0] || 'User';

      found = await this.usersService.findOrCreate({
        clerkId: user.userId,
        email: primaryEmail,
        name: name,
      });
    }
    return found;
  }

  /** PATCH /api/v1/users/me/telegram — update Telegram chat ID */
  @Patch('me/telegram')
  async updateTelegram(
    @CurrentUser() user: ClerkUser,
    @Body() dto: UpdateTelegramDto,
  ) {
    const updated = await this.usersService.updateTelegramChatId(
      user.userId,
      dto.telegramChatId,
    );
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}
