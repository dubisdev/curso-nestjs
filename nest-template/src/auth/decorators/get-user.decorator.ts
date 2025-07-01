import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entity';

type UserProp = keyof User;

export const GetUser = createParamDecorator((data: UserProp[], ctx) => {
  const req = ctx.switchToHttp().getRequest<Request>();

  const user = req.user as User;

  if (!user) {
    throw new InternalServerErrorException('User not found in request context');
  }

  const args = data || [];

  if (args.length > 0) {
    const entries = args.map((prop) => {
      if (prop in user) {
        return [prop, user[prop]];
      }

      return [undefined, undefined];
    });

    return Object.fromEntries(entries) as Partial<User>;
  }

  return user;
});
