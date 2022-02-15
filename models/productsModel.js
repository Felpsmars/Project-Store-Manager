const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products');
  return rows;
};

const getByName = async (name) => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return rows[0];
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return rows;
};

const create = async (name, quantity) => {
  const [rows] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const product = await getById(id);

  console.log(product);
  console.log(product);
  console.log(product);
  console.log(product);
  if (product.length === 0) throw new Error();

  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return product[0];
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
};