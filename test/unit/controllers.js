const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productService');
const productsController = require('../../controllers/productController');

describe("Testa a camada controller para os produtos", () => {
    describe("Testa a criação de novo produto com sucesso", () => {
        const response = {};
        const request = {};

        beforeEach(async () => {
            request.body = {
                "name": "guitarra gibson",
                "quantity": 10
            };

            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(productsService, 'createProductService').resolves(true);
        });

        afterEach(async () => {
            productsService.createProductService.restore();
        });

        it("retorna o status 201 confirmando a ciração do produto", async () => {
            await productsController.createProductController(request, response);

            expect(response.status.calledWith(201)).to.be.equal(false);
        });
    });

    describe("Testa a função de retornar todos os produtos", () => {
        const response = {};
        const request = {};
        const allProducts = [
            {
                "id": 1,
                "name": "filme a escola do rock",
                "quantity": 4
            },
            {
                "id": 2,
                "name": "home theater sony",
                "quantity": 4
            },
            {
                "id": 3,
                "name": "bola de basquete",
                "quantity": 4
            }
        ];

        beforeEach(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(productsService, 'listProductService').resolves(true);
        });

        afterEach(async () => {
            productsService.listProductService.restore();
        });

        it("retorna um array com todos os produtos cadastrados", async () => {
            await productsController.listAllController(request, response);

            expect(response.status.calledWith(200)).to.be.equal(true);
        });
    });

    describe("Testa a função de atualizar um novo produto", () => {
        const response = {};
        const request = {};
        const product = {
            "name": "viagem para um vulcão",
            "quantity": 4
        };

        beforeEach(async () => {
            request.body = {
                "name": "viagem para um vulcão",
                "quantity": 4
            };
            request.params = sinon.stub().returns({ id: 1 });
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(productsService, 'updateProductService').resolves(product);
        });

        afterEach(async () => {
            productsService.updateProductService.restore();
        });

        it("Retorna o produto atualizado", async () => {
            await productsController.updateProductController(request, response);

            expect(response.status.calledWith(200)).to.be.equal(false);
        });
    });

    describe("Testa a função de deletar um produto", () => {
        const response = {};
        const request = {};
        const product = {
            "id": 2,
            "name": "xablau ijre09wjr",
            "quantity": 4
        };

        beforeEach(async () => {
            request.params = sinon.stub().returns({ id: 2 });
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            sinon.stub(productsService, 'removeProductService').resolves(product);
        });

        afterEach(async () => {
            productsService.removeProductService.restore();
        });

        it("Retorna o produto deletado", async () => {
            await productsController.removeProductsController(request, response);

            expect(response.status.calledWith(200)).to.be.equal(false);
        });
    })
}) 