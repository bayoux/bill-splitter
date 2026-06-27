import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
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

  @Column()
  name!: string;

  @Column({ type: 'numeric' })
  price!: number;
}
