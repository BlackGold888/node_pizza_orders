import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{}]
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export {Product}