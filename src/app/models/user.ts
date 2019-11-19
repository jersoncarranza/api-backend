export class User{
    constructor(
        public _id:      string,
        public name:     string,
        public lastname: string,
        public nickname: string,
        public password: string,
        public role:     string,
        public image:    string,
        public email:    string,
        public gettoken: string,
        public codigo:   string,
        public genero:   string
        ) {}
}
