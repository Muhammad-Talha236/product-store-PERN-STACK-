import express from 'express';
import { getallProducts, createProducts , getProduct, updateProduct, deleteProduct} from '../controllers/productControllers.js';
const router = express.Router();

router.get('/', getallProducts);
router.get('/:id', getProduct);
router.post('/', createProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;