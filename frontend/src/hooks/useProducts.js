import { useState, useEffect, useCallback, useMemo } from 'react';

const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);

    // ✅ Memoize filters to prevent infinite re-renders
    const stableFilters = useMemo(() => {
        return {
            category: filters.category || '',
            brand: filters.brand || '',
            minPrice: filters.minPrice || '',
            maxPrice: filters.maxPrice || '',
            sortBy: filters.sortBy || 'createdAt',
            sortOrder: filters.sortOrder || 'desc',
            page: filters.page || 1,
            limit: filters.limit || 8
        };
    }, [
        filters.category,
        filters.brand,
        filters.minPrice,
        filters.maxPrice,
        filters.sortBy,
        filters.sortOrder,
        filters.page,
        filters.limit
    ]);

    const fetchProducts = useCallback(async() => {
        console.log('🔄 Fetching products with filters:', stableFilters);

        try {
            setLoading(true);
            setError(null);

            const queryParams = new URLSearchParams();

            Object.entries(stableFilters).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    queryParams.append(key, value);
                }
            });

            // Use production API URL
            const apiUrl =
                import.meta.env.VITE_API_URL || 'https://furniro-shop.onrender.com';

            console.log('📡 API Request:', `${apiUrl}/api/products?${queryParams}`);

            const response = await fetch(`${apiUrl}/api/products?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText || 'Network error'}`);
            }

            const data = await response.json();

            if (data.success) {
                console.log('✅ Products fetched:', data.data.products.length);
                setProducts(data.data.products);
                setPagination(data.data.pagination);
            } else {
                throw new Error(data.message || 'Failed to fetch products');
            }
        } catch (err) {
            console.error('❌ Fetch error:', err);
            setError(err.message);
            setProducts([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [stableFilters]); // ✅ Use stable filters

    // ✅ useEffect with cleanup to prevent memory leaks
    useEffect(() => {
        let isMounted = true;

        const loadProducts = async() => {
            if (isMounted) {
                await fetchProducts();
            }
        };

        // ✅ Add delay to prevent rapid fire requests
        const timeoutId = setTimeout(loadProducts, 100);

        // Cleanup function
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [fetchProducts]);

    // ✅ Define refetch function with loading state
    const refetch = useCallback(() => {
        console.log('🔄 Manual refetch triggered');
        fetchProducts();
    }, [fetchProducts]);

    // ✅ Debug log for renders
    console.log('🔍 useProducts render - Loading:', loading, 'Products:', products.length);

    return {
        products,
        loading,
        error,
        pagination,
        refetch
    };
};

export default useProducts;