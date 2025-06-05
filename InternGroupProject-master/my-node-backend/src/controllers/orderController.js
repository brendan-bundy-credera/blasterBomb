// Handles order-related business logic
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const { user_id, items, status, total } = req.body;
    const orderId = await Order.create({ user_id, status, total });
    for (const item of items) {
      await OrderItem.add({ order_id: orderId, product_id: item.product_id, quantity: item.quantity, price: item.price });
    }
    res.status(201).json({ id: orderId });
  } catch (err) {
    next(err);
  }
};

// Get all orders for a user
exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.findByUserId(userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Get order details
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const items = await OrderItem.findByOrderId(order.id);
    res.json({ order, items });
  } catch (err) {
    next(err);
  }
};
