// Utility functions for data manipulation

// Filter products based on criteria
const filterProducts = (products, filters) => {
    let filtered = [...products];

    // Filter by category
    if (filters.category) {
        filtered = filtered.filter(product =>
            product.category.toLowerCase() === filters.category.toLowerCase()
        );
    }

    // Filter by brand (case-insensitive partial match)
    if (filters.brand) {
        filtered = filtered.filter(product =>
            product.brand.toLowerCase().includes(filters.brand.toLowerCase())
        );
    }

    // Filter by price range
    if (filters.minPrice) {
        filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
        filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }

    // Filter by search term (name, brand, description)
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by stock status
    if (filters.inStock !== undefined) {
        filtered = filtered.filter(product => product.inStock === (filters.inStock === 'true'));
    }

    return filtered;
};

// Sort products based on criteria
const sortProducts = (products, sortBy = 'createdAt', sortOrder = 'desc') => {
    const sorted = [...products];

    sorted.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle date sorting
        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        // Handle string sorting (case-insensitive)
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    return sorted;
};

// Paginate products
const paginateProducts = (products, page = 1, limit = 8) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedProducts = products.slice(startIndex, endIndex);

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limitNum);

    return {
        products: paginatedProducts,
        pagination: {
            currentPage: pageNum,
            totalPages,
            totalProducts,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1,
            limit: limitNum
        }
    };
};

// Generate unique ID
const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Validate product data
const validateProduct = (productData) => {
    const errors = [];

    if (!productData.name || productData.name.trim().length === 0) {
        errors.push('Product name is required');
    }

    if (!productData.category || productData.category.trim().length === 0) {
        errors.push('Category is required');
    }

    const validCategories = ['chair', 'sofa', 'table', 'bed', 'storage', 'outdoor'];
    if (productData.category && !validCategories.includes(productData.category.toLowerCase())) {
        errors.push('Invalid category. Must be one of: chair, sofa, table, bed, storage, outdoor');
    }

    if (!productData.brand || productData.brand.trim().length === 0) {
        errors.push('Brand is required');
    }

    if (!productData.price || productData.price <= 0) {
        errors.push('Valid price is required');
    }

    if (!productData.description || productData.description.trim().length === 0) {
        errors.push('Description is required');
    }

    if (!productData.image || productData.image.trim().length === 0) {
        errors.push('Image URL is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    filterProducts,
    sortProducts,
    paginateProducts,
    generateId,
    validateProduct
};