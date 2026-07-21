import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionDish } from './session-dish.entity';
import { Participant } from './participant.entity';
import { Selection } from './selection.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { DishesModule } from '../dishes/dishes.module';
import { ParticipantTokenGuard } from './guards/participant-token.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { GuestOrJwtGuard } from '../auth/guest-or-jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, SessionDish, Participant, Selection]),
    DishesModule,
  ],
  controllers: [SessionsController],
  providers: [
    SessionsService,
    ParticipantTokenGuard,
    JwtAuthGuard,
    OptionalJwtAuthGuard,
    GuestOrJwtGuard,
  ],
})
export class SessionsModule {}
