import { cartModel } from "../models/cartsModel.js";

export const getCartsByIdService = async (id) => {
    return await cartModel.findById(id).populate('products.productId');
};

export const createCartService = async () => {
    try {
        return await cartModel.create({});
    } catch (error) {
        console.log('createCartService -> ', error);
        throw error;
    }
};

export const addProductInCartService = async (cid, pid) => {
    try {
        const carrito = await cartModel.findById(cid);
        if (!carrito) return null;
        const productoInCart = carrito.products.find(p => p.id.toString() === pid);
        if (productoInCart) {
            productoInCart.quantity++;
        } else {
            carrito.products.push({ id: pid, quantity: 1 });
        }

        await carrito.save();  
        return carrito;
    } catch (error) {
        console.log('addProductInCartService -> ', error);
        throw error;
    }
};

export const deleteProductsInCartService = async (cid, pid) => {
    try {
        return await cartModel.findByIdAndUpdate(cid, { $pull: { 'products': { id: pid } } }, { new: true });
    } catch (error) {
        console.log('deleteProductsInCartService -> ', error);
        throw error;
    }
};

export const updateProductsInCartService = async (cid, pid, quantity) => {
    try {
        return await cartModel.findOneAndUpdate(
            { _id: cid, 'products.id': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        );
    } catch (error) {
        console.log('deleteProductsInCartService -> ', error);
        throw error;
    }
};

export const deleteCartService = async (cid) => {
    try {
        return await cartModel.findByIdAndUpdate(cid, { $set: { 'products': [] } }, { new: true });
    } catch (error) {
        console.log('deleteProductsInCartService -> ', error);
        throw error;
    }
};

export const updateCartService = async (cid, products) => {
    try {
        const carrito = await cartModel.findById(cid);
        if (!carrito) {
            return null;
        }
        carrito.products = products;
        await carrito.save();
        return carrito;
    } catch (error) {
        console.error('Error al actualizar el carrito:', error.message);
        throw error;
    }
};