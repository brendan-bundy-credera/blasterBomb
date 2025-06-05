require('dotenv').config();

const express = require('express');
const apiRoutes = require('../src/routes/api');
const path = require('path');

const productRoutes = require('../src/routes/productRoutes');
const cartRoutes = require('../src/routes/cartRoutes');
const orderRoutes = require('../src/routes/orderRoutes');
const userRoutes = require('../src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve product images from /images
app.use('/images', express.static(path.join(__dirname, '../client/images')));

// Mount all API routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api', apiRoutes); // keep example route

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client')));

// Serve index.html for any unknown routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});