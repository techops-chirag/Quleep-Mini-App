const Product = require('../models/productModel');

exports.list = async (req, res, next) => {
  try {
    const { q, category } = req.query;
    const items = await Product.getAll({ q, category });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.details = async (req, res, next) => {
  try {
    const item = await Product.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};