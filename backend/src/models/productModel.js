const db = require('../db/pool');

async function initDb() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      thumbnail TEXT,
      model_url TEXT,
      price NUMERIC(10,2) DEFAULT 0
    );
  `);

  // seed if empty
  const { rows } = await db.query('SELECT COUNT(*)::int AS count FROM products');
  if (rows[0].count === 0) {
    await db.query(
      `INSERT INTO products (title, description, category, thumbnail, model_url, price)
       VALUES
       ('Chair Alpha', 'Ergonomic office chair', 'chairs', '/images/chair.jpg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 129.99),
       ('Sofa Beta', '2-seater compact sofa', 'sofas', '/images/sofa.jpg', 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb', 399.00),
       ('Lamp Gamma', 'Minimal table lamp', 'lamps', '/images/lamp.jpg', 'https://modelviewer.dev/shared-assets/models/Horse.glb', 59.00)
      `
    );
  }
}

async function list({ q, category, limit = 24, offset = 0 }) {
  const clauses = [];
  const params = [];

  if (q) {
    params.push(`%${q}%`);
    clauses.push(`(LOWER(title) LIKE LOWER($${params.length}) OR LOWER(description) LIKE LOWER($${params.length}))`);
  }
  if (category) {
    params.push(category);
    clauses.push(`category = $${params.length}`);
  }

  params.push(limit);
  params.push(offset);

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const sql = `SELECT * FROM products ${where} ORDER BY id DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
  const { rows } = await db.query(sql, params);
  return rows;
}

async function byId(id) {
  const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0] || null;
}

module.exports = { initDb, list, byId };