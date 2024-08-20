import express from 'express';
import passport from 'passport';
import { ensureAuthenticated, forwardAuthenticated, addUserToLocals } from '../middleware/authMiddleware.js';
import { loginWithPassport, registerUser, githubAuthCallback, forgotPassword, resetPassword, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.use(addUserToLocals);

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Usar loginWithPassport para manejar la autenticación y devolver el JWT
router.post('/login', loginWithPassport);

router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
router.post('/register', registerUser);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), githubAuthCallback);

router.post('/forgot', forgotPassword);
router.put('/reset/:token', resetPassword);

// Usar el controlador de logout modificado
router.get('/logout', logoutUser);

export default router;





























































