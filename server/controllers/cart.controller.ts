import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";

interface Cart {
    _id: number,
    count: number
}

const cart:Array<Cart> = [];

export function addToCart( req:Request, res:Response ) {
    const { count } = req.body;
    const id = typeof count === "string" ? count.trim() : count;

    if( !id ) {
        res
        .status( StatusCodes.BAD_REQUEST )
        .json({ error: "Please make sure of the required data" ,status: "BAD_REQUEST 💔" });
    }

    if( !Number(id) ) {
        
        res
        .status( StatusCodes.BAD_REQUEST )
        .json({ error: "Invalid Count" ,status: "BAD_REQUEST 💔" });
    }


    cart.push( req.body );
    res.status( StatusCodes.CREATED ).json({ data: req.body, status: "Success Operation 👏" });
}

export function getAll( req:Request, res:Response ) {
    
    res.status( StatusCodes.OK ).json({ data: cart, status: "Success Operation 👏" });
}

export function updateItem( req:Request, res:Response ) {
    const { _id, count } = req.body;
    const index = cart.findIndex(item => item._id === _id);

    if(index < 0) {
        res.status(404).json({ error: "ITEM_NOT_FOUND" });
    }

    cart.splice(index,1,{ _id, count });
    res.status( StatusCodes.OK ).json({ data: req.body, length: cart.length });
}

export function removeFromCart( req:Request, res:Response ) {
    const { _id } = req.body;
    const index = cart.findIndex(item => item._id === _id);

    if(index < 0) {
        res.status( StatusCodes.NOT_FOUND ).json({error: "404"});
        throw Error("this message from the server --> 404");
    }

    cart.splice(index, 1);
    res.status( StatusCodes.OK ).json(cart);
}


/**
 * CRUD
 * Validation
 * Errors
 * DB (MongoDB & Mongoos)
 */