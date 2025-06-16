import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const RawHeaders = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest<Request>();

  return req.rawHeaders;
});
