const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../services/productService');
const productController = require('../../controllers/productController');

describe('Testa camada Controller - Products', () => {
  describe('Adiciona um produto com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        "name": "Heineken",
        "quantity": 14
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'create').resolves(true);

    });

    after(() => {
      productService.create.restore();
    });

    it('é chamado o status com código 201', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Retorna todos os produtos', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(true);

    });

    after(() => {
      productService.getAll.restore();
    });

    it('é chamado o status com código 200', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Retorna um produto com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 12
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(true);

    });

    after(() => {
      productService.getById.restore();
    });

    it('é chamado o status com código 200', async () => {
      await productController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Atualiza um produto com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 12
      };

      request.body = {
        "name": "Heineken",
        "quantity": 14
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'update').resolves(true);

    });

    after(() => {
      productService.update.restore();
    });

    it('é chamado o status com código 200', async () => {
      await productController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
}); 