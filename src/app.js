// src/app.js
const express = require('express');
const productRoutes = require('./routes/products');
const { errorHandler } = require('./utils/error');

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use(errorHandler);

module.exports = app;