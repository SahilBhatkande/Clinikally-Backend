// src/utils/error.js
class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 400;
    }
  }
  
  function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: {
        message: err.message || 'Internal Server Error',
        status: statusCode
      }
    });
  }
  
  module.exports = { BadRequestError, errorHandler };