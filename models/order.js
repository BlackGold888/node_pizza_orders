import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{}],
    totalPrice: {
        type: String,
        required: true,
    }
});

const Order = mongoose.model('Order', orderSchema);

export {Order}