import {
  Controller,
  Get,
  Post,
  Body,
  Put,
} from "@nestjs/common";
import { DishesService } from "./dishes.service";
import { CreateDishDto } from "./dto/create-dish.dto";
import { UpdateDishDto } from "./dto/update-dish.dto";
import { Delete, Param, HttpCode } from '@nestjs/common';

@Controller("dishes")
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @Get()
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dishesService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(+id, updateDishDto);
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: string): Promise<void> {
    await this.dishesService.delete(+id);
  }
}
