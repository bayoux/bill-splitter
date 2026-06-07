import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './session.entity';
import { SessionDish } from './session-dish.entity';
import { Participant } from './participant.entity';
import { Dish } from '../dishes/dish.entity';
import { Selection } from './selection.entity';
import { JoinSessionDto } from './dto/join-session.dto';
import * as crypto from 'node:crypto';
import { SelectDishDto } from './dto/select-dish.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,

    @InjectRepository(SessionDish)
    private sessionDishRepository: Repository<SessionDish>,

    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,

    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,

    @InjectRepository(Selection)
    private selectionRepository: Repository<Selection>,
  ) {}

  async createSession(dto: CreateSessionDto): Promise<{ sessionId: string }> {
    const session = await this.sessionRepository.save({});

    const sessionDishes = dto.dishIds.map((dishId) => ({
      sessionId: session.id,
      dishId,
    }));
    await this.sessionDishRepository.save(sessionDishes);

    return { sessionId: session.id };
  }

  async getSession(sessionId: string): Promise<{
    sessionId: string;
    dishes: Dish[];
    participants: {
      id: string;
      name: string;
      selections: number[];
    }[];
  }> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Сессия не найдена');
    }

    const sessionDishes = await this.sessionDishRepository.find({
      where: { sessionId: sessionId },
    });

    const dishes = await this.dishRepository.findBy({
      id: In(sessionDishes.map((sessionDish) => sessionDish.dishId)),
    });

    const participants = await this.participantRepository.find({
      where: { sessionId: sessionId },
    });

    const selections = await this.selectionRepository.findBy({
      participantId: In(participants.map((participant) => participant.id)),
    });

    const result = participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      selections: selections
        .filter((selection) => selection.participantId === participant.id)
        .map((selection) => selection.dishId),
    }));

    return {
      sessionId,
      dishes,
      participants: result,
    };
  }

  async joinSession(
    sessionId: string,
    dto: JoinSessionDto,
  ): Promise<{ participantId: string; participantToken: string }> {
    const name = await this.participantRepository.findOne({
      where: { name: dto.name, sessionId: sessionId },
    });

    if (name) {
      throw new ConflictException('Имя уже занято');
    }

    const token = crypto.randomBytes(32).toString('hex');

    const user = await this.participantRepository.save({
      name: dto.name,
      token: token,
      sessionId: sessionId,
    });

    return {
      participantId: user.id,
      participantToken: user.token,
    };
  }

  async selectDish(
    sessionId: string,
    token: string,
    dto: SelectDishDto,
  ): Promise<{ ok: boolean }> {
    const user = await this.participantRepository.findOne({
      where: { token: token, sessionId: sessionId },
    });

    if (!user) {
      throw new UnauthorizedException('Токен недействителен');
    }

    if (dto.selected) {
      await this.selectionRepository.save({
        participantId: user.id,
        dishId: dto.dishId,
      });
    } else {
      await this.selectionRepository.delete({
        participantId: user.id,
        dishId: dto.dishId,
      });
    }

    return { ok: true };
  }
}
