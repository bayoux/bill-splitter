import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class GuestOrJwtGuard implements CanActivate {
  constructor(private jwtGuard: JwtAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      return (await this.jwtGuard.canActivate(context)) as boolean;
    } catch {
      const ownerId = req.headers['x-owner-id'];
      if (!ownerId) return false;
      req.user = { userId: ownerId };
      return true;
    }
  }
}
