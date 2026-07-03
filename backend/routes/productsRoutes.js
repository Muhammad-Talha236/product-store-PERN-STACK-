import express from 'express';
import { getallProducts, createallProducts } from '../controlllers/productControllers.js';
const router = express.Router();

router.get('/', getallProducts);
router.post('/', createallProducts);

export default router;