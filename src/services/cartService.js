import { cartModel } from '../models/cartsModel.js';

export const getCartByIdService = async (cartId) => {
    try {
        const cart = await cartModel.findById(cartId).populate('products.productId');
        return cart;
    } catch (error) {
        console.error('Error al obtener el carrito por ID:', error);
        throw error;
    }
};