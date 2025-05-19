import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { Dish } from "../dishes/entities/dish.entity";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";

const VALID_CUISINES = [
  "Italiana",
  "Japonesa",
  "Mexicana",
  "Colombiana",
  "India",
  "Internacional",
];

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({ relations: ["dishes"] });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ["dishes"],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurante con id ${id} no encontrado`);
    }
    return restaurant;
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    if (!VALID_CUISINES.includes(createRestaurantDto.cuisineType)) {
      throw new BadRequestException("Tipo de cocina inválido");
    }
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return this.restaurantRepository.save(restaurant);
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    // Validación del tipo de cocina
    if (
      updateRestaurantDto.cuisineType &&
      !VALID_CUISINES.includes(updateRestaurantDto.cuisineType)
    ) {
      throw new BadRequestException("Tipo de cocina inválido");
    }

    // Actualizar el restaurante
    await this.restaurantRepository.update(id, updateRestaurantDto);

    // Obtener el restaurante actualizado
    const updatedRestaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ["dishes"],
    });

    // Verificar si existe
    if (!updatedRestaurant) {
      throw new NotFoundException(
        `Restaurante con id ${id} no encontrado después de la actualización`
      );
    }

    return updatedRestaurant;
  }

  async delete(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }

  async addDishToRestaurant(
    restaurantId: number,
    dishId: number
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ["dishes"],
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurante no encontrado");
    }

    const dish = await this.dishRepository.findOneBy({ id: dishId });
    if (!dish) {
      throw new NotFoundException("Plato no encontrado");
    }

    if (!restaurant.dishes) {
      restaurant.dishes = [];
    }

    // Evita agregar duplicados
    if (!restaurant.dishes.find((d) => d.id === dish.id)) {
      restaurant.dishes.push(dish);
      await this.restaurantRepository.save(restaurant);
    }
    return restaurant;
  }

  async findDishesFromRestaurant(restaurantId: number): Promise<Dish[]> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ["dishes"],
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurante no encontrado");
    }
    return restaurant.dishes;
  }

  async findDishFromRestaurant(
    restaurantId: number,
    dishId: number
  ): Promise<Dish> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ["dishes"],
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurante no encontrado");
    }
    const dish = restaurant.dishes.find((d) => d.id === dishId);
    if (!dish) {
      throw new NotFoundException("Plato no asociado a este restaurante");
    }
    return dish;
  }

  async updateDishesFromRestaurant(
    restaurantId: number,
    dishIds: number[]
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ["dishes"],
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurante no encontrado");
    }
    const dishes = await this.dishRepository.findByIds(dishIds);
    restaurant.dishes = dishes;
    return this.restaurantRepository.save(restaurant);
  }

  async deleteDishFromRestaurant(
    restaurantId: number,
    dishId: number
  ): Promise<void> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ["dishes"],
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurante no encontrado");
    }

    const dishExists = restaurant.dishes.some((d) => d.id === dishId);
    if (!dishExists) {
      throw new NotFoundException(
        `Plato con id ${dishId} no está asociado a este restaurante`
      );
    }

    restaurant.dishes = restaurant.dishes.filter((d) => d.id !== dishId);
    await this.restaurantRepository.save(restaurant);
  }
}
