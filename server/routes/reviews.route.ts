
import express from "express";
import { 
    addReview,
    getAllReviews,
    getSingleReview,
    destroyReview,
    updateReview
} from "../controllers/reviews.controller";


const reviewsRouter = express.Router();

reviewsRouter.route("/")
             .post( addReview )
             .get( getAllReviews );

reviewsRouter.route("/:product_id")
             .get( getSingleReview )
             .delete( destroyReview )
             .put( updateReview );


export default reviewsRouter;