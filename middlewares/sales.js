const isvalidateProducts = (sales) => {
  if (sales.every((sale) => sale.product_id === undefined)) {
    return { code: 400, message: '"product_id" is required' };
  }

  return {};
};

const isvalidateQuantity = (sales) => {
  if (sales.every((sale) => typeof sale.quantity === 'string' || sale.quantity <= 0)) {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }

  if (sales.every((sale) => sale.quantity === undefined)) {
    return { code: 400, message: '"quantity" is required' };
  }

  return {};
};

const findsaleById = (id, sales) => {
  if (sales.some((sale) => sale.saleId === Number(id))) return {};

  return { code: 404, message: 'Sale not found' };
};

module.exports = {
  isvalidateProducts,
  isvalidateQuantity,
  findsaleById,
}; 