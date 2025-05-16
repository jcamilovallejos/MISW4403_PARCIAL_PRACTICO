import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export enum DishCategory {
  Entrada = 'entrada',
  PlatoFuerte = 'plato fuerte',
  Postre = 'postre',
  Bebida = 'bebida',
}

export class CreateDishDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsEnum(DishCategory)
  category!: DishCategory;
}
