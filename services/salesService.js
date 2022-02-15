const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../models/salesModel');

const {
  isvalidateProducts,
  isvalidateQuantity,
  findsaleById,
} = require('../middlewares/sales');

// tive ajuda do meu colega gabriel sampaio 14b e rafael perches 14b para montar as funções neste arquivo

const createSale = async (sale) => {
  /* const isValidSales = sale.map(async (sales) => {
    const { quantity } = sales;

      const product = await productsService.getByIdService(sales.product_id);

    if (product && quantity > product.quantity) {
      throw new Error({ code: 422, message: 'Such amount is not permitted to sell' });
    }
    return sales;
  }); */
  
  const validProduct = isvalidateProducts(sale);
  const validQuantity = isvalidateQuantity(sale);

  if (validProduct.message) return validProduct;

  if (validQuantity.message) return validQuantity;

  const newSale = await create(sale);
  const response = {
    id: newSale.insertId,
    itemsSold: sale,
  };

  return response;
};

const getAllSales = async () => {
  const allSales = await getAll();
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  console.log(allSales);
  return allSales;
};

const getSaleById = async (id) => {
  const allSales = await getAll();
  const getSale = findsaleById(id, allSales);
  
  if (getSale.message) return getSale;

  const saleById = await getById(id);
  return saleById;
};

const updateSale = async (id, sale) => {
  const isValidProducts = isvalidateProducts(sale);
  const isValidQuantity = isvalidateQuantity(sale);

  if (isValidProducts.message) return isValidProducts;

  if (isValidQuantity.message) return isValidQuantity;

  await update(id, sale);

  return {
    saleId: Number(id),
    itemUpdated: sale,
  };
};

const removeSaleService = async (id) => {
  const deleted = await remove(id);
  return deleted;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  removeSaleService,
}; 