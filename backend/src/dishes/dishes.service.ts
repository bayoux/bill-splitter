import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async findAll(): Promise<Dish[]> {
    return await this.dishRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOneBy({ id });
    if (!dish) throw new NotFoundException(`Dish ${id} not found`);
    return dish;
  }

  async create(dto: CreateDishDto): Promise<Dish> {
    return await this.dishRepository.save(dto);
  }

  async delete(id: number): Promise<void> {
    const result = await this.dishRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Dish ${id} not found`);
  }

  async update(id: number, dto: UpdateDishDto): Promise<Dish> {
    await this.dishRepository.update(id, dto);
    return this.findOne(id);
  }
}
