import { ticketModel } from '../models/ticketModel.js';
import { cartModel } from '../models/cartsModel.js';
import User from '../models/usersModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createTicket = async (req, res) => {
    const { amount, cartId } = req.body;
    const userId = req.user._id; 

    try {
        if (!amount || !cartId || !userId) {
            return res.status(400).json({ message: 'amount, cartId y userId son requeridos' });
        }

        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const newTicket = new ticketModel({
            purchaser: user.name, 
            amount,
            cartId,
            userId,
            code: uuidv4() 
        });

        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        res.status(500).json({ message: 'Error al crear el ticket', error: error.message });
    }
};