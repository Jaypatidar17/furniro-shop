const { products, getNextId } = require('../data/products');
const { filterProducts, sortProducts, paginateProducts, validateProduct } = require('../utils/helpers');

// Get all products with filtering, sorting, and pagination
const getProducts = (req, res) => {
    try {
        const {
            page = 1,
                limit = 8,
                sortBy = 'createdAt',
                sortOrder = 'desc',
                category,
                brand,
                minPrice,
                maxPrice,
                search,
                inStock
        } = req.query;

        // Apply filters
        const filters = { category, brand, minPrice, maxPrice, search, inStock };
        let filteredProducts = filterProducts(products, filters);

        // Apply sorting
        const sortedProducts = sortProducts(filteredProducts, sortBy, sortOrder);

        // Apply pagination
        const result = paginateProducts(sortedProducts, page, limit);

        res.json({
            success: true,
            data: result,
            message: `Found ${result.pagination.totalProducts} products`
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products',
            error: error.message
        });
    }
};

// Get single product by ID
const getProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product,
            message: 'Product retrieved successfully'
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching product',
            error: error.message
        });
    }
};

// Create new product
const createProduct = (req, res) => {
    try {
        // Validate product data
        const validation = validateProduct(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validation.errors
            });
        }

        // Create new product
        const newProduct = {
            id: getNextId(),
            name: req.body.name.trim(),
            category: req.body.category.toLowerCase(),
            brand: req.body.brand.trim(),
            price: parseInt(req.body.price),
            originalPrice: req.body.originalPrice ? parseInt(req.body.originalPrice) : null,
            description: req.body.description.trim(),
            image: req.body.image.trim(),
            isNew: req.body.isNew || false,
            discount: parseInt(req.body.discount) || 0,
            inStock: req.body.inStock !== undefined ? req.body.inStock : true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Add to products array
        products.push(newProduct);

        res.status(201).json({
            success: true,
            data: newProduct,
            message: 'Product created successfully'
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating product',
            error: error.message
        });
    }
};

// Update existing product
const updateProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Validate updated data
        const validation = validateProduct(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validation.errors
            });
        }

        // Update product
        const updatedProduct = {
            ...products[productIndex],
            name: req.body.name.trim(),
            category: req.body.category.toLowerCase(),
            brand: req.body.brand.trim(),
            price: parseInt(req.body.price),
            originalPrice: req.body.originalPrice ? parseInt(req.body.originalPrice) : null,
            description: req.body.description.trim(),
            image: req.body.image.trim(),
            isNew: req.body.isNew || false,
            discount: parseInt(req.body.discount) || 0,
            inStock: req.body.inStock !== undefined ? req.body.inStock : true,
            updatedAt: new Date()
        };

        products[productIndex] = updatedProduct;

        res.json({
            success: true,
            data: updatedProduct,
            message: 'Product updated successfully'
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating product',
            error: error.message
        });
    }
};

// Delete product
const deleteProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID'
            });
        }

        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Remove product from array
        const deletedProduct = products.splice(productIndex, 1)[0];

        res.json({
            success: true,
            data: deletedProduct,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting product',
            error: error.message
        });
    }
};

// Get product statistics
const getProductStats = (req, res) => {
    try {
        const stats = {
            totalProducts: products.length,
            inStockProducts: products.filter(p => p.inStock).length,
            outOfStockProducts: products.filter(p => !p.inStock).length,
            newProducts: products.filter(p => p.isNew).length,
            discountedProducts: products.filter(p => p.discount > 0).length,
            categories: [...new Set(products.map(p => p.category))],
            brands: [...new Set(products.map(p => p.brand))],
            averagePrice: Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length || 0),
            priceRange: {
                min: Math.min(...products.map(p => p.price)),
                max: Math.max(...products.map(p => p.price))
            }
        };

        res.json({
            success: true,
            data: stats,
            message: 'Product statistics retrieved successfully'
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching statistics',
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats
};