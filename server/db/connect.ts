
/**
 * MongoDB
 * username: ecommerce
 * password: a3jOrOJETOQ8Tx6j
 * 
 */
import mongoose from "mongoose";

const connectDB = ( url: string ) => {
    return mongoose.connect( url );
}


export default connectDB;
export const DB_URL = `mongodb+srv://e-commerce:a3jOrOJETOQ8Tx6j@free.czv5l.mongodb.net/e-commerce?retryWrites=true&w=majority`;
