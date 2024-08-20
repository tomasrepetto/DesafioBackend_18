export class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts() {
        return await this.dao.getProducts();
    }

    async getProductById(id) {
        return await this.dao.getProductById(id);
    }

    async addProduct(product) {
        return await this.dao.addProduct(product);
    }

    async updateProduct(id, product) {
        return await this.dao.updateProduct(id, product);
    }

    async deleteProduct(id) {
        return await this.dao.deleteProduct(id);
    }
}