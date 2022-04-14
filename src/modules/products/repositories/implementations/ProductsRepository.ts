import { Product } from "../../model/Product";
import { IProductsRepository, IProductDTO } from "../IProductsRepository";

class ProductsRepository implements IProductsRepository {
    private products: Product[];
    private static INSTANCE: ProductsRepository;

    private constructor(){
        this.products = [];
    }

    public static getInstance(): ProductsRepository {
        if(!ProductsRepository.INSTANCE){
            ProductsRepository.INSTANCE = new ProductsRepository();
        }
        return ProductsRepository.INSTANCE;
    }

    create({ name, quantity, price }: IProductDTO): void {
        const product = new Product();
        Object.assign(product, {
            name, 
            quantity,
            price
        });

        this.products.push(product);
    }

    list(): Product[] {
        return this.products;
    }

    findByName(name: string): Product {
        const product = this.products.find(products => products.name === name);
        return product;
    }
}

export { ProductsRepository };