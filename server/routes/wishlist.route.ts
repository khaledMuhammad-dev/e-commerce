import express  from "express";
import {
    getAllWishItems, 
    addToWishList, 
    removeWishItem 
} from "../controllers/wishList.controller";

const wishListRouter = express.Router();

wishListRouter.route("/")
    .post( addToWishList )
    .get( getAllWishItems )
    .delete( removeWishItem );


export default wishListRouter;