import {
  Body,
  Controller,
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

@Controller('sessions')
export class SessionsController {
  constructor(private sessionService: SessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.createSession(dto);
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
}
