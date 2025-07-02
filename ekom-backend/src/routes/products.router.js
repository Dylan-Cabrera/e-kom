import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  getProductPrices
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:id/prices', getProductPrices);

export default router;