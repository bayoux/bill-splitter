import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JoinSessionDto } from './dto/join-session.dto';
import { SelectDishDto } from './dto/select-dish.dto';
import { ParticipantTokenGuard } from './guards/participant-token.guard';
import { Participant } from './participant.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestWithUser } from '../auth/types/request-with-user';
import { CreateDishDto } from '../dishes/dto/create-dish.dto';
import { UpdateDishDto } from '../dishes/dto/update-dish.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req: RequestWithUser) {
    return this.sessionService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':sessionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('sessionId') sessionId: string, @Req() req: RequestWithUser) {
    return this.sessionService.delete(sessionId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':sessionId/dishes')
  @HttpCode(HttpStatus.CREATED)
  addDish(@Param('sessionId') sessionId: string, @Body() dto: CreateDishDto) {
    return this.sessionService.addDish(sessionId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':sessionId/dishes/:dishId')
  updateDish(
    @Param('sessionId') sessionId: string,
    @Param('dishId', ParseIntPipe) dishId: number,
    @Body() dto: UpdateDishDto,
  ) {
    return this.sessionService.updateDish(sessionId, dishId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':sessionId/dishes/:dishId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteDish(
    @Param('sessionId') sessionId: string,
    @Param('dishId', ParseIntPipe) dishId: number,
  ) {
    return this.sessionService.deleteDish(sessionId, dishId);
  }

  @Get(':sessionId/dishes')
  getDishes(@Param('sessionId') sessionId: string) {
    return this.sessionService.getDishes(sessionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sessionId/summary')
  getSummary(
    @Param('sessionId') sessionId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.sessionService.getSummary(sessionId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':sessionId/finish')
  @HttpCode(HttpStatus.OK)
  finishSession(
    @Param('sessionId') sessionId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.sessionService.finishSession(sessionId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':sessionId/qr')
  @UseInterceptors(FileInterceptor('file'))
  async uploadQr(
    @Param('sessionId') sessionId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.sessionService.uploadQr(sessionId, file, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':sessionId/name')
  updateName(
    @Param('sessionId') sessionId: string,
    @Body('name') name: string,
    @Req() req: RequestWithUser,
  ) {
    return this.sessionService.updateName(sessionId, name, req.user.userId);
  }
}
