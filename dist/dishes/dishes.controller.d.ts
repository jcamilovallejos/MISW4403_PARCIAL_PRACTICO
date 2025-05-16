import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
export declare class DishesController {
    private readonly dishesService;
    constructor(dishesService: DishesService);
    create(createDishDto: CreateDishDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateDishDto: UpdateDishDto): Promise<any>;
    remove(id: string): any;
}
