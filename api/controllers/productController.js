const product = require('express').Router();

const productService = require('../services/productService');

const productSchema = require('./schemas/productSchema');

product.post(
    '/',
    productSchema.isValidName,
    productSchema.isValidQuantity,
    async (req, res) => {
        try {
        const { name, quantity } = req.body;

        const newProduct = await productService.createProductService(name, quantity);

        res.status(201).json(newProduct);
        } catch (err) {
            return res.status(409).json({ message: 'Product already exists' });
        }
    },
);

module.exports = product;
