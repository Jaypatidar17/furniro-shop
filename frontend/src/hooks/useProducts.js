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

            // ✅ PRODUCTION-FIRST API URL (Hardcoded for reliability)
            const getApiUrl = () => {
                // Check if we're in development (localhost)
                if (typeof window !== 'undefined' &&
                    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
                }

                // ✅ PRODUCTION: Always use Render backend
                return 'https://furniro-shop.onrender.com';
            };

            const apiUrl = getApiUrl();
            console.log('🌍 Environment:', typeof window !== 'undefined' ? window.location.hostname : 'server');
            console.log('📡 API URL:', apiUrl);
            console.log('📡 Full API Request:', `${apiUrl}/api/products?${queryParams}`);

            const response = await fetch(`${apiUrl}/api/products?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // ✅ Add timeout for production
                signal: AbortSignal.timeout(10000) // 10 second timeout
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => '');
                console.error('❌ Response not OK:', response.status, response.statusText);
                throw new Error(`API Error ${response.status}: ${errorText || response.statusText || 'Network error'}`);
            }

            const data = await response.json();

            if (data.success) {
                console.log('✅ Products fetched successfully:', data.data.products.length);
                console.log('📊 Pagination:', data.data.pagination);
                setProducts(data.data.products);
                setPagination(data.data.pagination);
            } else {
                console.error('❌ API returned success: false', data);
                throw new Error(data.message || 'API returned unsuccessful response');
            }
        } catch (err) {
            console.error('❌ Fetch error details:', {
                message: err.message,
                name: err.name,
                stack: err.stack
            });

            // ✅ User-friendly error messages
            let userMessage = 'Failed to load products. ';
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                userMessage += 'Please check your internet connection.';
            } else if (err.message.includes('timeout')) {
                userMessage += 'Request timed out. Please try again.';
            } else if (err.message.includes('CORS')) {
                userMessage += 'Connection error. Please refresh the page.';
            } else {
                userMessage += err.message;
            }

            setError(userMessage);
            setProducts([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, [stableFilters]);

    // ✅ useEffect with cleanup to prevent memory leaks
    useEffect(() => {
        let isMounted = true;

        const loadProducts = async() => {
            if (isMounted) {
                await fetchProducts();
            }
        };

        // ✅ Shorter delay for production
        const timeoutId = setTimeout(loadProducts, 50);

        // Cleanup function
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [fetchProducts]);

    // ✅ Define refetch function
    const refetch = useCallback(() => {
        console.log('🔄 Manual refetch triggered');
        fetchProducts();
    }, [fetchProducts]);

    // ✅ Debug log for renders (only in development)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.log('🔍 useProducts render - Loading:', loading, 'Products:', products.length);
    }

    return {
        products,
        loading,
        error,
        pagination,
        refetch
    };
};

export default useProducts;