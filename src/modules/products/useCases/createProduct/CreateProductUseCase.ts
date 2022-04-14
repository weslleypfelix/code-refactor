import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IRequest {
    name: string,
    quantity: number
    price: number,
}

class CreateProductUseCase {

    constructor(private productsRepository: IProductsRepository){};

    execute({ name, price, quantity }: IRequest): void {
        const productAlreadyExists = this.productsRepository.findByName(name);
        if(productAlreadyExists) {
            throw new Error("Product already exists!..")
        } else {
            this.productsRepository.create({ name, price, quantity });
        }
    }
}

export { CreateProductUseCase };