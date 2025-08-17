const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.list);        // GET /api/products
router.get('/:id', controller.details);  // GET /api/products/:id

module.exports = router;