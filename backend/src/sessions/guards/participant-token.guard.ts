import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from '../participant.entity';
import { Request } from 'express';

type ParticipantRequest = Request & { participant: Participant };

@Injectable()
export class ParticipantTokenGuard implements CanActivate {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ParticipantRequest>();
    const token = request.headers['x-participant-token'] as string | undefined;
    const sessionId = request.params.sessionId as string;

    if (!token) {
      throw new UnauthorizedException('Токен недействителен');
    }

    const participant = await this.participantRepository.findOne({
      where: { token, sessionId },
    });

    if (!participant) {
      throw new UnauthorizedException('Токен недействителен');
    }

    request.participant = participant;
    return true;
  }
}
