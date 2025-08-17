const pool = require('../db/pool');

const ProductModel = {
  async getAll({ q, category }) {
    const values = [];
    let sql = `SELECT id, name, category, price, image_url, model_url, description FROM products`;

    const where = [];
    if (q) {
      values.push(`%${q}%`);
      where.push(`(LOWER(name) LIKE LOWER($${values.length}) OR LOWER(category) LIKE LOWER($${values.length}))`);
    }
    if (category) {
      values.push(category);
      where.push(`LOWER(category) = LOWER($${values.length})`);
    }
    if (where.length) sql += ` WHERE ${where.join(' AND ')}`;
    sql += ' ORDER BY id ASC';

    const { rows } = await pool.query(sql, values);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      `SELECT id, name, category, price, image_url, model_url, description
       FROM products WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = ProductModel;