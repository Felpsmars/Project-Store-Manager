const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productService');
const productsController = require('../../controllers/productController');

describe("Testa a camada controller para os produtos", () => {
    describe("Testa a criação de novo produto com sucesso", () => {
        const res = {};
        const req = {};

        beforeEach(async () => {
            req.body = {
                name: "product_name",
                quantity: 10
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(productsService, 'createProductService').resolves(true);
        });

        afterEach(async () => {
            productsService.createProductService.restore();
        });

        it("retorna o status 201 confirmando a ciração do produto", async () => {
            await productsController.createProductController(req, res);

            expect(res.status.calledWith(201)).to.be.equal(false);
        });
    });

    describe("Testa a função de retornar todos os produtos", () => {
        const res = {};
        const req = {};
        const allProducts = [
            {
                id: 1,
                name: "product_name",
                quantity: 4
            },
            {
                id: 2,
                name: "product_name2",
                quantity: 4
            },
            {
                id: 3,
                name: "product_name3",
                quantity: 4
            }
        ];

        beforeEach(async () => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(productsService, 'listProductService').resolves(true);
        });

        afterEach(async () => {
            productsService.listProductService.restore();
        });

        it("retorna um array com todos os produtos cadastrados", async () => {
            await productsController.listAllController(req, res);

            expect(res.status.calledWith(200)).to.be.equal(true);
        });
    });

    describe("Testa a função de atualizar um novo produto", () => {
        const res = {};
        const req = {};
        const product = {
            name: "product_name",
            quantity: 4
        };

        beforeEach(async () => {
            req.body = {
                name: "product_name",
                quantity: 4
            };
            req.params = sinon.stub().returns({ id: 1 });
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(productsService, 'updateProductService').resolves(product);
        });

        afterEach(async () => {
            productsService.updateProductService.restore();
        });

        it("Retorna o produto atualizado", async () => {
            await productsController.updateProductController(req, res);

            expect(res.status.calledWith(200)).to.be.equal(false);
        });
    });

    describe("Testa a função de deletar um produto", () => {
        const res = {};
        const req = {};
        const product = {
            id: 2,
            name: "product_name",
            quantity: 4
        };

        beforeEach(async () => {
            req.params = sinon.stub().returns({ id: 2 });
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(productsService, 'removeProductService').resolves(product);
        });

        afterEach(async () => {
            productsService.removeProductService.restore();
        });

        it("Retorna o produto deletado", async () => {
            await productsController.removeProductsController(req, res);

            expect(res.status.calledWith(200)).to.be.equal(false);
        });
    })
}) 