import express from "express";
import {Order} from "../models/order.js";


const router = express.Router();

router.post(
    '/save',
    async (req, res) => {
        const {name, ingredients, totalPrice} = req.body;
        if (totalPrice <= 0){
            res.status(500).send('totalPrice equal zero, please choose any ingredients');
        }
        try{
            const order = await Order.create({name, ingredients, totalPrice: (totalPrice + totalPrice / 2).toFixed(2)});
            res.send({status: true, order});
        }catch (e) {
            console.log(e);
        }
    });

router.get('/save', async (req, res) => {
    res.status(200).send();
});

export {router};

