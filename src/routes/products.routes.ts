import { Router } from "express";
import { createProductsController } from "../modules/products/useCases/createProduct";
import { listProductsController } from "../modules/products/useCases/listProduct";

const productsRoutes = Router();

productsRoutes.post("/", (req, res) => {
    return createProductsController.handle(req, res);
});

productsRoutes.get("/", (req, res) => {
    return listProductsController.handle(req, res);
})

export { productsRoutes }