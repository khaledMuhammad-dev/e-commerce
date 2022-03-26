import data from '../mock/db';
import { Request, Response } from 'express';

const wishList:Array<{ _id: number}> = [];


export function addToWishList( req:Request, res:Response ) {
    const { _id } = req.body;
    const isProductExist = wishList.findIndex(item => item._id === _id);

    if ( isProductExist > -1 ) {
        res.status(400).json({ error: "the item already exists" });
        return;
    }

    wishList.push({ _id });
    res.status(200).json({ data: req.body, status: "Success operation 👏" });
}

export function getAllWishItems( req:Request, res:Response ) {
    res.status(200).json( wishList );
}

export function removeWishItem( req:Request, res:Response ) {
    const { _id } = req.body;
    const index = wishList.findIndex(item => item._id === _id);

    if(index < 0) {
        res.status(404).json({error: "ITEM_IS_NOT_FOUND"});
        return;
    }

    wishList.splice(index,1);

    res.status(200).json({ data: req.body, status: "Success operation 👏" });
}