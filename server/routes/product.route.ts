import express from 'express';
import { 
    addProduct, 
    getAllProducts, 
    getSingleProduct, 
    removeProduct, 
    updateProduct, 
    uploadImage 
} from '../controllers/product.controller';

const productRouter = express.Router();



productRouter.route("/")
             .post( addProduct )
             .get( getAllProducts )
             .put( updateProduct )
             .delete( removeProduct );

productRouter.route("/uploadImage").post( uploadImage );
productRouter.route("/:_id").get( getSingleProduct );

export default productRouter;