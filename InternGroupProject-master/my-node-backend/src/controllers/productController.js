// Handles product-related business logic
const Product = require('../models/productModel');

// Helper to build image URL
function getImageUrl(image) {
  if (!image) return '';
  return `/images/${image}`;
}

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, spice } = req.body;
    const productId = await Product.create({ name, description, price, image, spice });
    res.status(201).json({ id: productId, name, description, price, image: getImageUrl(image), spice });
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    // Attach image URL for each product
    const productsWithImageUrl = products.map(p => ({ ...p, image: getImageUrl(p.image) }));
    res.json(productsWithImageUrl);
  } catch (err) {
    console.error('Error fetching products:', err); // Logging
    next(err);
  }
};

// Get product by ID
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    // Attach image URL
    product.image = getImageUrl(product.image);
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err); // Logging
    next(err);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, spice } = req.body;
    await Product.update(req.params.id, { name, description, price, image, spice });
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
