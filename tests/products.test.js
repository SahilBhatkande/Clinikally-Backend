// tests/products.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Product Search API', () => {
  describe('GET /products/search', () => {
    it('should return products for valid query', async () => {
      const res = await chai.request(app)
        .get('/products/search?q=phone&limit=2&skip=0');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('results').that.is.an('array');
      expect(res.body).to.have.property('total');
    });

    it('should return 400 for short query', async () => {
      const res = await chai.request(app)
        .get('/products/search?q=p');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });
});