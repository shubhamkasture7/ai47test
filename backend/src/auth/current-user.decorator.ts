import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface ClerkUser {
  userId: string;
  email?: string;
}

/**
 * @CurrentUser() — extracts the decoded Clerk payload from request.user.
 * Only available after ClerkAuthGuard has run.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ClerkUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as unknown as Record<string, unknown>)['user'] as ClerkUser;
  },
);
