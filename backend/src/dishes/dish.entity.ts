import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session } from '../sessions/session.entity';

@Entity('dishes')
export class Dish {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (v: number) => v,
      from: (v: string) => parseFloat(v),
    },
  })
  price!: number;

  @Column({ type: 'uuid', nullable: true })
  sessionId?: string | null;

  @ManyToOne(() => Session, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'sessionId' })
  session?: Session | null;
}
