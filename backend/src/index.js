require('dotenv').config();

console.log("DATABASE_URL in app:", process.env.DATABASE_URL);

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pool = require('./db/pool'); // now gets DATABASE_URL correctly
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// ---- CORS ----
const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // same-origin or curl
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// ---- DB bootstrap (schema + seed) ----
async function bootstrapDb() {
  const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
  const seedPath = path.join(__dirname, '..', 'sql', 'seed.sql');

  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  await pool.query(schemaSql);

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products;');
  if (!rows[0] || rows[0].count === 0) {
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    await pool.query(seedSql);
    console.log('[DB] Seeded initial products');
  } else {
    console.log('[DB] Products already present');
  }
}

// ---- Routes ----
app.get('/', (_req, res) => res.send('Backend is running'));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/products', productRoutes);

// ---- Error handler ----
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

bootstrapDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      console.log('CORS allowed:', allowed);
    });
  })
  .catch((err) => {
    console.error('Failed to bootstrap DB:', err);
    process.exit(1);
  });
