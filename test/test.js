const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../app');  // Asegúrate de que la exportación de app esté correcta

let cartId;
let productId;

// Prueba para iniciar un nuevo carrito
describe('Shopping Cart API', () => {
  it('should create a new cart', (done) => {
    request(app)
      .post('/api/carts')
      .send({})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        cartId = res.body.id;
        done();
      });
  });

  // Prueba para crear un nuevo producto
  it('should create a new product', (done) => {
    request(app)
      .post('/api/products')
      .send({ name: 'Test Product', price: 10.0, stock: 100 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        productId = res.body.id;
        done();
      });
  });

  // Prueba para agregar un producto al carrito
  it('should add a product to the cart', (done) => {
    request(app)
      .put(`/api/carts/${cartId}/product`)
      .send({ productId, quantity: 2 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('products');
        expect(res.body.products).to.be.an('array').that.is.not.empty;
        done();
      });
  });

  // Prueba para eliminar un producto del carrito
  it('should remove a product from the cart', (done) => {
    request(app)
      .delete(`/api/carts/${cartId}/product/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('products');
        expect(res.body.products).to.be.an('array').that.is.empty;
        done();
      });
  });

  // Prueba para crear una orden desde un carrito
  it('should create an order from the cart', (done) => {
    request(app)
      .post('/api/orders')
      .send({ cartId })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        done();
      });
  });
});
