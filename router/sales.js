const express = require('express');

const sales = require('../controllers/salesController');

/* const { 
    isvalidateProducts,
    isvalidateQuantity,
    findsaleById,
} = require('../middlewares/sales'); */

const routes = express.Router();

routes.post('/',
    sales.createProductSale);

routes.get('/',
    sales.getAllSalesController);

routes.get('/:id',
    sales.getSaleByIdController);

routes.put('/:id',
    sales.updateSalesController);
    
module.exports = routes;