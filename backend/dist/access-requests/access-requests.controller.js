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
exports.AccessRequestsController = void 0;
const common_1 = require("@nestjs/common");
const clerk_guard_1 = require("../auth/clerk.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const backend_1 = require("@clerk/backend");
const access_requests_service_1 = require("./access-requests.service");
const create_access_request_dto_1 = require("./dto/create-access-request.dto");
const update_request_status_dto_1 = require("./dto/update-request-status.dto");
let AccessRequestsController = class AccessRequestsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(user, dto) {
        const clerkClient = (0, backend_1.createClerkClient)({
            secretKey: process.env.CLERK_SECRET_KEY || '',
        });
        const userObj = await clerkClient.users.getUser(user.userId);
        const primaryEmail = userObj.emailAddresses.find((e) => e.id === userObj.primaryEmailAddressId)?.emailAddress
            || userObj.emailAddresses[0]?.emailAddress
            || '';
        const name = [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') || primaryEmail.split('@')[0] || 'User';
        return this.service.create({
            userId: user.userId,
            userEmail: primaryEmail,
            userName: name,
        }, dto);
    }
    findAll() {
        return this.service.findAll();
    }
    getMyRequest(user) {
        return this.service.findByUser(user.userId);
    }
    updateStatus(id, dto, admin) {
        return this.service.updateStatus(id, dto, admin.userId);
    }
};
exports.AccessRequestsController = AccessRequestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_access_request_dto_1.CreateAccessRequestDto]),
    __metadata("design:returntype", Promise)
], AccessRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "getMyRequest", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_request_status_dto_1.UpdateRequestStatusDto, Object]),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "updateStatus", null);
exports.AccessRequestsController = AccessRequestsController = __decorate([
    (0, common_1.Controller)('access-requests'),
    (0, common_1.UseGuards)(clerk_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [access_requests_service_1.AccessRequestsService])
], AccessRequestsController);
//# sourceMappingURL=access-requests.controller.js.map