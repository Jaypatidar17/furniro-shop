const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats
} = require('../controllers/productController');

const router = express.Router();

// Product CRUD routes
router.route('/')
    .get(getProducts) // GET /api/products - Get all products with filters/pagination
    .post(createProduct); // POST /api/products - Create new product

router.route('/stats')
    .get(getProductStats); // GET /api/products/stats - Get product statistics

router.route('/:id')
    .get(getProduct) // GET /api/products/:id - Get single product
    .put(updateProduct) // PUT /api/products/:id - Update product
    .delete(deleteProduct); // DELETE /api/products/:id - Delete product

module.exports = router;