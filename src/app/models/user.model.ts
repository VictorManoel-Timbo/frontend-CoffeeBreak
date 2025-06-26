export class User {
    constructor(
        public id?: string,
        public name?: string,
        public password?: string,
        public email?: string,
        public phone?: string,
        public country?: string,
        public role?: string
    ) {}
}