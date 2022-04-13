import { ProductsRepository } from "../../repositories/implementations/ProductsRepository";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const productsRepository = ProductsRepository.getInstance();

const createProductUseCase = new CreateProductUseCase(productsRepository);

const createProductsController = new CreateProductController(createProductUseCase);

export { createProductsController };