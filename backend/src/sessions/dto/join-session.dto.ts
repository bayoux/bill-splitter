import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class JoinSessionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name!: string;
}
