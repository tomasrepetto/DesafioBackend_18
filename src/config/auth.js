import { request, response } from 'express';

export const auth = (req = request, res = response, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

export const admin = (req = request, res = response, next) => {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden' });
};
