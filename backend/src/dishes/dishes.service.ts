import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async findAll(): Promise<Dish[]> {
    return await this.dishRepository.find();
  }

  async findOne(id: number): Promise<Dish | null> {
    return await this.dishRepository.findOneBy({ id });
  }

  async create(dish: Partial<Dish>): Promise<Dish> {
    return await this.dishRepository.save(dish);
  }

  async delete(id: number) {
    await this.dishRepository.delete(id);
  }

  async update(id: number, dish: Partial<Dish>): Promise<Dish | null> {
    await this.dishRepository.update(id, dish);
    return this.findOne(id);
  }

}
