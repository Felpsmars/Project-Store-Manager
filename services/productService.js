const { getAll,
    getById,
    create,
    update,
    remove,
    } = require('../models/productsModel');

const createProductService = async (name, quantity) => { 
    const allProducts = await getAll();
    console.log('allProducts', allProducts);
    const alreadyExist = allProducts.some((product) => product.name === name);
    console.log('alreadyExist', alreadyExist);
    if (alreadyExist) throw new Error();

    const newProduct = create(name, quantity);
    console.log('newProduct', newProduct);
    
    return newProduct;
};

const listProductService = async () => {
    const allProducts = await getAll();
    console.log('allProducts', allProducts);
    return allProducts;
};

const getByIdService = async (id) => {
    const productById = await getById(id);
    console.log('productById', productById);
    if (productById.length === 0) throw new Error();
    console.log('productById[0]', productById[0]);
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
