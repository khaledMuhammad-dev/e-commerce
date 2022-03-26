import express from 'express';
import { addProduct, getAllProducts, removeProduct, updateProduct } from '../controllers/product.controller';

const productRouter = express.Router();



productRouter.route("/")
             .post( addProduct )
             .get( getAllProducts )
             .put( updateProduct )
             .delete( removeProduct );


export default productRouter;