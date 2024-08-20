import { Router } from 'express';
import { cartIdView, chatView, homeView, login, loginGet, logout, productsView, realTimeProductsView, registerGet, registerPost } from '../dao/DB/viewsDB.js';
import { admin, auth } from '../config/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', homeView);
router.get('/realtimeproducts', auth, realTimeProductsView);
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartIdView);
router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logout);
router.post('/register', passport.authenticate('register',{failureRedirect:'/register'}), registerPost);
router.post('/login', passport.authenticate('login',{failureRedirect:'/login'}), login);
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req, res) => {});
router.get('/login-github-callback', passport.authenticate('github', {failureRedirect: '/register'}), login);


export default router;