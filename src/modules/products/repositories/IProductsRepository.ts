import { Product } from "../model/Product";

interface IProductDTO {
    name: string;
    quantity: number;
    price: number;
}

interface IProductsRepository {
    findByName(name: string): Product;
    list(): Product[];
    create({name, quantity, price}: IProductDTO): void;
}

export { IProductsRepository, IProductDTO };