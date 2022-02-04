require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const salesController = require('./controllers/salesController');
const productController = require('./controllers/productController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', salesController);

app.use('/products', productController);
app.use('/products/:id', productController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
