import { ProductsMongoDAO } from './productsMongoDAO.js';
import { ProductsFileDAO } from './productsFileDAO.js';

export const DAOFactory = {
    getDAO(type) {
        switch (type) {
            case 'mongo':
                return new ProductsMongoDAO();
            case 'file':
                return new ProductsFileDAO();
            default:
                throw new Error('Unknown DAO type');
        }
    }
};