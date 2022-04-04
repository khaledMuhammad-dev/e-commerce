import { Router } from "express";
import { 
    addCartItem, 
    getAllCartItems, 
    updateCatItem, 
    destroyCartItem 
} from "../controllers/cart.controller";


const cartRouter = Router();

cartRouter.route("/")
    .post( addCartItem )
    .get( getAllCartItems )
    .put( updateCatItem )
    .delete( destroyCartItem );


export default cartRouter;