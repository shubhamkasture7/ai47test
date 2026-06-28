import type { ClerkUser } from '../auth/current-user.decorator';
import { UsersService } from './users.service';
declare class UpdateTelegramDto {
    telegramChatId: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: ClerkUser): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateTelegram(user: ClerkUser, dto: UpdateTelegramDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
export {};
