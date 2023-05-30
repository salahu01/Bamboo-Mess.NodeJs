import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

export = model("employees", employeesSchema);
