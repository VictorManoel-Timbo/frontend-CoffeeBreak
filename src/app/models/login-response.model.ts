export class LoginResponse {
    constructor(
        public token?: string,
        public email?: string
    ) {}
}