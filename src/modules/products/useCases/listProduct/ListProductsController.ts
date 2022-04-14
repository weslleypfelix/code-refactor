import { Request, Response } from "express";
import { ListProductsUseCase } from "./ListProductsUseCase";

class ListProductsController {

    constructor(private listProductsUseCase: ListProductsUseCase){}

    handle(req: Request, res: Response): Response {
        const all = this.listProductsUseCase.execute();

        return res.json(all);
    }
}

export { ListProductsController };