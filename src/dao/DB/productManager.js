import fs from "fs";

class ProductManager {

    static #instance;

    constructor() {
        if(ProductManager.#instance)
            return ProductManager.#instance;

        this.patch = "./src/data/productos.json";
        this.products = [];

        ProductManager.#instance = this;
    }

    static idProducto = 0;

    asignarIdProducto() {
        return ProductManager.idProducto + 1;
    }

    addProduct({title, description, price, thumbnails=[], code, stock, category, status = true}) {
        let result = 'Ocurrió un error';
            
        if (!title || !description || !price || !code || !stock || !category) {
            result = 'Todos los parámetros son requeridos [title, description, price, code, stock, category]';
        } else {
            this.products = this.readProducts();
            
            const codeRepetido = this.products.some(p => p.code === code);
            if (codeRepetido) {
                result = `El código ${code} ya se encuentra registrado en otro producto`;
            } else {
                const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
                const newProductId = lastProductId + 1;
                const newProduct = {
                    id: newProductId,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    category,
                    status
                };
    
                this.products.push(newProduct);
                this.writeProducts();
    
                result = {
                    msg: 'El nuevo producto se agregó correctamente',
                    producto: newProduct
                };
            }
        }
        
        return result;
    }       

    readProducts() {
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

    writeProducts() {
        try {
            fs.writeFileSync(this.patch, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    getProducts(limit = 0) {
        const products = this.readProducts();
        limit = Number(limit);
        if (limit > 0) {
            return products.slice(0, limit);
        }
        return products;
    }

    getProductsById(id) {
        id = Number(id);
        let products = this.readProducts();
        let product = products.find(product => product.id === id);
        if (!product) {
            return { error: "Disco no encontrado" }; 
        } else {
            console.log(product);
            return product;
        }
    }

    deleteProductsById(id) {
        let products = this.readProducts();
        let filteredProducts = products.filter(product => product.id !== id);
        this.products = filteredProducts;
        this.writeProducts();
        return 'Producto eliminado';
    }

    modificarProducts({ id, objetModif }) {
        let result = `El producto con id ${id} no existe`;
        this.products = this.readProducts(); 
        
        const index = this.products.findIndex(p => p.id === id);
        
        if (index !== -1) {
            const { id: objId, ...rest } = objetModif;
            const propiedadesPermitidas = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status'];
            const propiedadesActualizadas = Object.keys(rest)
                .filter(propiedad => propiedadesPermitidas.includes(propiedad))
                .reduce((obj, key) => {
                    obj[key] = rest[key];
                    return obj;
                }, {});
            this.products[index] = { ...this.products[index], ...propiedadesActualizadas };
            this.writeProducts();
            result = {
                msg: 'Producto actualizado',
                producto: this.products[index]
            };
        }
        
        return result;
    }        
    
}

export default ProductManager;

