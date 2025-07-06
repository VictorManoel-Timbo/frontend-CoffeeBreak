export class OrderItem{
    constructor(
        public orderId?: number,
        public productId?: number,
        public unitPrice?: number,
        public quantity?: number,
        public discount?: number,
        public observation?: string
    ){}
}