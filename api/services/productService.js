const productsModel = require('../models/productsModel');

const createProductService = async (name, quantity) => { 
    const allProducts = await productsModel.getAll();

    const alreadyExist = allProducts.some((product) => product.name === name);
  
    if (alreadyExist) throw new Error();
  
    const newProduct = productsModel.create(name, quantity);

      return newProduct;
};

module.exports = {
    createProductService,
};
