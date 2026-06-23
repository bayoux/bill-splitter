import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Dish } from './dishes/dish.entity';
import { QrCode } from './qr-code/qr-code.entity';
import { Session } from './sessions/session.entity';
import { SessionDish } from './sessions/session-dish.entity';
import { Selection } from './sessions/selection.entity';
import { Participant } from './sessions/participant.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [Dish, QrCode, Session, SessionDish, Selection, Participant],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
});
