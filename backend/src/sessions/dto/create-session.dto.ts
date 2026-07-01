import { ArrayNotEmpty, IsArray, IsInt, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  name!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  dishIds!: number[];
}
