const connection = require('./connection');

const create = async (sale) => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );

  const insertedSale = sale.map(({ product_id: productId, quantity }) =>
    connection.execute(
      'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
      [newSale.insertId, productId, quantity],
    ));

  await Promise.all(insertedSale);

  return newSale;
};

const getAll = async () => {
  const [allSales] = await connection.execute(
    `SELECT sales.id AS saleId, sales.date, products.product_id, products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products ON sale_id = sales.id`,
  );

  console.log(allSales);

  return allSales;
};

const getById = async (id) => {
  const [saleByID] = await connection.execute(
    `SELECT sales.date, products.product_id, products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products ON sale_id = sales.id
      WHERE id= ?`,
    [id],
  );
  return saleByID;
};

const update = async (id, sale) => {
  const updatedSale = await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id= ?, quantity= ? WHERE sale_id= ?',
    [sale[0].product_id, sale[0].quantity, id],
  );
  return updatedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
}; 