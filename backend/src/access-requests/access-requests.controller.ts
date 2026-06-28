import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/clerk.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import type { ClerkUser } from '../auth/current-user.decorator';
import { createClerkClient } from '@clerk/backend';
import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Controller('access-requests')
@UseGuards(ClerkAuthGuard)
export class AccessRequestsController {
  constructor(private readonly service: AccessRequestsService) {}

  /** POST /api/v1/access-requests — user submits a request */
  @Post()
  async create(
    @CurrentUser() user: ClerkUser,
    @Body() dto: CreateAccessRequestDto,
  ) {
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY || '',
    });
    const userObj = await clerkClient.users.getUser(user.userId);
    const primaryEmail = userObj.emailAddresses.find((e) => e.id === userObj.primaryEmailAddressId)?.emailAddress 
      || userObj.emailAddresses[0]?.emailAddress 
      || '';
    const name = [userObj.firstName, userObj.lastName].filter(Boolean).join(' ') || primaryEmail.split('@')[0] || 'User';

    return this.service.create(
      {
        userId: user.userId,
        userEmail: primaryEmail,
        userName: name,
      },
      dto,
    );
  }

  /** GET /api/v1/access-requests — admin lists all requests */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.service.findAll();
  }

  /** GET /api/v1/access-requests/me — current user's own request */
  @Get('me')
  getMyRequest(@CurrentUser() user: ClerkUser) {
    return this.service.findByUser(user.userId);
  }

  /** PATCH /api/v1/access-requests/:id/status — admin updates status */
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateRequestStatusDto,
    @CurrentUser() admin: ClerkUser,
  ) {
    return this.service.updateStatus(id, dto, admin.userId);
  }
}
