import { Model } from 'mongoose';
import { AccessRequestDocument } from './schemas/access-request.schema';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { TelegramService } from '../telegram/telegram.service';
interface UserMeta {
    userId: string;
    userEmail: string;
    userName: string;
}
export declare class AccessRequestsService {
    private readonly requestModel;
    private readonly telegramService;
    constructor(requestModel: Model<AccessRequestDocument>, telegramService: TelegramService);
    create(user: UserMeta, dto: CreateAccessRequestDto): Promise<AccessRequestDocument>;
    findAll(): Promise<AccessRequestDocument[]>;
    findByUser(userId: string): Promise<AccessRequestDocument | null>;
    findApproved(): Promise<AccessRequestDocument[]>;
    updateStatus(requestId: string, dto: UpdateRequestStatusDto, adminUserId: string): Promise<AccessRequestDocument>;
}
export {};
