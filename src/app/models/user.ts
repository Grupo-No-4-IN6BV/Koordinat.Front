export class User{
    constructor(
        public _id: string,
        public role: string,
        public name:string,
        public lastname :string,
        public username: string,
        public email :string,
        public password :string,
        public dateage :string,
        public lat :number,
        public lng :number,
    ){}
}