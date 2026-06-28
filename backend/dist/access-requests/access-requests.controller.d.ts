import type { ClerkUser } from '../auth/current-user.decorator';
import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
export declare class AccessRequestsController {
    private readonly service;
    constructor(service: AccessRequestsService);
    create(user: ClerkUser, dto: CreateAccessRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/access-request.schema").AccessRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/access-request.schema").AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/access-request.schema").AccessRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/access-request.schema").AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyRequest(user: ClerkUser): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/access-request.schema").AccessRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/access-request.schema").AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateStatus(id: string, dto: UpdateRequestStatusDto, admin: ClerkUser): Promise<import("mongoose").Document<unknown, {}, import("./schemas/access-request.schema").AccessRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/access-request.schema").AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
