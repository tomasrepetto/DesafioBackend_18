import express from 'express';
import { changeUserToPremium, uploadUserDocuments } from '../controllers/userController.js';
import { ensureAuthenticated } from '../config/passport.js';

const router = express.Router();

// Ruta para cambiar a usuario premium
router.put('/premium/:uid', ensureAuthenticated, changeUserToPremium);

// Ruta para subir documentos del usuario
router.post('/:uid/documents', ensureAuthenticated, uploadUserDocuments);

export default router;

