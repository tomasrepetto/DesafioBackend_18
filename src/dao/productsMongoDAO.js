import { productModel } from '../models/productsModel.js';

export class ProductsMongoDAO {
    async getProducts() {
        return await productModel.find();
    }

    async getProductById(id) {
        return await productModel.findById(id);
    }

    async addProduct(product) {
        return await productModel.create(product);
    }

    async updateProduct(id, product) {
        return await productModel.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id) {
        return await productModel.findByIdAndDelete(id);
    }
}