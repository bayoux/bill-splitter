import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QrCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  qrPath!: string;

  @Column({ nullable: true })
  fileSize!: number;

  @Column({ nullable: true })
  s3Key!: string;
}
