import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController { 

    constructor(private createProductUseCase: CreateProductUseCase){}

    handle(req: Request, res: Response): Response {
        const { quantity, name, price } = req.body;

        this.createProductUseCase.execute({ quantity, name, price });

        return res.status(201).send();
    }
}

export { CreateProductController };