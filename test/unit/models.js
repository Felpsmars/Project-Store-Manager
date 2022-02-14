const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

describe("Testa a camada model para os produtos", () => {
    describe("Testa a função de inserir novos produtos", () => {
        afterEach(async () => {
            connection.execute.restore();
        });

        const product = {
            id: 1,
            name: "product_name",
            quantity: 10
        };

        it("Cria novo produto com sucesso", async () => {
            const execute = [{ "insertId": 1}, null]

            sinon.stub(connection, 'execute').resolves(execute);

            const create = await productsModel.create(product);

            expect(create).to.be.an('object');
            expect(product).to.be.a.property('id');
            expect(product).to.be.a.property('name');
            expect(product).to.be.a.property('quantity');
        });
    });


    describe("testa a função de obter todos os produtos", () => {
        beforeEach(async () => {
            const response = [
                [{
                    id: 1,
                    name: "product_name",
                    quantity: 1
                },
                {
                    id: 2,
                    name: "product_name",
                    quantity: 2
                }],
                []
            ];
            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it("retorna o array com o comprimento devido", async () => {
            const response = await productsModel.getAll();
            expect(response).to.be.an('array');
            expect(response.length).to.be.equal(2);
        });

        it("verifica as chaves retornadas da requisição", async () => {
            const response = await productsModel.getAll();
            const product2 = response[1];
            expect(product2).to.have.property("id");
            expect(product2).to.have.property("name");
            expect(product2).to.have.property("quantity");
        });
    });

    describe("Testa a função de obter produto por id", () => {
        beforeEach(async () => {
            const response = [{
                id: 1,
                name: "product_name",
                quantity: 10
            }];
            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it("Retorna um array com objeto do produto buscado", async () => {
            const response = await productsModel.getById(1);
            expect(response).to.be.an('object');
        });

        it("verifica chaves do objeto retornado", async () => {
            const response = await productsModel.getById(1);
            expect(response).to.have.property("id");
            expect(response).to.have.property("name");
            expect(response).to.have.property("quantity");
        });
    });

    describe("Testa a função de obter todos os produtos", () => {
        beforeEach(async () => {
            const response = [
                {
                    id: 1,
                    name: "product_name",
                    quantity: 1
                },
                {
                    id: 2,
                    name: "product_name2",
                    quantity: 2
                },
                {
                    id: 3,
                    name: "product_name3",
                    quantity: 3
                }
            ];
            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it ("Retorna um array de objetos", async () => {
            const response = await productsModel.getAll();

            expect(response).to.be.an('object');
        });

        it("verifica se os objetos tem as chaves necessarias", async () => {
            const response = await productsModel.getAll();

            expect(response).to.have.property('id');
            expect(response).to.have.property('name');
            expect(response).to.have.property('quantity');
        });
    });

    describe("Testa a função de atualizar um produto", () => {
        beforeEach( async () => {
            const response = [{ "insertId": 1 }, null];
            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach( async () => {
            connection.execute.restore();
        });

        const product = { id: 1, name: "product_name", quantity: 3 };

        it("retorna um objeto com os valores que foram atualizados", async () => {
            const response = await productsModel.update(product);
            expect(response).to.be.an('object');
        });
    });
});

describe('Testa a camada model para as vendas', () => {
    describe("Testa a função de inserir novas vendas", () => {
        afterEach(async () => {
            connection.execute.restore();
        });

        const sale = [{
            product_id: 1,
            product_id: 10
        }];

        it("Cria novo produto com sucesso", async () => {
            const execute = [{ "insertId": 1}, null]

            sinon.stub(connection, 'execute').resolves(execute);

            const create = await salesModel.create(sale);

            expect(create).to.be.a('object');
            expect(create).to.have.a.property('insertId');
            expect(create.insertId).to.be.a('number');
        });
    });

    describe("Testa a função de obter todas as vendas", () => {
        beforeEach(async () => {
            const response = [
                {
                    saleId: 5,
                    date: "2022-02-00T00:30:01.000Z",
                    product_id: 7,
                    product_id: 7
                },
                {
                    saleId: 6,
                    date: "2022-02-00T00:30:02.000Z",
                    product_id: 8,
                    product_id: 7
                },
                {
                    saleId: 7,
                    date: "2022-02-00T00:30:03.000Z",
                    product_id: 9,
                    product_id: 7
                }
            ];
            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach(async () => {
            connection.execute.restore();
        });

        it("retorna o array com o comprimento devido", async () => {
            const response = await salesModel.getAll();

            expect(response).to.be.an('object');
        });

        it("verifica as chaves retornadas da requisição", async () => {
            const response = await salesModel.getAll();
            expect(response).to.have.property("saleId");
            expect(response).to.have.property("date");
            expect(response).to.have.property("product_id");
        });
    });

    describe("Testa a função de obter venda por id", () => {
        beforeEach( async () => {
            const response = [[
                {
                    date: "2022-02-00T00:30:00.000Z",
                    product_id: 2,
                    quantity: 7
                }
            ], null];

            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach( async () => {
            connection.execute.restore();
        });

        it("testa o retorno de uma venda pelo id passado", async () => {
            const response = await salesModel.getById(2);
            expect(response).to.be.an('array');
            expect(response.length).to.be.equal(1);
            expect(response[0]).to.be.an('object');
            expect(response[0]).to.have.property('date');
            expect(response[0]).to.have.property('product_id');
            expect(response[0]).to.have.property('quantity');
        })        
    });

    describe("Testa a função de atualizar uma venda", () => {
        beforeEach( async () => {
            const response = [{
                saleId: 2,
                itemUpdated: [
                    {
                        product_id: 2,
                        quantity: 6
                    }
                ]
            }, null];

            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach( async () => {
            connection.execute.restore();
        });
    })
});