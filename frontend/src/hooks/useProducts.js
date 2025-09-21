import { useState, useEffect, useCallback, useMemo } from 'react';

const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);

    // Stringify filters to prevent reference issues
    const filtersString = useMemo(() => {
        return JSON.stringify(filters);
    }, [filters]);

    const fetchProducts = useCallback(async() => {
        try {
            setLoading(true);
            setError(null);

            const queryParams = new URLSearchParams();
            const parsedFilters = JSON.parse(filtersString);

            Object.entries(parsedFilters).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    queryParams.append(key, value);
                }
            });

            const response = await fetch(
                `http://localhost:5000/api/products?${queryParams}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setProducts(data.data.products);
                setPagination(data.data.pagination);
            } else {
                throw new Error(data.message || 'Failed to fetch products');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
            setProducts([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [filtersString]); // Use string instead of object

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const refetch = useCallback(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        pagination,
        refetch
    };
};

export default useProducts;