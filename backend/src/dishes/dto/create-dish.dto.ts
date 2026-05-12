import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty({ message: 'Название блюда не может быть пустым' })
  @MaxLength(255, { message: 'Название не может превышать 255 символов' })
  name!: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Цена должна быть числом с точностью до 2 знаков' },
  )
  @IsPositive({ message: 'Цена должна быть положительным числом' })
  @Min(0.01, { message: 'Минимальная цена 0.01' })
  price!: number;
}
