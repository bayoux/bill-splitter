import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateSessionDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  dishIds!: number[];
}
