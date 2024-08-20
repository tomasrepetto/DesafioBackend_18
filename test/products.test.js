import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app.js';
import chai from 'chai';

chai.use(chaiHttp);

describe('Products API', () => {
  it('debería obtener todos los productos', (done) => {
    chai.request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.above(0);
        done();
      });
  });

  it('debería agregar un nuevo producto', (done) => {
    let product = {
      name: "Nuevo Producto",
      price: 99.99,
      description: "Descripción del producto"
    };
    chai.request(app)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name').eql('Nuevo Producto');
        expect(res.body).to.have.property('price').eql(99.99);
        done();
      });
  });

  it('debería eliminar un producto dado su id', (done) => {
    let productId = 'id_del_producto'; // Reemplaza con un ID válido de producto
    chai.request(app)
      .delete(`/api/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Producto eliminado exitosamente');
        done();
      });
  });
});













