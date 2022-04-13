import { Router } from "express";
import { createProductsController } from "../useCases/createProduct";

const productsRoutes = Router();

productsRoutes.post("/", (req, res) => {
    return createProductsController.handle(req, res);
})

export { productsRoutes }