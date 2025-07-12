import { UserRole } from "./enums.model";

export class LoginResponse {
    constructor(
        public token?: string,
        public email?: string,
        public role?: UserRole
    ) {}
}