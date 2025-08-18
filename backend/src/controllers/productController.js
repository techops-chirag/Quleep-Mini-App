const Product = require('../models/productModel');

async function getProducts(req, res, next) {
  try {
    const { q, category, limit, offset } = req.query;
    const items = await Product.list({ q, category });
    const paginatedItems = items.slice(Number(offset) || 0, (Number(offset) || 0) + (Number(limit) || 24));
    res.json({ items: paginatedItems });
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Product.byId(id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProducts, getProductById };
