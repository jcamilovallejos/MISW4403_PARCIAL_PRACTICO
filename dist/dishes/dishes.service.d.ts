import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
export declare class DishesService {
    private dishRepository;
    constructor(dishRepository: Repository<Dish>);
    findAll(): any;
    findOne(id: number): any;
    create(createDishDto: CreateDishDto): any;
    update(id: number, updateDishDto: UpdateDishDto): Promise<any>;
    delete(id: number): any;
}
