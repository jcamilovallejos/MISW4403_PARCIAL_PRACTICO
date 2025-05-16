"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const dish_entity_1 = require("../dishes/entities/dish.entity");
const VALID_CUISINES = [
    "Italiana",
    "Japonesa",
    "Mexicana",
    "Colombiana",
    "India",
    "Internacional",
];
let RestaurantsService = class RestaurantsService {
    constructor(restaurantRepository, dishRepository) {
        this.restaurantRepository = restaurantRepository;
        this.dishRepository = dishRepository;
    }
    async findAll() {
        return this.restaurantRepository.find({ relations: ["dishes"] });
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ["dishes"],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurante con id ${id} no encontrado`);
        }
        return restaurant;
    }
    async create(createRestaurantDto) {
        if (!VALID_CUISINES.includes(createRestaurantDto.cuisineType)) {
            throw new common_1.BadRequestException("Tipo de cocina inválido");
        }
        const restaurant = this.restaurantRepository.create(createRestaurantDto);
        return this.restaurantRepository.save(restaurant);
    }
    async update(id, updateRestaurantDto) {
        if (updateRestaurantDto.cuisineType &&
            !VALID_CUISINES.includes(updateRestaurantDto.cuisineType)) {
            throw new common_1.BadRequestException("Tipo de cocina inválido");
        }
        await this.restaurantRepository.update(id, updateRestaurantDto);
        const updatedRestaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ["dishes"],
        });
        if (!updatedRestaurant) {
            throw new common_1.NotFoundException(`Restaurante con id ${id} no encontrado después de la actualización`);
        }
        return updatedRestaurant;
    }
    async delete(id) {
        await this.restaurantRepository.delete(id);
    }
    async addDishToRestaurant(restaurantId, dishId) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ["dishes"],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurante no encontrado");
        }
        const dish = await this.dishRepository.findOneBy({ id: dishId });
        if (!dish) {
            throw new common_1.NotFoundException("Plato no encontrado");
        }
        if (!restaurant.dishes) {
            restaurant.dishes = [];
        }
        if (!restaurant.dishes.find((d) => d.id === dish.id)) {
            restaurant.dishes.push(dish);
            await this.restaurantRepository.save(restaurant);
        }
        return restaurant;
    }
    async findDishesFromRestaurant(restaurantId) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ["dishes"],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurante no encontrado");
        }
        return restaurant.dishes;
    }
    async findDishFromRestaurant(restaurantId, dishId) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ["dishes"],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurante no encontrado");
        }
        const dish = restaurant.dishes.find((d) => d.id === dishId);
        if (!dish) {
            throw new common_1.NotFoundException("Plato no asociado a este restaurante");
        }
        return dish;
    }
    async updateDishesFromRestaurant(restaurantId, dishIds) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ["dishes"],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurante no encontrado");
        }
        const dishes = await this.dishRepository.findByIds(dishIds);
        restaurant.dishes = dishes;
        return this.restaurantRepository.save(restaurant);
    }
    async deleteDishFromRestaurant(restaurantId, dishId) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantId },
            relations: ["dishes"],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurante no encontrado");
        }
        restaurant.dishes = restaurant.dishes.filter((d) => d.id !== dishId);
        return this.restaurantRepository.save(restaurant);
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(dish_entity_1.Dish)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map