// Cart model: defines cart-related DB queries
// Fields: id, user_id, created_at
const db = require('../db');

const Cart = {
  async create(user_id) {
    const [result] = await db.execute(
      'INSERT INTO carts (user_id, created_at) VALUES (?, NOW())',
      [user_id]
    );
    return result.insertId;
  },
  async findByUserId(user_id) {
    const [rows] = await db.execute('SELECT * FROM carts WHERE user_id = ?', [user_id]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM carts WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Cart;
