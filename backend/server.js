const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/products', productRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Furniture Store API is running!',
        status: 'success',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            productById: '/api/products/:id',
            productStats: '/api/products/stats'
        }
    });
});

// API info route
app.get('/api', (req, res) => {
    res.json({
        message: 'Furniture Store API',
        version: '1.0.0',
        endpoints: {
            'GET /api/products': 'Get all products (with filtering, sorting, pagination)',
            'POST /api/products': 'Create a new product',
            'GET /api/products/:id': 'Get a single product',
            'PUT /api/products/:id': 'Update a product',
            'DELETE /api/products/:id': 'Delete a product',
            'GET /api/products/stats': 'Get product statistics'
        },
        filters: ['category', 'brand', 'minPrice', 'maxPrice', 'search', 'inStock'],
        sorting: ['name', 'price', 'createdAt', 'updatedAt'],
        pagination: ['page', 'limit']
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

// 404 handler
app.use('/{*any}', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        availableRoutes: [
            'GET /',
            'GET /api',
            'GET /api/products',
            'POST /api/products',
            'GET /api/products/:id',
            'PUT /api/products/:id',
            'DELETE /api/products/:id',
            'GET /api/products/stats'
        ]
    });
});
// Start server
// Start server and save the instance
const server = app.listen(PORT, () => {
    console.log('🎯 ================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`📊 Products API: http://localhost:${PORT}/api/products`);
    console.log(`📈 API Info: http://localhost:${PORT}/api`);
    console.log('🎯 ================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});