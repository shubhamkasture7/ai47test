import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccessRequest,
  AccessRequestDocument,
} from './schemas/access-request.schema';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { TelegramService } from '../telegram/telegram.service';

interface UserMeta {
  userId: string;
  userEmail: string;
  userName: string;
}

@Injectable()
export class AccessRequestsService {
  constructor(
    @InjectModel(AccessRequest.name)
    private readonly requestModel: Model<AccessRequestDocument>,
    private readonly telegramService: TelegramService,
  ) {}

  /** Submit a new access request. Only one active request per user is allowed. */
  async create(
    user: UserMeta,
    dto: CreateAccessRequestDto,
  ): Promise<AccessRequestDocument> {
    const existing = await this.requestModel.findOne({
      userId: user.userId,
      status: { $in: ['pending', 'approved'] },
    });

    if (existing) {
      throw new BadRequestException(
        `You already have a ${existing.status} request`,
      );
    }

    return this.requestModel.create({ ...user, ...dto });
  }

  /** Admin: get all requests, sorted by most recent first. */
  async findAll(): Promise<AccessRequestDocument[]> {
    return this.requestModel.find().sort({ createdAt: -1 });
  }

  /** User: get their own most recent request. */
  async findByUser(userId: string): Promise<AccessRequestDocument | null> {
    return this.requestModel.findOne({ userId }).sort({ createdAt: -1 });
  }

  /** Get all approved requests (used by weather cron). */
  async findApproved(): Promise<AccessRequestDocument[]> {
    return this.requestModel.find({ status: 'approved' });
  }

  /** Admin: approve or reject a request. */
  async updateStatus(
    requestId: string,
    dto: UpdateRequestStatusDto,
    adminUserId: string,
  ): Promise<AccessRequestDocument> {
    const request = await this.requestModel.findById(requestId);
    if (!request) throw new NotFoundException('Request not found');

    request.status = dto.status;
    request.reviewedBy = adminUserId;
    request.reviewedAt = new Date();
    await request.save();

    // Send Telegram notification when approved
    if (dto.status === 'approved') {
      await this.telegramService.sendApprovalNotification(
        request.telegramChatId,
        request.userName,
      );
    }

    return request;
  }
}
