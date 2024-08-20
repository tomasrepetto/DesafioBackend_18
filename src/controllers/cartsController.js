import mongoose from 'mongoose';
import { cartModel } from '../models/cartsModel.js';
import { productModel } from '../models/productsModel.js';

export const createCart = async (req, res) => {
    try {
        const cart = new cartModel({ products: [] });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const addProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            console.error('Cart not found');
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = await productModel.findById(pid);
        if (!product) {
            console.error('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product found:', product);

        const productId = product._id;
        console.log('productId:', productId); 

        if (!productId) {
            console.error('productId es undefined');
            return res.status(400).json({ message: 'productId es undefined' });
        }

        if (!(productId instanceof mongoose.Types.ObjectId)) {
            console.error('productId no es un ObjectId');
            return res.status(400).json({ message: 'productId no es un ObjectId' });
        }

        let productInCart = cart.products.find(item => item.productId && item.productId.equals(productId));
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            productInCart = { productId: productId, quantity: quantity };
            console.log('Añadiendo productInCart:', productInCart);
            cart.products.push(productInCart);
        }

        console.log('Cart antes de guardar:', JSON.stringify(cart, null, 2));

        await cart.save();
        console.log('Cart después de guardar:', JSON.stringify(cart, null, 2));
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getCartsById = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartModel.findById(cid).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error getting cart by ID:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartModel.findByIdAndDelete(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteProductsInCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => !item.productId.equals(pid));

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = products;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateProductsInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productInCart = cart.products.find(item => item.productId.equals(pid));
        if (productInCart) {
            productInCart.quantity = quantity;
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating product in cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
