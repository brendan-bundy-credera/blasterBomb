// Express app setup
const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));

// Catch-all: only for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(errorHandler);

module.exports = app;
