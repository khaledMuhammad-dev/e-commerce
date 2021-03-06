import express from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import cors from "cors";
import wishListRouter from "./routes/wishlist.route";
import cartRouter from "./routes/cart.route";
import productRouter from './routes/product.route';
import connectDB, { DB_URL } from "./db/connect";
import errorHandlerMiddleware from "./middleware/errorHandler";
import reviewsRouter from "./routes/reviews.route";

const app = express();
const log = console.log;

app.use(cors());
app.use(express.json());

app.use(fileUpload());

app.use( express.static("./public") );

/** Product Routes */
// product route set here
app.use("/api/v1/product", productRouter);

/** Cart Routes */
app.use("/api/v1/cart", cartRouter);

/** Wish List Routes */
app.use("/api/v1/wishlist", wishListRouter);

/** Reviews Routes */
app.use("/api/v1/reviews", reviewsRouter);


/** Handle Errors */
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const startConnection = async () => {

    try {
        await connectDB( DB_URL );

        app.listen(port, () => {
            console.log(`listening on prot ${ port }`);
        });

    } catch ( error ) {
        console.log( error );
    }
}


startConnection();
