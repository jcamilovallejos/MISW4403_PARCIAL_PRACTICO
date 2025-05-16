export declare enum CuisineType {
    Italiana = "Italiana",
    Japonesa = "Japonesa",
    Mexicana = "Mexicana",
    Colombiana = "Colombiana",
    India = "India",
    Internacional = "Internacional"
}
export declare class CreateRestaurantDto {
    name: string;
    address: string;
    cuisineType: CuisineType;
    website: string;
}
