import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.findOne(+id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant does not exist!');
    }
    return restaurant;
  }

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.update(+id, updateRestaurantDto);
    if (!restaurant) {
      throw new NotFoundException('Restaurant does not exist!');
    }
    return restaurant;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const restaurant = await this.restaurantsService.findOne(+id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant does not exist!');
    }
    await this.restaurantsService.delete(+id);
  }
}
