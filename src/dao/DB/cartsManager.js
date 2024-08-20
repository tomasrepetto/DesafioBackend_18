import fs from 'fs';
import ProductManager from './productManager.js';

class CartsManager {
    constructor() {
        this.patch = "./src/data/carts.json";
        this.carts = this.readCarts();
        this.idCarts = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0; 
    }

    asignarIdCarts() {
        this.idCarts++; 
        return this.idCarts; 
    }  
    
    createCart() {
        const newCart = {
            id: this.asignarIdCarts(),
            products: []
        };

        this.carts.push(newCart);
        this.writeCarts();

        return newCart;
    }


    readCarts() {
        try {
            const data = fs.readFileSync(this.patch, 'utf-8');
            if (!data.trim()) {
                throw new Error('El archivo está vacío o no contiene datos JSON válidos');
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }

    writeCarts() {
        try {
            fs.writeFileSync(this.patch, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    getCartsById(id) {
        id = Number(id);
        let cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            return { error: "Carrito no encontrado" }; 
        } else {
            console.log(cart);
            return cart;
        }
    } 
    
    addProductInCart(cid, pid) {
        let respuesta = `El carrito con id ${cid} no existe!`;
        const indexCarrito = this.carts.findIndex(c => c.id === cid);
        if (indexCarrito !== -1) {
            const indexProductoInCart = this.carts[indexCarrito].products.findIndex(p => p.id === pid);
            const p = new ProductManager();
            const producto = p.getProductsById(pid);

        if (producto.status && indexProductoInCart === -1) {
            this.carts[indexCarrito].products.push({id: pid, 'quantity': 1});
            this.writeCarts();
            respuesta = 'Producto agregado al carrito';
        } else if (producto.status && indexProductoInCart !== -1) {
            ++this.carts[indexCarrito].products[indexProductoInCart].quantity;
            this.writeCarts();
            respuesta = 'Producto agregado al carrito';
        } else {
            respuesta = `El producto con id ${cid} no existe!`;
        }
    }
        return respuesta;
    }
}

export default CartsManager;

