const sales = require('express').Router();

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
} = require('../services/salesService');

sales.post('/', 
    async (req, res) => {
  const sale = req.body;

  const createdSale = await createSale(sale);

  if (createdSale.message) {
  return res.status(createdSale.code).json({ message: createdSale.message });
  }

  res.status(201).json(createdSale);
});

sales.get('/',
 async (_req, res) => {
  const allSales = await getAllSales();

  res.status(200).json(allSales);
});

sales.get('/:id',
    async (req, res) => {
  const { id } = req.params;

  const saleById = await getSaleById(id);

  if (saleById.message) return res.status(saleById.code).json({ message: saleById.message });

  res.status(200).json(saleById);
});

sales.put(
    '/:id',
    async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await updateSale(id, sale);

  if (updatedSale.message) {
    return res.status(updatedSale.code).json({ message: updatedSale.message });
  }

  res.status(200).json(updatedSale);
},
);

module.exports = sales; 