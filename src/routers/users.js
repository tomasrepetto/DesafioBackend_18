import { Router } from 'express';
import { UserDTO } from '../dto/userDTO.js';
import { auth } from '../middleware/authMiddleware.js'; // Corregido: Ruta correcta del middleware `auth`
import { uploadUserDocuments } from '../controllers/userController.js'; // Corregido: Ruta correcta del controlador
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

// Ruta para subir documentos del usuario
router.post('/:uid/documents', ensureAuthenticated, uploadUserDocuments);

router.get('/current', auth, (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
});

export default router;
