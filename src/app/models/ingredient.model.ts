import { IngredientType } from "./enums.model";

export class Ingredient{
    constructor(
        public id?: number,
        public name?: string,
        public type?: IngredientType,
        public minStock?: number,
        public unitMeasure?: string,
        public supplier?: string
    ){}
}