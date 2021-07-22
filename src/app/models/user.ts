export class User{
    constructor(
        public _id: string,
        public role: string,
        public names:string,
        public lastname :string,
        public email :string,
        public password :string,
        public dateage :string,
        public lat :number,
        public lng :number,
    ){}
}