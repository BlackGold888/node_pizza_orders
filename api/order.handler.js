import { Order } from '../models/order.js';

/**
 * Save order
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const saveOrder = async (req, res) => {
    const {name, ingredients, totalPrice} = req.body;

    if (totalPrice <= 0) {
        res.status(500).send('totalPrice equal zero, please choose any ingredients');
    }

    try {
        const order = await Order.create({name, ingredients, totalPrice: (totalPrice + totalPrice / 2).toFixed(2)});
        res.send({status: true, order});
    } catch (e) {
        console.log(e);
    }
}

export { saveOrder }
