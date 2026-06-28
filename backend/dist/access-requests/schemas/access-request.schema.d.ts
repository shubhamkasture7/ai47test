import { HydratedDocument } from 'mongoose';
export type AccessRequestDocument = HydratedDocument<AccessRequest>;
export type RequestStatus = 'pending' | 'approved' | 'rejected';
export declare class AccessRequest {
    userId: string;
    userEmail: string;
    userName: string;
    telegramChatId: string;
    reason: string;
    location: string;
    status: RequestStatus;
    reviewedBy?: string;
    reviewedAt?: Date;
}
export declare const AccessRequestSchema: import("mongoose").Schema<AccessRequest, import("mongoose").Model<AccessRequest, any, any, any, any, any, AccessRequest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<string, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userEmail?: import("mongoose").SchemaDefinitionProperty<string, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userName?: import("mongoose").SchemaDefinitionProperty<string, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    telegramChatId?: import("mongoose").SchemaDefinitionProperty<string, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<RequestStatus, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewedBy?: import("mongoose").SchemaDefinitionProperty<string | undefined, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, AccessRequest, import("mongoose").Document<unknown, {}, AccessRequest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AccessRequest & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AccessRequest>;
