import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
interface FindOrCreatePayload {
    clerkId: string;
    email: string;
    name: string;
}
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findOrCreate(payload: FindOrCreatePayload): Promise<UserDocument>;
    findByClerkId(clerkId: string): Promise<UserDocument | null>;
    findApprovedUsers(): Promise<UserDocument[]>;
    updateTelegramChatId(clerkId: string, chatId: string): Promise<UserDocument | null>;
}
export {};
