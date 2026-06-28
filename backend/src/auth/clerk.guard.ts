import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import type { Request } from 'express';

/**
 * ClerkAuthGuard — verifies the Clerk JWT Bearer token using the
 * standalone `verifyToken` helper from @clerk/backend.
 * Attaches { userId, email } to request.user for downstream decorators.
 */
@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY ?? '',
      });

      // Attach decoded user info to request for @CurrentUser() decorator
      (request as unknown as Record<string, unknown>)['user'] = {
        userId: payload.sub,
        email: (payload as Record<string, unknown>)['email'] as string | undefined,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
