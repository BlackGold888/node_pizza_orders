import express from 'express';
import { createValidator } from 'express-joi-validation';
import * as api from '../api/index.js';
import { saveSchema, showSchema } from './schemas/productSchemas.js';

const router = express.Router();
const validator = createValidator({});

router.post('/save', validator.body(saveSchema), api.product.saveProduct);
router.get('/show', validator.query(showSchema), api.product.showProduct);
router.get('/all',  api.product.getAllProducts);

export { router };

