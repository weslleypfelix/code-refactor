import { v4 as uuidv4 } from "uuid" 

class Product {
    id?: string;
    name: string;
    quantity: number;
    price: number;

    constructor(){
        (!this.id) ? this.id = uuidv4() : this.id
    }
}

export { Product };