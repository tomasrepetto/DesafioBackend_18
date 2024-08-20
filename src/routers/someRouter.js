import { Router } from 'express';
import { auth, authorize } from '../middleware/authMiddleware.js';
import { getSomeData } from '../controllers/someController.js';

const router = Router();

router.get('/someEndpoint', auth, authorize(['user']), getSomeData);

export default router;