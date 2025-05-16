import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    delete(id: string): Promise<void>;
}
