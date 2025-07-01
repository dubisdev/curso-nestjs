import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { Request } from 'express';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();

    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User not found in request context');
    }

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    return true;

    // for (const role of user.roles) {
    //   if (validRoles.includes(role)) {
    //     return true;
    //   }
    // }
    // throw new ForbiddenException(
    //   `User ${user.fullName} does not have the required roles: ${validRoles.join(', ')}`,
    // );
  }
}
