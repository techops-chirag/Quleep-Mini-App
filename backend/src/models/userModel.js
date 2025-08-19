const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

const UserModel = {
  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT id, email, password, name FROM users WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  },

  async create({ email, password, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );
    return rows;
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = UserModel;
