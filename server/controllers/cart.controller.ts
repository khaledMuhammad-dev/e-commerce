import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from '../errors';
import { ICartItem } from '../model/cart.model';
import Cart from '../model/cart.model';

const cart = {
    items: [],
    count: 0,
    total: 0
}

export async function addCartItem( req:Request, res:Response ) {
    const { user_id } = req.body;

    if(!user_id) {
        throw new BadRequestError("Please provide a valid User id")
    }

    await Cart.create({ ...cart, user_id }); // #user_id #items #count #total
    res.status( StatusCodes.CREATED ).json({ status: "SUCCESS" });
}

export async function getAllCartItems( req:Request, res:Response ) {
    const { user_id } = req.body; 

    if(!user_id) {
        throw new BadRequestError("Please provide a valid User id")
    }

    const doc = await Cart.findOne({ user_id }).populate({
        path: "items.product_id",
        select: "title price count description discount"
    });
    
    if(!doc) {
        throw new NotFoundError("The Cart is not Found");
    }

    res.status( StatusCodes.OK ).json({ data: doc, status: "SUCCESS" });
}

export async function updateCatItem( req:Request, res:Response ) {
    const { user_id, product_id, count } = req.body;
    
    if( !user_id.trim() || !product_id.trim() || !count || !typeof count ) {
        throw new BadRequestError("Received invalid data");
    }

    const doc = await Cart.findOne({ user_id });
    
    if(!doc) {
        throw new NotFoundError("The Cart is not Found");
    }

    let items = doc.items.filter(( item: ICartItem ) => item.product_id.valueOf() !== product_id);
    let item = { product_id, count };
    
    doc.items = [...items, item];
    await doc.save();
    res.status( StatusCodes.OK ).json({ status: "SUCCESS" });
}

export async function destroyCartItem( req:Request, res:Response ) {
    const { user_id, product_id } = req.body;

    if(!user_id.trim() || !product_id.trim()){
        throw new BadRequestError("Received Invalid data");
    }

    const doc = await Cart.findOne({ user_id });
    const index = doc.items.findIndex( (item: ICartItem)  => item.product_id.valueOf() === product_id)

    if(!doc) {
        throw new NotFoundError("The cart is Not Found");
    }
    if(index < 0){
        throw new NotFoundError("Product is Not Found");
    }

    doc.items = doc.items.filter( (item: ICartItem)  => item.product_id.valueOf() !== product_id)
    await doc.save();
    res.status( StatusCodes.OK ).json({ data: doc, status: "SUCCESS" });
}