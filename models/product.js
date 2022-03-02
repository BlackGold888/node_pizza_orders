import mongoose from "mongoose";
import {Ingredient} from "./ingredient.js";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [{}]
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export {Product}