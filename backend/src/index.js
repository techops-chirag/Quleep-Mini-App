const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

// CORS
const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: allowed.length ? allowed : '*' }));

app.get('/', (req, res) => res.send('Backend is running'));
app.use('/api/products', productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));