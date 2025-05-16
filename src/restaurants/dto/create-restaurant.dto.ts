import { IsEnum, IsUrl, IsString } from 'class-validator';

export enum CuisineType {
  Italiana = 'Italiana',
  Japonesa = 'Japonesa',
  Mexicana = 'Mexicana',
  Colombiana = 'Colombiana',
  India = 'India',
  Internacional = 'Internacional',
}

export class CreateRestaurantDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsEnum(CuisineType)
  cuisineType!: CuisineType;

  @IsUrl()
  website!: string;
}
