import { UserRole } from "./enums.model"

export class User {
    constructor(
        public id?: number,
        public name?: string,
        public password?: string,
        public email?: string,
        public phone?: string,
        public country?: string,
        public role?: UserRole
    ) {}
}