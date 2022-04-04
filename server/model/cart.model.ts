import { Schema, model, Types } from "mongoose";
import { IProductSchema } from "./product.model";



/**
 * Interface
 */

export interface ICartItem { 
    product_id: IProductSchema, 
    count: number 
}

/** Schema */
const singleItemSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: [true, "Product id is required"]
    },
    count: Number
}, { _id: false });


const cartSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        unique: true
    },
    items: [singleItemSchema],
    count: {
        type: Number,
        default: 0,
        required: [true, "Invalid product count"]
    },
    total: {
        type: Number,
        default: 0,
        required: [true, "Please provide a valid total"]
    }
}, { timestamps: true });


cartSchema.pre("save", async function() {
    let total = 0;
    let count = 0;

    const products = await this.populate("items.product_id");
products.items.forEach(( item: ICartItem  ) => {
        total += item.product_id.price * item.count;
        count += item.count
    });

    this.total = total;
    this.count = count;
});

export default model("Cart", cartSchema);