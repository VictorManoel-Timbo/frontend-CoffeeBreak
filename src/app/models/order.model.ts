import { OrderStatus, WithdrawalMethod } from "./enums.model";

export class Order {
    constructor(
        public id?: number,
        public clientId?: number,
        public moment?: string,
        public status?: OrderStatus,
        public withdrawalMethod?: WithdrawalMethod
    ){}
}