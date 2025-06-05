// Order model: defines order-related DB queries
// Fields: id, user_id, created_at, status, total
const db = require('../db');

const Order = {
  async create({ user_id, status, total }) {
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, status, total, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, status, total]
    );
    return result.insertId;
  },
  async findByUserId(user_id) {
    const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [user_id]);
    return rows;
  },
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Order;
