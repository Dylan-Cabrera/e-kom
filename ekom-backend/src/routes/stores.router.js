import { Router } from 'express';
import { getAllStores } from '../controllers/stores.controller.js';

const router = Router();

router.get('/', getAllStores);

export default router;