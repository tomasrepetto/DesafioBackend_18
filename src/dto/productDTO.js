export class ProductDTO {
    constructor({ title, description, price, stock, category }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}