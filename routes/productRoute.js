import express from "express";
import {body, validationResult} from "express-validator";
import {Product} from "../models/product.js";

const router = express.Router();

const requestValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

router.post(
    '/save',
    body('name').isLength({min: 3}).withMessage('Name length should be > 3'),
    body('ingredientName').custom((value, { req }) => {
        return Array.isArray(req.body.ingredientName);
    }),
    requestValidate,
    async (req, res) => {
        console.log(req.body)
        let ingredients = [];
        for (let i = 0; i < req.body.ingredientName.length; i++) {
            if (req.body.ingredientName[i].length === 0)
                continue;
            ingredients.push({
                name: req.body.ingredientName[i],
                price: req.body.ingredientPrice[i],
                isChecked: false
            });
        }
        try{
            const product = await Product.create({
                name: req.body.name,
                ingredients
            })
            console.log(product);
            res.status(200).send(product);
        }catch (e) {
            console.log(e)
        }
    });

router.get('/all', async(req, res) => {
    const products = await Product.find({});
    console.log(products)
    res.status(200).send(products);
});

router.get('/show', async(req, res) => {
    const product = await Product.findById(req.query.id).exec();
    res.status(200).send(product);
});

export {router};

