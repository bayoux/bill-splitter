import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ParseIntPipe,
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
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findOne(id);
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(@Body() newDish: Partial<Dish>) {
    return this.dishesService.create(newDish);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.delete(id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedDish: Partial<Dish>,
  ) {
    return this.dishesService.update(id, updatedDish);
  }
}
