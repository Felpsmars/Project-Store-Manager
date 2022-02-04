const { getAll,
    getById,
    create,
    update,
    remove,
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
    return allProducts;
};

const getByIdService = async (id) => {
    const productById = await getById(id);
    console.log(productById);
    console.log('test');
    if (!productById) throw new Error();

    return productById;
};

const updateProductService = async (id, name, quantity) => {
    const updatedProduct = await update({ id, name, quantity });
    const productById = await getById(id);
  
    if (!productById) throw new Error();
    if (!updatedProduct) throw new Error();

    return updatedProduct;
};

const removeProductService = async (id) => {
    const deleted = await remove(id);
    
    return deleted;
};

module.exports = {
    createProductService,
    listProductService,
    getByIdService,
    updateProductService,
    removeProductService,
};
