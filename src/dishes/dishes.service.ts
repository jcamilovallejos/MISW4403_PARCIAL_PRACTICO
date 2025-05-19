import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dish } from "./entities/dish.entity";
import { CreateDishDto } from "./dto/create-dish.dto";
import { UpdateDishDto } from "./dto/update-dish.dto";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { Delete, Param, HttpCode } from "@nestjs/common";

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>
  ) {}

  findAll() {
    return this.dishRepository.find();
  }

  async findOne(id: number) {
    const dish = await this.dishRepository.findOneBy({ id });
    if (!dish) {
      throw new NotFoundException(`Plato con id ${id} no encontrado`);
    }
    return dish;
  }

  async create(createDishDto: CreateDishDto) {
    try {
      const dto = plainToInstance(CreateDishDto, createDishDto);
      await validateOrReject(dto);
      const dish = this.dishRepository.create(createDishDto);
      return await this.dishRepository.save(dish);
    } catch (error) {
      if (Array.isArray(error) && error[0]?.constraints) {
        const messages = error.map((e) => Object.values(e.constraints)).flat();
        throw new BadRequestException(messages.join(", "));
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException("Datos inválidos");
    }
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    await this.dishRepository.update(id, updateDishDto);
    const updated = await this.dishRepository.findOneBy({ id });
    if (!updated) {
      throw new NotFoundException(`Plato con id ${id} no encontrado`);
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    const dish = await this.dishRepository.findOneBy({ id });
    if (!dish) {
      throw new NotFoundException(`Plato con id ${id} no encontrado`);
    }
    await this.dishRepository.delete(id);
  }
}
