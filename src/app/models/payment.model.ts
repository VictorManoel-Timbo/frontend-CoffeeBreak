import { PaymentMethod } from "./enums.model";

export class Payment {
    constructor(
        public id?: number,
        public orderId?: number,
        public value?: number,
        public method?: PaymentMethod,
        public moment?: string,
        public installments?: number
    ){}
}