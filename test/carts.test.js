import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app.js';
import chai from 'chai';

chai.use(chaiHttp);

describe('Carts API', () => {
  it('debería agregar un producto al carrito', (done) => {
    let cartItem = {
      productId: "id_del_producto", // Reemplaza con un ID válido de producto
      quantity: 2
    };
    chai.request(app)
      .post('/api/carts')
      .send(cartItem)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('productId').eql(cartItem.productId);
        expect(res.body).to.have.property('quantity').eql(2);
        done();
      });
  });

  it('debería obtener el carrito del usuario', (done) => {
    chai.request(app)
      .get('/api/carts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('items').which.is.an('array');
        done();
      });
  });

  it('debería eliminar un producto del carrito', (done) => {
    let cartItemId = 'id_del_item_del_carrito'; // Reemplaza con un ID válido de item en el carrito
    chai.request(app)
      .delete(`/api/carts/${cartItemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Item eliminado del carrito');
        done();
      });
  });
});














