const product = require('express').Router();

const { 
    createProductService,
    listProductService,
    getByIdService,
    updateProductService,
    removeProductService,
} = require('../services/productService');

const { 
    isValidName,
    isValidQuantity,
} = require('../middlewares/productSchema');

product.post(
    '/',
    isValidName,
    isValidQuantity,
    async (req, res) => {
        try {
        const { name, quantity } = req.body;

        const newProduct = await createProductService(name, quantity);

        res.status(201).json(newProduct);
        } catch (err) {
            return res.status(409).json({ message: 'Product already exists' });
        }
    },
);

product.get(
    '/',
    async (_req, res) => {
        const allProducts = await listProductService();
        return res.status(200).json(allProducts);
    },
);

product.get(
    '/:id',
    async (req, res) => {
        try {
        const { id } = req.params;
        const productById = await getByIdService(id);
        return res.status(200).json(productById);
        } catch (err) {
        return res.status(404).json({ message: 'Product not found' });
        }
    },
);

product.put(
    '/:id',
    isValidName,
    isValidQuantity,
    async (req, res) => {
        try {
        const { id } = req.params;
        const { name, quantity } = req.body;

        const dataUpdated = await updateProductService(id, name, quantity);
        return res.status(200).json(dataUpdated);    
    } catch (error) {
   return res.status(404).json({ message: 'Product not found' });
    }
    },
);

product.delete(
    '/:id',
    async (req, res) => {
        try {
            const { id } = req.params;
           const deleted = await removeProductService(id);
           res.status(200).json(deleted);
        } catch (error) {
            res.status(404).json({ message: 'Product not found' });
        }
    },
);

module.exports = product;
