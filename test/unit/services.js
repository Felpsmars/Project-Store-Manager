const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productService');
const salesService = require('../../services/salesService');

const allProducts = [
  {
    "id": 1,
    "name": "Paulaner Salvator",
    "quantity": 15
  },
  {
    "id": 2,
    "name": "Delirium Tremens",
    "quantity": 30
  }
];

const createBody = {
  name: "Heilige IPA",
  quantity: 10
};

const updateBody = {
  id: 2,
  name: "Delirium Tremens",
  quantity: 2021
}



describe('Testa a camada services - products', () => {
  describe('Adiciona um produto com sucesso', () => {
    before(async () => {
      const product = { id: 1, name: "Heilige IPA", quantity: 10 };
      sinon.stub(productsModel, 'create').resolves(product);
    });

    after(async () => {
      productsModel.create.restore();
    });

    it('retorna um objeto com as propiedades "id", "name" e "quantity"', async () => {
      const newProduct = await productsService.createProductService(createBody);

      expect(newProduct).to.have.a.property('id');
      expect(newProduct).to.have.a.property('name');
      expect(newProduct).to.have.a.property('quantity');
    });

    it('retorna o objeto esperado', async () => {
      const expectedProduct = {
        "id": 1,
        "name": "Heilige IPA",
        "quantity": 10,
      };
      const newProduct = await productsService.createProductService(createBody);
      expect(newProduct).to.be.deep.equal(expectedProduct);
    });
  });

  describe('Retorna todos os produtos', async () => {
    describe('Quando não existir produtos cadastrados', async () => {
      before(async () => {
        const mock = []
        sinon.stub(productsModel, 'getAll').resolves(mock);
      });

      after(async () => {
        productsModel.getAll.restore();
      });

      it('retorna um array vazio', async () => {
        const response = await productsService.listProductService();
        expect(response).to.be.empty;
      });
    });

    describe('Quando existir produtos cadastrados', async () => {
      before(async () => {
        const mockedProducts = allProducts;
        sinon.stub(productsModel, 'getAll').resolves(mockedProducts);
      });

      after(async () => {
        productsModel.getAll.restore();
      });

      it('retorna os produtos esperados', async () => {
        const products = await productsService.listProductService();

        expect(products).to.be.deep.equal(allProducts);
      });
    });
  });

  describe('Retorno de um produto por id', async () => {
    before(async () => {
      const mockedProduct = allProducts[1];
      sinon.stub(productsModel, 'getById').resolves(mockedProduct);
    });

    after(async () => {
      productsModel.getById.restore();
    });

    it('retorna o produto esperado', async () => {
      const product = await productsService.getByIdService(2);
      expect(product).to.be.deep.equal(allProducts[1]);
    });
  });

  describe('Atualiza um produto', async () => {
    before(async () => {
      const mockedProducts = updateBody;
      sinon.stub(productsModel, 'update').resolves(mockedProducts);
    });

    after(async () => {
      productsModel.update.restore();
    });

    it('atualiza as informações do produto', async () => {
      const updateProduct = await productsService.updateProductService(updateBody);
      expect(updateProduct).to.be.deep.equal(updateBody);
    });
  });
});




describe('Testa a camada services - sales', () => {
  describe('Adiciona um produto com sucesso', () => {
    before(async () => {
      const product = [
        {
          "product_id": 1,
          "quantity": 2
        },
        {
          "product_id": 2,
          "quantity": 5
        }
      ];
      sinon.stub(salesService, 'create').resolves(product);
    });

    after(async () => {
      salesService.create.restore();
    });

    it('retorna o objeto esperado', async () => {
      const expectedProduct = [ { product_id: 1, quantity: 2 }, { product_id: 2, quantity: 5 } ];
      const newProduct = await salesService.create(createBody);
      expect(newProduct).to.be.deep.equal(expectedProduct);
    });
  });

  describe('Retorna todos os produtos', async () => {
    describe('Quando existir produtos cadastrados', async () => {
      before(async () => {
        const mockedProducts = [
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:29.000Z",
            "product_id": 1,
            "quantity": 2
          },
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:54.000Z",
            "product_id": 2,
            "quantity": 2
          }
        ];
        sinon.stub(salesService, 'getAll').resolves(mockedProducts);
      });

      after(async () => {
        salesService.getAll.restore();
      });

      it('retorna os produtos esperados', async () => {
        const products = await salesService.getAll();
        const expectedProducts = [
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:29.000Z",
            "product_id": 1,
            "quantity": 2
          },
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:54.000Z",
            "product_id": 2,
            "quantity": 2
          }
        ];
        expect(products).to.be.deep.equal(expectedProducts);
      });
    });
  });

  describe('Retorno de um produto por id', async () => {
    before(async () => {
      const mockedProducts =
        {
          saleId: 1,
          date: '2021-09-09T04:54:54.000Z',
          product_id: 1,
          quantity: 2
        };
      sinon.stub(salesService, 'getById').resolves(mockedProducts);
    });

    after(async () => {
      salesService.getById.restore();
    });

    it('retorna o produto esperado', async () => {
      const product = await salesService.getById(2);
      const expectedProduct = {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 1,
        "quantity": 2
      };
      expect(product).to.be.deep.equal(expectedProduct);
    });
  });
}); 