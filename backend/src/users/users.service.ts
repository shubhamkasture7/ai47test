import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

interface FindOrCreatePayload {
  clerkId: string;
  email: string;
  name: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /** Upsert: create a new user or return the existing one. */
  async findOrCreate(payload: FindOrCreatePayload): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ clerkId: payload.clerkId });
    if (existing) return existing;

    return this.userModel.create(payload);
  }

  async findByClerkId(clerkId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ clerkId });
  }

  /** Return only users who have been approved (for cron targeting). */
  async findApprovedUsers(): Promise<UserDocument[]> {
    // Approved users are identified by approved AccessRequests — queried in the weather service.
    // This fetches all users with a telegramChatId set.
    return this.userModel.find({ telegramChatId: { $exists: true, $ne: '' } });
  }

  async updateTelegramChatId(clerkId: string, chatId: string): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { clerkId },
      { telegramChatId: chatId },
      { new: true },
    );
  }
}
