import { IsBoolean, IsInt } from 'class-validator';

export class SelectDishDto {
  @IsInt()
  dishId!: number;

  @IsBoolean()
  selected!: boolean;
}
