import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './session.entity';
import { SessionDish } from './session-dish.entity';
import { Participant } from './participant.entity';
import { Dish } from '../dishes/dish.entity';
import { Selection } from './selection.entity';
import { JoinSessionDto } from './dto/join-session.dto';
import * as crypto from 'node:crypto';
import { SelectDishDto } from './dto/select-dish.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

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
    const expiresAt = new Date(
      Date.now() + Number(process.env.SESSION_TTL_HOURS!) * 3600000,
    );
    const session = await this.sessionRepository.save({ expiresAt });

    const dishes = await this.dishRepository.findBy({
      id: In(dto.dishIds),
    });

    const sessionDishes = dishes.map((dish) => ({
      sessionId: session.id,
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
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

    if (session.expiresAt && session.expiresAt < new Date()) {
      throw new GoneException('Сессия истекла');
    }

    const sessionDishes = await this.sessionDishRepository.find({
      where: { sessionId },
    });

    const dishes = sessionDishes.map((sd) => ({
      id: sd.dishId,
      name: sd.name,
      price: sd.price,
    }));

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

  @Cron(CronExpression.EVERY_HOUR)
  async cleanExpiredSessions() {
    await this.sessionRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }

  async joinSession(
    sessionId: string,
    dto: JoinSessionDto,
  ): Promise<{ participantId: string; participantToken: string }> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Сессия не найдена');
    }

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
    participant: Participant,
    dto: SelectDishDto,
  ): Promise<{ ok: boolean }> {
    const sessionDish = await this.sessionDishRepository.findOne({
      where: { sessionId: participant.sessionId, dishId: dto.dishId },
    });

    if (!sessionDish)
      throw new BadRequestException('Блюдо не найдено в сессии');

    if (dto.selected) {
      const exists = await this.selectionRepository.findOne({
        where: { participantId: participant.id, dishId: dto.dishId },
      });
      if (!exists) {
        await this.selectionRepository.save({
          participantId: participant.id,
          dishId: dto.dishId,
        });
      }
    } else {
      await this.selectionRepository.delete({
        participantId: participant.id,
        dishId: dto.dishId,
      });
    }
    return { ok: true };
  }

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string) {
    const result = await this.sessionRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException(`Session ${id} not found`);
  }
}
