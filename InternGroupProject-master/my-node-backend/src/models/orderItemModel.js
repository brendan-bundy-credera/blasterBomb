// OrderItem model: defines order item-related DB queries
// Fields: id, order_id, product_id, quantity, price
const db = require('../db');

const OrderItem = {
  async add({ order_id, product_id, quantity, price }) {
    const [result] = await db.execute(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [order_id, product_id, quantity, price]
    );
    return result.insertId;
  },
  async findByOrderId(order_id) {
    const [rows] = await db.execute('SELECT * FROM order_items WHERE order_id = ?', [order_id]);
    return rows;
  }
};

module.exports = OrderItem;
