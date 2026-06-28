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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRequestsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const access_request_schema_1 = require("./schemas/access-request.schema");
const telegram_service_1 = require("../telegram/telegram.service");
let AccessRequestsService = class AccessRequestsService {
    requestModel;
    telegramService;
    constructor(requestModel, telegramService) {
        this.requestModel = requestModel;
        this.telegramService = telegramService;
    }
    async create(user, dto) {
        const existing = await this.requestModel.findOne({
            userId: user.userId,
            status: { $in: ['pending', 'approved'] },
        });
        if (existing) {
            throw new common_1.BadRequestException(`You already have a ${existing.status} request`);
        }
        return this.requestModel.create({ ...user, ...dto });
    }
    async findAll() {
        return this.requestModel.find().sort({ createdAt: -1 });
    }
    async findByUser(userId) {
        return this.requestModel.findOne({ userId }).sort({ createdAt: -1 });
    }
    async findApproved() {
        return this.requestModel.find({ status: 'approved' });
    }
    async updateStatus(requestId, dto, adminUserId) {
        const request = await this.requestModel.findById(requestId);
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        request.status = dto.status;
        request.reviewedBy = adminUserId;
        request.reviewedAt = new Date();
        await request.save();
        if (dto.status === 'approved') {
            await this.telegramService.sendApprovalNotification(request.telegramChatId, request.userName);
        }
        return request;
    }
};
exports.AccessRequestsService = AccessRequestsService;
exports.AccessRequestsService = AccessRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(access_request_schema_1.AccessRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        telegram_service_1.TelegramService])
], AccessRequestsService);
//# sourceMappingURL=access-requests.service.js.map