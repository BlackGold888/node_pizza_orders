import express from 'express';
import { body, check, validationResult } from 'express-validator';
import * as api from '../api/index.js';

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
    body('ingredientName').custom((value, {req}) => {
        return Array.isArray(req.body.ingredientName);
    }),
    requestValidate,
    api.product.saveProduct
);

router.get('/all', api.product.getAllProducts);
router.get(
    '/show',
    check('id').isString(),
    requestValidate,
    api.product.showProduct
);

export { router };

