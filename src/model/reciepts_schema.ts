import { Schema, model } from "mongoose";

const recieptsSchema = new Schema({
    products: {
        type: Array<{
            name: String,
            price: Number,
            count: Number
        }>,
        required: true,
    },
    employee: {
        type: String,
        required: true,
    },
});

export = model("reciepts", recieptsSchema);
