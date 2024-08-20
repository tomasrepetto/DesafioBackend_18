import { request, response } from "express";
import { addProductService, deleteProductsByIdService, getProductsByIdService, getProductsService, modificarProductsService } from "../../dao/productsMongo.js";

export const getProducts = async (req = request, res = response, next) => {
    try {
        const result = await getProductsService({ ...req.query });
        res.json({ result });
    } catch (error) {
        next(error);
    }
}

export const getProductsById = async (req = request, res = response, next) => {
    try {
        const { pid } = req.params;
        const producto = await getProductsByIdService(pid);
        if (!producto)
            return res.status(404).json({ msg: `El producto con id ${pid} no existe` });
        res.json({ producto });
    } catch (error) {
        next(error);
    }
}

export const addProduct = async (req = request, res = response, next) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        if (!title || !description || !price || !code || !stock || !category)
            return res.status(400).json({ msg: 'Los campos [title, description, price, code, stock, category] son obligatorios' });
        const producto = await addProductService({ ...req.body });
        res.json({ producto });
    } catch (error) {
        next(error);
    }
}

export const deleteProductsById = async (req = request, res = response, next) => {
    try {
        const { pid } = req.params;
        const producto = await deleteProductsByIdService(pid);
        if (producto)
            return res.json({ msg: 'Producto eliminado', producto });
        res.status(404).json({ msg: `No se pudo eliminar el producto con id ${pid}` })
    } catch (error) {
        next(error);
    }
}

export const modificarProducts = async (req = request, res = response, next) => {
    try {
        const { pid } = req.params;
        const { _id, ...rest } = req.body;
        const producto = await modificarProductsService(pid, rest);
        if (producto)
            return res.json({ msg: 'Producto actualizado', producto });
        res.status(404).json({ msg: `No se pudo actualizar el producto con id ${pid}` })
    } catch (error) {
        next(error);
    }
}
