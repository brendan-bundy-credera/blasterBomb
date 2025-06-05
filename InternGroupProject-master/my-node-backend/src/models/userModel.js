// User model: defines user-related DB queries
// Fields: id, username, email, password, created_at
const db = require('../db');

const User = {
  async create({ username, email, password }) {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [username, email, password]
    );
    return result.insertId;
  },
  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;
