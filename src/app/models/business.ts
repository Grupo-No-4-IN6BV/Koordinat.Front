export class Business{
    constructor(
        public _id: string,
        public name: string,
        public password: string,
        public email: string,
        public description: string,
        public phone: Number,
        public image: string,
        public lat: number,
        public lng: number,
        public products: [],
    ){}
}