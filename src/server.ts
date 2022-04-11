import express from "express";
const { v4: uuidv4 } = require("uuid");
import { Request, Response } from "express";

const app = express();

app.use(express.json());

interface Product {
    quantity?: number,
    name: string,
    price: number,
    id: string
}

let Products: Array<Product> = [];

app.get("/", (req : Request, res: Response) => {
    res.json({ message: "server is actually running.. " })
});

app.post("/product", (req: Request, res: Response) => {
    const { name, price } = req.body;
    const id = uuidv4();

    const productAlreadyExists = Products.some((product) => {
        if(product.name === name) {
            return true;
        }
    });

    if(productAlreadyExists) {
        return res.status(400).json({ error: "Product already registered!.." });
    } else {
        Products.push({
            name,
            price,
            id
        });
        console.log("product: ", Products);
        return res.status(201).send();
    }
});

app.put("/product", (req: Request, res: Response) => {
    const { id, name } = req.body;
    Products.find((products) => {
        if(products.id === id) {
            products.name = name
        }
    })
    return res.json(Products);
});

app.delete("/product", (req: Request, res: Response) => {
    const { id } = req.body;

    const newArray = Products.filter((products) => {
        if(products.id !== id){
            return Products;
        }
    });
    Products = newArray;
    return res.json(Products);

})

app.get("/product", (req: Request, res: Response) => {
    return res.json(Products);
});

app.listen(3000);

