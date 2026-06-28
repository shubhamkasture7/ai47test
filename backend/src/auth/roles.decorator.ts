import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/** Mark a controller or route as requiring specific roles. */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
