import { createTicketService } from '../services/ticketService.js';
import { getCartByIdService } from '../services/cartService.js';

export const purchase = async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdService(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        if (!cart.products || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or products are not populated' });
        }

        const amount = cart.products.reduce((acc, item) => {
            if (item.productId && item.productId.price) {
                return acc + item.productId.price * item.quantity;
            }
            return acc;
        }, 0);

        const ticketData = {
            userId: req.user._id,
            cartId: cart._id,
            amount: amount,
            purchaser: req.user.email,
        };

        const ticket = await createTicketService(ticketData);
        res.status(201).json({ message: 'Purchase successful', ticket });
    } catch (error) {
        console.error('Error during purchase:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};