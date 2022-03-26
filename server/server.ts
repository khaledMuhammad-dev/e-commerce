import express from "express";
import cors from "cors";
import wishListRouter from "./routes/wishlist.route";
import cartRouter from "./routes/cart.route";
import productRouter from './routes/product.route';


const app = express();
const log = console.log;

app.use(cors());
app.use(express.json());



/** Product Routes */
// product route set here
app.use("/api/v1/product", productRouter);

/** Cart Routes */
app.use("/api/v1/cart", cartRouter);

/** Wish List Routes */
app.use("/api/v1/wishlist", wishListRouter);


const port = 8000;

app.listen(port, () => {
    console.log(`listening on prot ${ port }`);
});