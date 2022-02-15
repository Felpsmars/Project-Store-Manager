const connection = require('./connection');

const create = async (sale) => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );
  console.log(newSale);
  console.log(newSale);
  const insertedSale = await sale.map(({ product_id: productId, quantity }) =>
  connection.execute(
    'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
    [newSale.insertId, productId, quantity],
    ));
    
    console.log(insertedSale);
    const { quantity, product_id: productId } = sale[0];
    console.log(quantity, productId);
  await connection
        .execute(`UPDATE StoreManager.products
        SET quantity = quantity - ? WHERE id = ?;`, [quantity, productId]);
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
    console.log(allSales);
    console.log(allSales);
    console.log(allSales);
    console.log(allSales);
    console.log(allSales);
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

const remove = async (id) => {
  const sale = await getById(id);
  const [execute] = await connection
  .execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
  if (execute.affectedRows === 0) throw new Error(); // tive ajuda do matheus pereira https://github.com/tryber/sd-014-b-store-manager/pull/62/commits/8e1ab949f2f368c21e665cb55173704bd82f5558
  const { quantity, product_id: productId } = sale[0];
  await connection.execute(`UPDATE StoreManager.products SET 
  quantity = quantity + ? WHERE id = ?;`, [quantity, productId]);

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
}; 