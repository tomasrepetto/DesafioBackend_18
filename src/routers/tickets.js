import { Router } from 'express';
import { createTicket } from '../controllers/ticketController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', auth, authorize(['user', 'admin']), createTicket);

export default router;