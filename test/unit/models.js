const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

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



describe('Testa a camada model - products', () => {
  describe('Adiciona um produto com sucesso', () => {
    before(async () => {
      const execute = [{ insertId : 1 }]
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto com as propiedades "id", "name" e "quantity"', async () => {
      const newProduct = await productsModel.create(createBody);

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
      const newProduct = await productsModel.create(createBody);
      expect(newProduct).to.be.deep.equal(expectedProduct);
    });
  });

  describe('Retorna todos os produtos', async () => {
    describe('Quando não existir produtos cadastrados', async () => {
      before(async () => {
        const mock = [[], [{}], [{}] ]
        sinon.stub(connection, 'execute').resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array vazio', async () => {
        const rows = await productsModel.getAll();
        expect(rows).to.be.empty;
      });
    });

    describe('Quando existir produtos cadastrados', async () => {
      before(async () => {
        const mockedProducts = [ allProducts ]
        sinon.stub(connection, 'execute').resolves(mockedProducts);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array de objetos com as propiedades "id", "name" e "quantity"', async () => {
        const [product] = await productsModel.getAll();

        expect(product).to.be.a.property('id');
        expect(product).to.be.a.property('name');
        expect(product).to.be.a.property('quantity');
      });

      it('retorna os produtos esperados', async () => {
        const products = await productsModel.getAll();

        expect(products).to.be.deep.equal(allProducts);
      });
    });
  });

  describe('Retorno de um produto por id', async () => {
    before(async () => {
      const mockedProducts = [ allProducts ]
      sinon.stub(connection, 'execute').resolves(mockedProducts);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um produto com as propiedades "id", "name", "quantity"', async () => {
      const product = await productsModel.getById(2);

      expect(product).to.be.a.property('id');
      expect(product).to.be.a.property('name');
      expect(product).to.be.a.property('quantity');
    });

    it('retorna o produto esperado', async () => {
      const product = await productsModel.getById(2);
      expect(product).to.be.deep.equal(allProducts[0]);
    });
  });

  describe('Atualiza um produto', async () => {
    before(async () => {
      const mockedProducts = [allProducts];
      sinon.stub(connection, 'execute').resolves(mockedProducts);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('atualiza as informações do produto', async () => {
      const updateProduct = await productsModel.update(updateBody);
      expect(updateProduct).to.be.deep.equal(updateBody);
    });
  });

}); 