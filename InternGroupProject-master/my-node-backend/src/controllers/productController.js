// Handles product-related business logic
const Product = require('../models/productModel');

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image_url } = req.body;
    const productId = await Product.create({ name, description, price, image_url });
    res.status(201).json({ id: productId, name, description, price, image_url });
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image_url } = req.body;
    await Product.update(req.params.id, { name, description, price, image_url });
    res.json({ message: 'Product updated' });
  } catch (err) {
    next(err);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.delete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
