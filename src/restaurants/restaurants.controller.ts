import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpCode,
} from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { Dish } from "../dishes/entities/dish.entity";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.findOne(+id);
    if (!restaurant) {
      throw new NotFoundException("Restaurant does not exist!");
    }
    return restaurant;
  }

  @Post()
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.update(
      +id,
      updateRestaurantDto
    );
    if (!restaurant) {
      throw new NotFoundException("Restaurant does not exist!");
    }
    return restaurant;
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: string): Promise<void> {
    const restaurant = await this.restaurantsService.findOne(+id);
    if (!restaurant) {
      throw new NotFoundException("Restaurant does not exist!");
    }
    await this.restaurantsService.delete(+id);
  }

  // -------------------- Asociación Restaurante-Plato --------------------

  @Post(":restaurantId/dishes/:dishId")
  async addDishToRestaurant(
    @Param("restaurantId") restaurantId: string,
    @Param("dishId") dishId: string
  ): Promise<Restaurant> {
    return this.restaurantsService.addDishToRestaurant(+restaurantId, +dishId);
  }

  @Get(":id/dishes")
  async findDishesFromRestaurant(@Param("id") id: string): Promise<Dish[]> {
    return this.restaurantsService.findDishesFromRestaurant(+id);
  }

  @Get(":restaurantId/dishes/:dishId")
  async findDishFromRestaurant(
    @Param("restaurantId") restaurantId: string,
    @Param("dishId") dishId: string
  ): Promise<Dish> {
    return this.restaurantsService.findDishFromRestaurant(
      +restaurantId,
      +dishId
    );
  }

  @Put(":id/dishes")
  async updateDishesFromRestaurant(
    @Param("id") id: string,
    @Body() dishIds: number[]
  ): Promise<Restaurant> {
    return this.restaurantsService.updateDishesFromRestaurant(+id, dishIds);
  }

  @Delete(":restaurantId/dishes/:dishId")
  @HttpCode(204)
  async deleteDishFromRestaurant(
    @Param("restaurantId") restaurantId: string,
    @Param("dishId") dishId: string
  ): Promise<void> {
    await this.restaurantsService.deleteDishFromRestaurant(
      +restaurantId,
      +dishId
    );
  }
}
