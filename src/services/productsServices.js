import productsDao from '../dao/productsDao.js';

const getProductsServices = async () => {
    return await productsDao.getProductsDao();
};

const addProductService = async (productData) => {
    return await productsDao.addProductDao(productData);
};

export default {
    getProductsServices,
    addProductService,
};