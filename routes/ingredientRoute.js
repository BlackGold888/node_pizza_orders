import express from "express";
import {body, validationResult} from "express-validator";
import {Ingredient} from "../models/ingredient.js";

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
    body('price').not().isEmpty().withMessage('Price field required'),
    requestValidate,
    async (req, res) => {
        const {name, price} = req.body;
        const ingredient = await Ingredient.create({name, price});
        res.send(ingredient);
    });

router.get('/all', async (req, res) => {
    const ingredient = await Ingredient.find({});
    console.log('================')

    res.status(200).send(ingredient);
});

export {router};

