
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// interface Product {
//     title: string,
//     id: 2,
//     description: string,
//     price: number,
//     imgs: string, // Todo: Array<string> for later refactore
//     available_pieces: number,
//     category: string, // "electronics"
//     type: string, // Mobile, TV, etc..
//     // rate: number, //* not required
//     // reviews_count: number, //* not required
//     discount: number, //* not required
//     specifications: {
//         brand: string,
//         color: string
//     }
// }

interface Product {
    _id: string
}

/**
 **  Category **
 ** ---------------
 *  - Books
 *  - Sports
 *  - Electronics
 *  - Children and babies
 *  - Style and fashion
 *  - Pets
 *  - Beauty and Health
 */ 

const products:Array<Product> = [];

export function addProduct(req: Request, res: Response ) {
    const date = new Date();
    req.body._id = date.getTime().toString(16);
    products.push( req.body );

    res.status( StatusCodes.OK ).json({ data: req.body, Len_Now: products.length, status: "New Item just Added! 🚀"});

}

export function getAllProducts(req: Request, res: Response ) {

    res.status( StatusCodes.OK ).json({ products, Len_Now: products.length, status: "Here is what you need baby! 😘"});
}

export function updateProduct(req: Request, res: Response ) {
    const { _id } = req.body;

    const index = products.findIndex(item => item._id === _id);

    if(index < 0) {
        res.status( StatusCodes.NOT_FOUND ).json({ error: "ITEM_NOT_EXIST" });
    }
    products.splice(index,1, req.body);
    res.status( StatusCodes.OK ).json({ data: req.body, status: "Success Proccess 📝" });
}

export function removeProduct(req: Request, res: Response ) {

    const { _id } = req.body;
    const index = products.findIndex(item => item._id == _id);

    if(index < 0) {

        res.status( StatusCodes.NOT_FOUND ).json({ error: "PRODUCT_NOT_FOUND" });
        return;
    }

    products.splice(index,1);
    res.status( StatusCodes.OK ).json({ Len_Now: products.length ,status: "PRODUCT_DELETED ❌" });
}

export function getSingleProduct(req: Request, res: Response ) {


}