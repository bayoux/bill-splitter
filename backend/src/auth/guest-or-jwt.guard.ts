import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GuestOrJwtGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const ownerId = request.headers['x-owner-id'];

    if (ownerId && typeof ownerId === 'string') {
      request.user = { userId: ownerId };
      return true;
    }

    try {
      return (await super.canActivate(context)) as boolean;
    } catch {
      return false;
    }
  }
}
