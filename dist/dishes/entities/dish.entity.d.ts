import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare class Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    restaurants: Restaurant[];
}
