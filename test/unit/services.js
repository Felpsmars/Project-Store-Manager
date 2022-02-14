const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productService');
const salesService = require('../../services/salesService');

 // https://github.com/tryber/sd-014-b-store-manager/pull/62
 
const allProducts = [
  {
    id: 1,
    name: "product_name",
    quantity: 20
  },
  {
    id: 2,
    name: "Cadeira Gamer",
    quantity: 15
  }
];

describe('Testa a camada services', () => {
  describe('Retorno de um produto por id', async () => {
    before(async () => {
      const mockedProduct = allProducts[1];
      sinon.stub(productsModel, 'getById').resolves(mockedProduct);
      sinon.stub(productsModel, 'getAll').resolves(allProducts);
    });

    after(async () => {
      productsModel.getById.restore();
      productsModel.getAll.restore();
    });

    it('retorna o produto esperado', async () => {
      const product = await productsService.getByIdService(2);
      expect(product).to.be.deep.equal(allProducts[1]);
    });
  });
}); 