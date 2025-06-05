// Product model: defines product-related DB queries
// Fields: id, name, description, price, image, spice, created_at
const db = require('../db');

const Product = {
  async create({ name, description, price, image, spice }) {
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, image, spice, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, description, price, image, spice]
    );
    return result.insertId;
  },
  async findAll() {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  },
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },
  async update(id, { name, description, price, image, spice }) {
    await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ?, spice = ? WHERE id = ?',
      [name, description, price, image, spice, id]
    );
  },
  async delete(id) {
    await db.execute('DELETE FROM products WHERE id = ?', [id]);
  }
};

module.exports = Product;
