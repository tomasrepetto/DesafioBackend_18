import productsServices from '../services/productsServices.js';
import { CustomError } from '../middleware/errorHandler.js';
import { productModel as Product } from '../models/productsModel.js';
import User from '../models/usersModel.js'; // Corrección aquí

// Obtener todos los productos
export const getProductsController = async (req, res, next) => {
    try {
        const products = await productsServices.getProductsServices();
        res.status(200).json(products);
    } catch (error) {
        next(new CustomError('ValidationError', 'Error al obtener productos'));
    }
};

// Añadir un nuevo producto
export const addProductController = async (req, res, next) => {
    const { title, price, ...rest } = req.body;
    if (!title || !price) {
        return next(new CustomError('MissingFieldsError', 'Todos los campos son requeridos'));
    }

    if (req.user.rol !== 'premium') {
        return res.status(403).json({ message: 'No tienes permisos para añadir productos' });
    }

    try {
        const product = await productsServices.addProductService({ title, price, ...rest });
        res.status(201).json(product);
    } catch (error) {
        next(new CustomError('ValidationError', error.message));
    }
};

// Obtener producto por ID
export const getProductsByIdController = async (req, res, next) => {
    const { pid } = req.params;
    try {
        const product = await productsServices.getProductsByIdService(pid);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(new CustomError('ValidationError', 'Error al obtener producto por ID'));
    }
};

// Eliminar producto por ID
export const deleteProductsByIdController = async (req, res, next) => {
    const { pid } = req.params;
    try {
        const product = await productsServices.deleteProductsByIdService(pid);
        if (product) {
            return res.json({ message: 'Producto eliminado', product });
        }
        res.status(404).json({ message: `No se pudo eliminar el producto con id ${pid}` });
    } catch (error) {
        next(new CustomError('ValidationError', 'Error al eliminar producto'));
    }
};

// Modificar producto
export const modificarProductsController = async (req, res, next) => {
    const { pid } = req.params;
    const { _id, ...rest } = req.body;
    try {
        const product = await productsServices.modificarProductsService(pid, rest);
        if (product) {
            return res.json({ message: 'Producto actualizado', product });
        }
        res.status(404).json({ message: `No se pudo actualizar el producto con id ${pid}` });
    } catch (error) {
        next(new CustomError('ValidationError', 'Error al actualizar producto'));
    }
};

// Eliminar producto con restricciones de permisos
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        if (user.role !== 'admin' && product.owner !== user.email) {
            return res.status(403).json({ message: 'You do not have permission to delete this product' });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error', details: 'Error al eliminar producto' });
    }
};








