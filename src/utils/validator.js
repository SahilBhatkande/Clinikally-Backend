// src/utils/validator.js
const { BadRequestError } = require('./error');

function validateSearchQuery(req, res, next) {
  const { q, limit, skip } = req.query;

  if (!q || q.length < 2) {
    throw new BadRequestError('Query must be at least 2 characters long');
  }

  if (limit && isNaN(limit) || (limit && parseInt(limit) < 1)) {
    throw new BadRequestError('Limit must be a positive number');
  }

  if (skip && isNaN(skip) || (skip && parseInt(skip) < 0)) {
    throw new BadRequestError('Skip must be a non-negative number');
  }

  next();
}

module.exports = { validateSearchQuery };