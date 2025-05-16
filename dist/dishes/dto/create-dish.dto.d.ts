export declare enum DishCategory {
    Entrada = "entrada",
    PlatoFuerte = "plato fuerte",
    Postre = "postre",
    Bebida = "bebida"
}
export declare class CreateDishDto {
    name: string;
    description: string;
    price: number;
    category: DishCategory;
}
