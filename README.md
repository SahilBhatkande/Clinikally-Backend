﻿# Clinikally-Backend


Product Autocomplete API
This is a Node.js API for a product autocomplete feature, allowing users to search for products by title or brand with case-insensitive matching, scoring, and pagination. The API is built as part of an assignment, using a static JSON dataset (products.json) with at least 50 products, each containing id, title, brand, category, and price.
Setup Instructions
Prerequisites

Node.js: Version 14.x or higher (tested with 16.x).
npm: Comes with Node.js.
Git: For version control and pushing to GitHub.

Installation

Clone the Repository:
git clone https://github.com/your-username/your-repo.git
cd your-repo


Install Dependencies: npm install


Prepare the Data:

The src/data/products.json file contains 50 product entries.
Ensure the file is a valid JSON array with products having id, title, brand, category, and price.


Start the Server: npm start


The API runs on http://localhost:3000 by default.
If PORT is set in a .env file, it will use that port.


Test the API:Use curl or Postman to test the /products/search endpoint. Example: GET  "http://localhost:3000/products/search?q=kiwi&limit=2&skip=0"

Expected response:
{
  "results": [
    {
      "id": 30,
      "title": "Kiwi",
      "brand": "Generic",
      "category": "groceries",
      "price": 2.49,
      "score": 2
    }
  ],
  "total": 1,
  "skip": 0,
  "limit": 2
}




Thought Process / Approach
Project Overview
The goal was to build a Node.js API with a single endpoint (/products/search) that searches a static JSON dataset (products.json) for products matching a query in their title or brand fields. The API supports:

Case-insensitive search.
Scoring: +2 for title starting with query, +1 for title containing query, +0.5 for brand containing query.
Pagination with limit and skip parameters.
Input validation (e.g., query ≥ 2 characters).



API Development:

Built the /products/search endpoint using Express in src/index.js.
Implemented search logic in src/services/search.js:
Filters products where title or brand contains the query (case-insensitive).
Assigns scores based on match type.
Sorts by score (descending) and id (ascending for ties).
Applies pagination with skip and limit.


Added validation in src/validators/validator.js to check query length and pagination parameters.
Added safeguards in search.js to handle missing title or brand fields:const title = product.title ? product.title.toLowerCase() : '';
const brand = product.brand ? product.brand.toLowerCase() : '';




Testing:

Tested locally with curl commands to verify functionality:
curl "http://localhost:3000/products/search?q=kiwi&limit=2&skip=0"
curl "http://localhost:3000/products/search?q=generic&limit=5&skip=0"
curl "http://localhost:3000/products/search?q=k"


Handled edge cases (e.g., invalid query, missing fields).
Considered adding automated tests with Jest but focused on manual testing due to time constraints.




