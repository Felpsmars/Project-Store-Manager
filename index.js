require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const salesRouter = require('./router/sales');
const productRouter = require('./router/products');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', salesRouter);
app.use('/sales/:id', salesRouter);

app.use('/products', productRouter);
app.use('/products/:id', productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
