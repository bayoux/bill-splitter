import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesModule } from './dishes/dishes.module';
import { Dish } from './dishes/dish.entity';
import { ConfigModule } from '@nestjs/config';
import { QrCodeModule } from './qr-code/qr-code.module';
import { QrCode } from './qr-code/qr-code.entity';
import { Session } from './sessions/session.entity';
import { SessionDish } from './sessions/session-dish.entity';
import { Selection } from './sessions/selection.entity';
import { Participant } from './sessions/participant.entity';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [Dish, QrCode, Session, SessionDish, Selection, Participant],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    DishesModule,
    QrCodeModule,
    SessionsModule,
  ],
})
export class AppModule {}
