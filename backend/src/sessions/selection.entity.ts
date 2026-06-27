import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Participant } from './participant.entity';

@Entity('selections')
@Unique(['participantId', 'dishId'])
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
}
