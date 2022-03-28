import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],

        },
        description: {
            type: String,
            required: [true, "Product description is required"]
        },
        price: {
            type: Number,
            required: [true, "product price is required"]
        },
        imgs: {
            type: Array,
            required: [true, "product imgs is required"],
            maxlength: [5, "Maximum product images are 5"]

        },
        available_pieces: {
            type: Number,
            required: [true, "Product pieces is required"],
            minlength: [1, "Minimum products images are 1"]
        },
        category: {
            type: String,
            enum: ["electronics", "Books", "Sports", "Children and babies", "Style and fashion", "Pets", " Beauty and Health"],
            required: [true, "Product category is required"]
        }, 
        rate: {
            type: Number,
            required: false
        },
        reviews_count: {
            type: Number,
            required: false
        },
        discount: {
            type: Number,
            default: 0,
            required: false
        }
    }
);


export default mongoose.model("product", productSchema);

// type: string, // Mobile, TV, etc..

/**
 **  Category **
 ** ---------------
 *  - Books
 *  - Sports
 *  - Electronics
 *  - Children and babies
 *  - Style and fashion
 *  - Pets
 *  - Beauty and Health
 */ 