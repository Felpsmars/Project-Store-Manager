const { getAll,
    getById,
    create,
    update,
    remove,
    } = require('../models/productsModel');

const createProductService = async (name, quantity) => { 
    const allProducts = await getAll();
    const alreadyExist = await allProducts.some((product) => product.name === name);
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
    
    if (productById.length === 0) throw new Error();
    
    return productById[0];
};

const updateProductService = async (id, name, quantity) => {
    const productById = await getById(id);
    if (productById.length === 0) throw new Error();
    const updatedProduct = await update({ id, name, quantity });
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
