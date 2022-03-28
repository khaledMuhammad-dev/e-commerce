import express from 'express';
import { 
    addProduct, 
    getAllProducts, 
    getSingleProduct, 
    destroyProduct, 
    updateProduct, 
    uploadImage 
} from '../controllers/product.controller';

const productRouter = express.Router();

/** All Products */
productRouter.route("/")
             .post( addProduct )
             .get( getAllProducts );

/** Single Products */
productRouter.route("/:_id")
            .get( getSingleProduct )
            .patch( updateProduct )
            .delete( destroyProduct );

/** upload */
productRouter.route("/uploadImage").post( uploadImage );

export default productRouter;