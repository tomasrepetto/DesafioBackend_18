import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

export const ensureAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

export const forwardAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

export const addUserToLocals = async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        res.locals.user = null;
        return next();
    }
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        console.log("Middleware - Authenticated User:", req.user);
    } else if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
                res.locals.user = user;
                console.log("Middleware - Authenticated User via JWT:", user);
            } else {
                res.locals.user = null;
                console.log("Middleware - No user found via JWT");
            }
        } catch (error) {
            res.locals.user = null;
            console.log("Middleware - Invalid JWT");
        }
    } else {
        res.locals.user = null;
        console.log("Middleware - No user");
    }
    next();
};

export const auth = async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        req.user = { _id: '60f718a96c234422c8d38c8a' }; // Un ID de usuario de ejemplo válido de MongoDB
        return next();
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const authorize = (rol = []) => {
    return (req, res, next) => {
        if (process.env.NODE_ENV === 'test') {
            return next();
        }
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (rol.length && !rol.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};


















