import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  getAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.dishesService.findOne(+id);
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() newDish: Partial<Dish>) {
    return this.dishesService.create(newDish);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dishesService.delete(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(@Param('id') id: string, @Body() updatedDish: Partial<Dish>) {
    return this.dishesService.update(+id, updatedDish);
  }
}
