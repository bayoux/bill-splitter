import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participant } from './participant.entity';
import { Dish } from '../dishes/dish.entity';

@Entity('selections')
export class Selection {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  participantId!: string;

  @ManyToOne(() => Participant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'participantId' })
  participant!: Participant;

  @Column()
  dishId!: number;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'dishId' })
  dish!: Dish;
}
