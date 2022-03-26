import { Router } from "express";
import { addToCart, removeFromCart, getAll, updateItem } from "../controllers/cart.controller";


const cartRouter = Router();

cartRouter.route("/")
    .post( addToCart )
    .get( getAll )
    .put( updateItem )
    .delete( removeFromCart );


export default cartRouter;