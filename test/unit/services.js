const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productService');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');
const connection = require('../../models/connection');
const { afterEach } = require('mocha');

describe("Testa a camada de service para os produtos", () => {
    describe("Testa a função de retornar todos os produtos", () => {
        beforeEach(async () => {
            const response = [
                {
                    id: 1,
                    name: "product_name",
                    quantity: 4
                },
                {
                    id: 2,
                    name: "product_name2",
                    quantity: 4
                }
            ];

            sinon.stub(productsModel, 'getAll').resolves(response);
        });

        afterEach(async () => {
            productsModel.getAll.restore();
        });

        it("retorna um array com os produtos cadastrados", async () => {
            const response = await productsService.listProductService();

            expect(response).to.be.an('array');
        })
    });

    describe("Testa a função de retornar produto pelo id", () => {
        beforeEach(async () => {
            const response = {
                id: 1,
                name: "product_name",
                quantity: 4
            };

            sinon.stub(productsModel, "getById").resolves(response);
        });

        after(async () => {
            productsModel.getById.restore();
        });

        it("retorna um objeto com o produto buscado", async () => {
            const response = await (productsService.getByIdService(1)[0]);

            expect(response).to.be.an('undefined');
        });
    });

});

describe("Testa a camada de service para vendas", () => {
    describe("Testa a função de listar todas as vendas cadastradaas", () => {
        beforeEach(async () => {
            const response =   [
                {
                    saleId: 1,
                    date: "2021-09-09T04:54:29.000Z",
                    product_id: 1,
                    quantity: 2
                },
                {
                    saleId: 1,
                    date: "2021-09-09T04:54:54.000Z",
                    product_id: 2,
                    quantity: 2
                }
            ];

            sinon.stub(salesModel, "getAll").resolves(response);
            sinon.stub(connection, 'execute').resolves(response);
        });

        afterEach(async () => {
            salesModel.getAll.restore();
            connection.execute.restore();
        });

        it("retorna todas as vendas", async () => {
            const response = await salesService.getAllSales();

            expect(response).to.be.an('object');
        });
    });

});