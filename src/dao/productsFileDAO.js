import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../data/products.json');

export class ProductsFileDAO {
    async getProducts() {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        products.push(product);
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
        return product;
    }

    async updateProduct(id, updatedProduct) {
        let products = await this.getProducts();
        products = products.map(product => product.id === id ? updatedProduct : product);
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
        return updatedProduct;
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(product => product.id !== id);
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2));
    }
}