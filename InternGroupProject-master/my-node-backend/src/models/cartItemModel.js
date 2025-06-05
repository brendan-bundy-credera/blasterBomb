// CartItem model: defines cart item-related DB queries
// Fields: id, cart_id, product_id, quantity
const db = require('../db');

const CartItem = {
  async add({ cart_id, product_id, quantity }) {
    const [result] = await db.execute(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
      [cart_id, product_id, quantity]
    );
    return result.insertId;
  },
  async updateQuantity(id, quantity) {
    await db.execute('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);
  },
  async remove(id) {
    await db.execute('DELETE FROM cart_items WHERE id = ?', [id]);
  },
  async findByCartId(cart_id) {
    const [rows] = await db.execute('SELECT * FROM cart_items WHERE cart_id = ?', [cart_id]);
    return rows;
  }
};

module.exports = CartItem;
