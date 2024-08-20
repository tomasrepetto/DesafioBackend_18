import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app.js';
import chai from 'chai';

chai.use(chaiHttp);

describe('Sessions API', () => {
  it('debería iniciar sesión con credenciales válidas', (done) => {
    let userCredentials = {
      email: "user@example.com",
      password: "password123"
    };
    chai.request(app)
      .post('/api/sessions/login')
      .send(userCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('debería registrar un nuevo usuario', (done) => {
    let newUser = {
      email: "newuser@example.com",
      password: "password123"
    };
    chai.request(app)
      .post('/api/sessions/register')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email').eql('newuser@example.com');
        done();
      });
  });

  it('debería cerrar sesión correctamente', (done) => {
    chai.request(app)
      .post('/api/sessions/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Sesión cerrada');
        done();
      });
  });
});












