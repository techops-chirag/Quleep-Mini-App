require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pool = require('./db/pool');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// ---- CORS ----
const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ---- Health ----
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---- Routes ----
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// ---- Error handler ----
app.use(errorHandler);

// ---- DB bootstrap ----
async function bootstrapDb() {
  const schemaSql = fs.readFileSync(path.join(__dirname, '../sql/schema.sql'), 'utf8');
  const seedSql = fs.readFileSync(path.join(__dirname, '../sql/seed.sql'), 'utf8');
  const usersSql = fs.readFileSync(path.join(__dirname, '../sql/users.sql'), 'utf8');

  await pool.query(schemaSql);
  await pool.query(usersSql);

  // Seed only if empty
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products;');
  if (rows[0].count === 0) {
    await pool.query(seedSql);
  }
}

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
