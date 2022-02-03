const { connection } = require('./connection');

const create = async (sale) => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );

  const data = sale.map(({ product_id: productId, quantity }) =>
    connection.execute(
      'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
      [newSale.insertId, productId, quantity],
    ));

  await Promise.all(data);

  return newSale;
};

const getAll = async () =>
  connection.execute(`SELECT sales.id AS saleId, sales.date, products.product_id, products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products ON sale_id = sales.id`);

const findById = async (id) =>
  connection.execute(
    `SELECT sales.date, products.product_id, products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products ON sale_id = sales.id
      WHERE id= ?`,
    [id],
  );

const update = async (id, sale) =>
  connection.execute(
    'UPDATE StoreManager.sales_products SET product_id= ?, quantity= ? WHERE sale_id= ?',
    [sale[0].product_id, sale[0].quantity, id],
  );

const remove = (id) =>
  connection.execute(
    `DELETE FROM StoreManager.sales
            WHERE id= ?`,
    [id],
  );

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};