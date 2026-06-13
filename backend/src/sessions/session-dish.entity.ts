import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Dish } from '../dishes/dish.entity';
import { Session } from './session.entity';

@Entity('session_dishes')
export class SessionDish {
  @PrimaryColumn({ type: 'uuid' })
  sessionId!: string;

  @ManyToOne(() => Session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  session!: Session;

  @PrimaryColumn()
  dishId!: number;

  @ManyToOne(() => Dish, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dishId' })
  dish!: Dish;
}
