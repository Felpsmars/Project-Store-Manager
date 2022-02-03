const { getAll,
    getById,
    create,
    } = require('../models/productsModel');

const createProductService = async (name, quantity) => { 
    const allProducts = await getAll();

    const alreadyExist = allProducts.some((product) => product.name === name);
  
    if (alreadyExist) throw new Error();
  
    const newProduct = create(name, quantity);

      return newProduct;
};

const listProductService = async () => {
    const allProducts = await getAll();
    console.log('listProductService');
    return allProducts;
};

const getByIdService = async (id) => {
    const productById = await getById(id);

    if (!productById) throw new Error();

    return productById;
};

module.exports = {
    createProductService,
    listProductService,
    getByIdService,
};
