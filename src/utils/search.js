// src/utils/search.js
const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

async function searchProducts(query, limit, skip) {
  const products = JSON.parse(await fs.readFile(productsFile, 'utf-8'));
  
  // Case-insensitive search
  const queryLower = query.toLowerCase();
  const filtered = products
    .map(product => ({
      ...product,
      score: calculateScore(product, queryLower)
    }))
    .filter(product => 
      product.title.toLowerCase().includes(queryLower) || 
      product.brand.toLowerCase().includes(queryLower)
    )
    .sort((a, b) => b.score - a.score)
    .slice(skip, skip + limit);

  return {
    results: filtered,
    total: filtered.length,
    skip,
    limit
  };
}

function calculateScore(product, query) {
  let score = 0;
  const titleLower = product.title.toLowerCase();
  const brandLower = product.brand.toLowerCase();

  // Higher score for title matches
  if (titleLower.startsWith(query)) score += 2;
  else if (titleLower.includes(query)) score += 1;
  
  // Additional score for brand matches
  if (brandLower.includes(query)) score += 0.5;

  return score;
}

module.exports = { searchProducts };