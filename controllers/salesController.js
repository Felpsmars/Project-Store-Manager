const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
} = require('../services/salesService');

// tive ajuda do meu colega gabriel sampaio 14b

const createProductSale = async (req, res) => {
  const sale = req.body;

  const createdSale = await createSale(sale);

  if (createdSale.message) {
  return res.status(createdSale.code).json({ message: createdSale.message });
  }

  res.status(201).json(createdSale);
};

const getAllSalesController = async (_req, res) => {
  const allSales = await getAllSales();

  return res.status(200).json(allSales);
};

const getSaleByIdController = async (req, res) => {
  const { id } = req.params;

  const saleById = await getSaleById(id);

  if (saleById.message) return res.status(saleById.code).json({ message: saleById.message });

  return res.status(200).json(saleById);
};

const updateSalesController = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await updateSale(id, sale);

  if (updatedSale.message) {
    return res.status(updatedSale.code).json({ message: updatedSale.message });
  }

  return res.status(200).json(updatedSale);
};

module.exports = {
  createProductSale,
  getSaleByIdController,
  updateSalesController,
  getAllSalesController,
}; 