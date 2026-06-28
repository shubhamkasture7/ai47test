import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import type { Request } from 'express';
import type { ClerkUser } from './current-user.decorator';

/**
 * RolesGuard — checks that the authenticated user's Clerk ID
 * is included in the ADMIN_USER_IDS environment variable.
 * Must be used AFTER ClerkAuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles required, allow
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as unknown as Record<string, unknown>)['user'] as
      | ClerkUser
      | undefined;

    if (!user?.userId) throw new ForbiddenException('Access denied');

    if (requiredRoles.includes('admin')) {
      const adminIds = (process.env.ADMIN_USER_IDS ?? '')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);

      if (!adminIds.includes(user.userId)) {
        throw new ForbiddenException('Admin access required');
      }
    }

    return true;
  }
}
