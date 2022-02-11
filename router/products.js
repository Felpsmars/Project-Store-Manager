const express = require('express');

const products = require('../controllers/productController');

const { 
    isValidName,
    isValidQuantity,
} = require('../middlewares/product');

const routes = express.Router();

routes.post('/',
    isValidName,
    isValidQuantity,
    products.createProductController);

routes.get('/',
    products.listAllController);

routes.get('/:id',
    products.getByIdController);

routes.put('/:id',
    isValidName,
    isValidQuantity,
    products.updateProductController);

routes.delete('/:id',
    products.removeProductsController);
    
module.exports = routes;