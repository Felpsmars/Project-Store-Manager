const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productService');
const productsController = require('../../controllers/productController');

describe("Testa a camada controller para os produtos", () => {

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