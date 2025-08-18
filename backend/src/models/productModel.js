const pool = require('../db/pool');

const ProductModel = {
  async getAll({ q, category }) {
    const values = [];
    let sql = `SELECT id, name, category, price, image_url, model_url, description
               FROM products`;
    const where = [];

    if (q) {
      values.push(`%${q}%`);
      const idx = values.length;
      where.push(`(LOWER(name) LIKE LOWER($${idx}) OR LOWER(category) LIKE LOWER($${idx}))`);
    }
    if (category) {
      values.push(category);
      const idx = values.length;
      where.push(`LOWER(category) = LOWER($${idx})`);
    }

    if (where.length) {
      sql += ` WHERE ${where.join(' AND ')}`;
    }
    sql += ' ORDER BY created_at DESC, id DESC';

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

  // ---- Aliases for controller ----
  list: async function(params) {
    return this.getAll(params);
  },

  byId: async function(id) {
    return this.getById(id);
  }
};

module.exports = ProductModel;
