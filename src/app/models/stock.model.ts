import { StockType } from "./enums.model";

export class Stock{
    constructor(
        public id?: number,
        public type?: StockType,
        public capacity?: number,
        public temperature?: number,
        public description?: string
    ){}
}