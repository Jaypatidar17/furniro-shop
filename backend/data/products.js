// In-memory product data with sample products from Figma design
let products = [{
        id: 1,
        name: "Syltherine",
        category: "chair",
        brand: "IKEA",
        price: 2500000,
        originalPrice: 3500000,
        description: "Stylish cafe chair with comfortable seating and modern design",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=400",
        isNew: false,
        discount: 30,
        inStock: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: 2,
        name: "Leviosa",
        category: "chair",
        brand: "West Elm",
        price: 2500000,
        originalPrice: null,
        description: "Stylish cafe chair perfect for any modern space and dining area",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&w=400",
        isNew: false,
        discount: 0,
        inStock: true,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
    },
    {
        id: 3,
        name: "Lolito",
        category: "sofa",
        brand: "Ashley",
        price: 7000000,
        originalPrice: 14000000,
        description: "Luxury big sofa for comfortable family time and relaxation",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&w=400",
        isNew: false,
        discount: 50,
        inStock: true,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17')
    },
    {
        id: 4,
        name: "Respira",
        category: "table",
        brand: "CB2",
        price: 500000,
        originalPrice: null,
        description: "Outdoor bar table and stool set for patio and garden",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&w=400",
        isNew: true,
        discount: 0,
        inStock: true,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
    },
    {
        id: 5,
        name: "Grifo",
        category: "bed",
        brand: "Pottery Barn",
        price: 1500000,
        originalPrice: null,
        description: "Night lamp with modern design for bedroom decoration",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&w=400",
        isNew: true,
        discount: 0,
        inStock: false,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
    },
    {
        id: 6,
        name: "Muggo",
        category: "storage",
        brand: "IKEA",
        price: 150000,
        originalPrice: null,
        description: "Small mug with elegant design for coffee and tea",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&w=400",
        isNew: true,
        discount: 0,
        inStock: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
    },
    {
        id: 7,
        name: "Pingky",
        category: "sofa",
        brand: "West Elm",
        price: 7000000,
        originalPrice: 14000000,
        description: "Cute bed set with modern aesthetic and comfortable padding",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&w=400",
        isNew: false,
        discount: 50,
        inStock: true,
        createdAt: new Date('2024-01-21'),
        updatedAt: new Date('2024-01-21')
    },
    {
        id: 8,
        name: "Potty",
        category: "outdoor",
        brand: "CB2",
        price: 500000,
        originalPrice: null,
        description: "Minimalist flower pot for outdoor spaces and gardens",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&w=400",
        isNew: true,
        discount: 0,
        inStock: true,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22')
    },
    {
        id: 9,
        name: "Coastal Chair",
        category: "chair",
        brand: "Pottery Barn",
        price: 3200000,
        originalPrice: 4000000,
        description: "Comfortable coastal style chair for living room",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=400",
        isNew: false,
        discount: 20,
        inStock: true,
        createdAt: new Date('2024-01-23'),
        updatedAt: new Date('2024-01-23')
    },
    {
        id: 10,
        name: "Modern Desk",
        category: "table",
        brand: "IKEA",
        price: 1800000,
        originalPrice: null,
        description: "Sleek modern desk perfect for home office setup",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&w=400",
        isNew: true,
        discount: 0,
        inStock: true,
        createdAt: new Date('2024-01-24'),
        updatedAt: new Date('2024-01-24')
    }
];

// Auto-increment ID counter
let nextId = 11;

// Export products data and helper functions
module.exports = {
    products,
    getNextId: () => nextId++,
    resetProducts: () => {
        // Reset to default data if needed
        products.length = 0;
        products.push(...getDefaultProducts());
        nextId = 11;
    }
};

function getDefaultProducts() {
    return [
        // Return the original 10 products if reset is needed
        ...products
    ];
}