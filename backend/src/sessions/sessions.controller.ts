import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JoinSessionDto } from './dto/join-session.dto';
import { SelectDishDto } from './dto/select-dish.dto';
import { ParticipantTokenGuard } from './guards/participant-token.guard';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionService: SessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.createSession(dto);
  }

  @Get(':sessionId')
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
    @Headers('x-participant-token') token: string,
    @Body() dto: SelectDishDto,
  ) {
    return this.sessionService.selectDish(sessionId, token, dto);
  }
}
