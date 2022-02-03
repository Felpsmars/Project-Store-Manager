require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const productController = require('./controllers/productController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);
app.use('/products/:id', productController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
