import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { Dish } from "../dishes/entities/dish.entity";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
export declare class RestaurantsService {
    private readonly restaurantRepository;
    private readonly dishRepository;
    constructor(restaurantRepository: Repository<Restaurant>, dishRepository: Repository<Dish>);
    findAll(): Promise<Restaurant[]>;
    findOne(id: number): Promise<Restaurant>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    delete(id: number): Promise<void>;
    addDishToRestaurant(restaurantId: number, dishId: number): Promise<Restaurant>;
    findDishesFromRestaurant(restaurantId: number): Promise<Dish[]>;
    findDishFromRestaurant(restaurantId: number, dishId: number): Promise<Dish>;
    updateDishesFromRestaurant(restaurantId: number, dishIds: number[]): Promise<Restaurant>;
    deleteDishFromRestaurant(restaurantId: number, dishId: number): Promise<Restaurant>;
}
