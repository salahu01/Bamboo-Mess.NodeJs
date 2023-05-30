import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    products: {
        type: Array,
        required: true,
    },
    categary_name: {
        type: String,
        required: true,
    },
});

export = model("categories", categorySchema);
