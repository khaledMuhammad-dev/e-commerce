import { Schema, Types, model } from "mongoose";


const reveiwsSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        required: [true, "User id is required"],
        unique: true
    },
    product_id: {
        type: Types.ObjectId,
        ref:"product",
        required: [true, "Product id is required"]
    },
    comment: {
        type: String,
        default: ""
    },
    rate: {
        type: Number,
        enum: [1 ,2, 3, 4, 5],
        required: [true, "Rateing the product is required"]
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


export default model( "reviews", reveiwsSchema );