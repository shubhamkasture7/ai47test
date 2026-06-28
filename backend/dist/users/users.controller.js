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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const clerk_guard_1 = require("../auth/clerk.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const users_service_1 = require("./users.service");
const backend_1 = require("@clerk/backend");
class UpdateTelegramDto {
    telegramChatId;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTelegramDto.prototype, "telegramChatId", void 0);
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getMe(user) {
        let found = await this.usersService.findByClerkId(user.userId);
        if (!found) {
            const clerkClient = (0, backend_1.createClerkClient)({
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
    async updateTelegram(user, dto) {
        const updated = await this.usersService.updateTelegramChatId(user.userId, dto.telegramChatId);
        if (!updated)
            throw new common_1.NotFoundException('User not found');
        return updated;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('me/telegram'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateTelegramDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateTelegram", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(clerk_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map