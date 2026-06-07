import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionDish } from './session-dish.entity';
import { Participant } from './participant.entity';
import { Selection } from './selection.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { DishesModule } from '../dishes/dishes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, SessionDish, Participant, Selection]),
    DishesModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
