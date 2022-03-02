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
    body('description').isLength({min: 5}).withMessage('Description length should be > 3'),
    body('ingredients').isArray(),
    requestValidate,
    async (req, res) => {

    });

router.get('/all', (req, res)=> {
    const products = Product.find({});
    res.status(200).send(products);
});

export {router};

