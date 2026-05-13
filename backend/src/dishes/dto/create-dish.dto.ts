import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty({ message: 'Название блюда не может быть пустым' })
  @MaxLength(255, { message: 'Название не может превышать 255 символов' })
  name!: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Цена должна быть числом с точностью до 2 знаков' },
  )
  @Transform(({ value }) => Number(value))
  @IsPositive({ message: 'Цена должна быть положительным числом' })
  @Min(0.01, { message: 'Минимальная цена 0.01' })
  price!: number;
}
