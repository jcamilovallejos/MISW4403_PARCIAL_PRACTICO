import { Dish } from '../../dishes/entities/dish.entity';
export declare class Restaurant {
    id: number;
    name: string;
    address: string;
    cuisineType: string;
    website: string;
    dishes: Dish[];
}
