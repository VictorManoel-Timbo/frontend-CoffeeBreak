export class ProductStockIngredient{
    constructor(
        public stockId?: number,
        public ingredientId?: number,
        public quantityRequired?: number,
        public replaceable?: boolean,
        public useType?: string,
        public reusable?: boolean
    ){}
}