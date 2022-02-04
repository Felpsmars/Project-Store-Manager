const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/productsModel');
const saleModel = require('../../models/salesModel');

const productService = require('../../services/productService');
const saleService = require('../../services/salesService');

describe('Testa o arquivo productService', () => {

  describe('função getAll', () => {

    before(async () => {
      const response =   [
        {
          id: 1,
          name: "produto A",
          quantity: 10
        },
        {
          id: 2,
          name: "produto B",
          quantity: 20
        }
      ];
      sinon.stub(productModel, 'getAll').resolves(response);
    })

    after(async () => {
      productModel.getAll.restore();
    })

    it('deve retornar um array', async () => {
      const response = await productService.listProductService();
      expect(response).to.be.an('array');
    })

    it('o array deve conter apenas objetos', async () => {
      const response = await productService.listProductService();
      response.forEach((el) => {
        expect(el).to.be.an('object');
      })
    })

    it('os objetos devem ter as propriedades esperadas', async () => {
      const response = await productService.listProductService();
      response.forEach((el) => {
        expect(el).to.have.all.keys(['id', 'name', 'quantity']);
      })
    })

    it('os objetos devem ter as propriedades com os tipos esperados', async () => {
      const response = await productService.listProductService();
      response.forEach((el) => {
        expect(el.id).to.be.an('number');
        expect(el.name).to.be.an('string');
        expect(el.quantity).to.be.an('number');
      })
    })
  });

  describe('função getById', () => {

    before(async () => {
      const response = {
          id: 1,
          name: "produto A",
          quantity: 10
        };
      sinon.stub(productModel, 'getById').resolves(response);
    })

    after(async () => {
      productModel.getById.restore();
    })

}) })