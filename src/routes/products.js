// src/routes/products.js
const express = require('express');
const { searchProducts } = require('../utils/search');
const { validateSearchQuery } = require('../utils/validator');

const router = express.Router();

router.get('/search', validateSearchQuery, async (req, res, next) => {
  try {
    const { q, limit = 10, skip = 0 } = req.query;
    const results = await searchProducts(q, parseInt(limit), parseInt(skip));
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;