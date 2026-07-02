import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JoinSessionDto } from './dto/join-session.dto';
import { SelectDishDto } from './dto/select-dish.dto';
import { ParticipantTokenGuard } from './guards/participant-token.guard';
import { Participant } from './participant.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestWithUser } from '../auth/types/request-with-user';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionService: SessionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSessionDto, @Req() req: RequestWithUser) {
    return this.sessionService.createSession(dto, req.user.userId);
  }

  @Get(':sessionId')
  @Header('Cache-Control', 'no-store')
  get(@Param('sessionId') sessionId: string) {
    return this.sessionService.getSession(sessionId);
  }

  @Post(':sessionId/join')
  @HttpCode(HttpStatus.CREATED)
  join(@Param('sessionId') sessionId: string, @Body() dto: JoinSessionDto) {
    return this.sessionService.joinSession(sessionId, dto);
  }

  @UseGuards(ParticipantTokenGuard)
  @Post(':sessionId/select')
  @HttpCode(HttpStatus.OK)
  select(
    @Param('sessionId') sessionId: string,
    @Req() req: { participant: Participant },
    @Body() dto: SelectDishDto,
  ) {
    return this.sessionService.selectDish(req.participant, dto);
  }

  @Get()
  getAll() {
    return this.sessionService.findAll();
  }

  @Delete(':sessionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('sessionId') sessionId: string) {
    return this.sessionService.delete(sessionId);
  }
}
