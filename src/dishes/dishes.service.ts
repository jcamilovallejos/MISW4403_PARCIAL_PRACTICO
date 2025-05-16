import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  findAll() {
    return this.dishRepository.find();
  }

  findOne(id: number) {
    return this.dishRepository.findOneBy({ id });
  }

  create(createDishDto: CreateDishDto) {
    const dish = this.dishRepository.create(createDishDto);
    return this.dishRepository.save(dish);
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    await this.dishRepository.update(id, updateDishDto);
    return this.dishRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.dishRepository.delete(id);
  }
}
