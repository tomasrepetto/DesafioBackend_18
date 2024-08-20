import { productModel as Product } from '../models/productsModel.js';

const getProductsDao = async () => {
    return await Product.find();
};

const addProductDao = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

export default {
    getProductsDao,
    addProductDao,
};