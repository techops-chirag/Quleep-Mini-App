const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
const { initDb } = require('./models/productModel');

dotenv.config();

const app = express();
app.use(express.json());

// CORS: allow specific origins from env (comma-separated)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // same-origin / server-side
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/products', productRoutes);

// Error handler (last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
      if (allowedOrigins.length) {
        console.log('CORS allowed:', allowedOrigins.join(', '));
      }
    });
  } catch (err) {
    console.error('Failed to initialize DB:', err);
    process.exit(1);
  }
})();