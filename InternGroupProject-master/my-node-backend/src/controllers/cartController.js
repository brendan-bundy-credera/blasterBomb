// Handles cart-related business logic
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');

// Get user's cart
exports.getCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    let cart = await Cart.findByUserId(userId);
    if (!cart) {
      const cartId = await Cart.create(userId);
      cart = await Cart.findById(cartId);
    }
    const items = await CartItem.findByCartId(cart.id);
    res.json({ cart, items });
  } catch (err) {
    next(err);
  }
};

// Add item to cart
exports.addItem = async (req, res, next) => {
  try {
    const { cart_id, product_id, quantity } = req.body;
    const itemId = await CartItem.add({ cart_id, product_id, quantity });
    res.status(201).json({ id: itemId });
  } catch (err) {
    next(err);
  }
};

// Update cart item quantity
exports.updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    await CartItem.updateQuantity(req.params.itemId, quantity);
    res.json({ message: 'Cart item updated' });
  } catch (err) {
    next(err);
  }
};

// Remove item from cart
exports.removeItem = async (req, res, next) => {
  try {
    await CartItem.remove(req.params.itemId);
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    next(err);
  }
};
