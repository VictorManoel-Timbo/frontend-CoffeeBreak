import { ProductAvailable } from "./enums.model";

export class Product {
    constructor(
        public id?: number,
        public categoryId?: string, // FK
        public price?: number,
        public name?: string,
        public avalible?: ProductAvailable, // ENUM
        public imageUrl?: string,
        public calories?: number
    ){}
}