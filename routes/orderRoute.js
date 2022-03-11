import express from 'express';
import * as api from '../api/index.js';

const router = express.Router();

router.post('/save', api.order.saveOrder);

export { router };
