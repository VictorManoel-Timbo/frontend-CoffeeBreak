import { Category } from "./category.model";
import { ProductAvailable } from "./enums.model";
import { ProductStockIngredient } from "./product-stock-ingredient.model";

export class Product {
    constructor(
        public id?: number,
        public category?: Category,
        public price?: number,
        public name?: string,
        public available?: ProductAvailable, 
        public imageUrl?: string,
        public calories?: number,
        public composition?: ProductStockIngredient[]
    ){}
}