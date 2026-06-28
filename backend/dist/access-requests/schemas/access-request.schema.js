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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRequestSchema = exports.AccessRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AccessRequest = class AccessRequest {
    userId;
    userEmail;
    userName;
    telegramChatId;
    reason;
    location;
    status;
    reviewedBy;
    reviewedAt;
};
exports.AccessRequest = AccessRequest;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "userEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "userName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AccessRequest.prototype, "telegramChatId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 500 }),
    __metadata("design:type", String)
], AccessRequest.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'London' }),
    __metadata("design:type", String)
], AccessRequest.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true,
    }),
    __metadata("design:type", String)
], AccessRequest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AccessRequest.prototype, "reviewedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], AccessRequest.prototype, "reviewedAt", void 0);
exports.AccessRequest = AccessRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AccessRequest);
exports.AccessRequestSchema = mongoose_1.SchemaFactory.createForClass(AccessRequest);
exports.AccessRequestSchema.index({ userId: 1, status: 1 });
//# sourceMappingURL=access-request.schema.js.map