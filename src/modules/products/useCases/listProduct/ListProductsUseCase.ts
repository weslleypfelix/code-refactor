import { Product } from "../../model/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

class ListProductsUseCase {
    constructor(private categoriesRepository: IProductsRepository){}
    execute(): Product[]{
        const products = this.categoriesRepository.list();

        return products;
    }
}

export { ListProductsUseCase };