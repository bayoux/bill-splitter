import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-participant-token'];

    if (token) {
      return true;
    }
    return false;
  }
}
