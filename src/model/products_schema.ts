import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categary_name: {
        type: String,
        required: true,
    },
});

export = model("products", productsSchema);
