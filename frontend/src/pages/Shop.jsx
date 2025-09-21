import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Pagination from "../components/Pagination";
import useProducts from "../hooks/useProducts";
import Footer from "../components/Footer";

const Shop = () => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Added loading state for operations
  const [isDeleting, setIsDeleting] = useState(false);

  const { products, loading, pagination, error, refetch } = useProducts({
    ...filters,
    page: currentPage,
    limit: 8,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    setModalType("add");
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setModalType("edit");
    setSelectedProduct(product);
    setShowModal(true);
  };

  // ✅ Enhanced delete with better UX
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(true);
      try {
        const apiUrl =
          import.meta.env.VITE_API_URL || "https://furniro-shop.onrender.com";
        const response = await fetch(`${apiUrl}/api/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // ✅ Show success message
          alert("Product deleted successfully!");
          refetch();
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert(
            `Failed to delete product: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert(`Error deleting product: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // ✅ Enhanced modal submit with better error handling
  const handleModalSubmit = async (formData) => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "https://furniro-shop.onrender.com";
      const url =
        modalType === "edit"
          ? `${apiUrl}/api/products/${selectedProduct.id}`
          : `${apiUrl}/api/products`;

      const method = modalType === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to ${modalType} product`);
      }

      // ✅ Show success message
      alert(
        `Product ${modalType === "edit" ? "updated" : "added"} successfully!`
      );
      refetch();
    } catch (error) {
      console.error("Submit error:", error);
      // ✅ Better error handling - don't close modal on error
      alert(`Error: ${error.message}`);
      throw error; // Re-throw so modal handles it
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Responsive */}
      <div
        className="relative bg-cover bg-center h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3")',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Shop
          </h1>
          <nav className="text-xs sm:text-sm md:text-base opacity-90">
            <span>Home</span> <span className="mx-1 sm:mx-2">›</span>{" "}
            <span>Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Filters and Controls - Responsive */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Left Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
                <span className="hidden xs:inline">Filter</span>
              </button>

              {/* ✅ Enhanced refresh button with loading state */}
              <button
                onClick={refetch}
                disabled={loading}
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    loading ? "animate-spin" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {loading ? "Loading..." : "Refresh"}
                </span>
              </button>

              <span className="text-xs sm:text-sm text-gray-600 hidden md:block">
                Showing {(currentPage - 1) * 8 + 1}-
                {Math.min(currentPage * 8, pagination?.totalProducts || 0)} of{" "}
                {pagination?.totalProducts || 0} results
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4">
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-");
                  handleFilterChange("sortBy", sortBy);
                  handleFilterChange("sortOrder", sortOrder);
                }}
                className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base"
              >
                <option value="createdAt-desc">Latest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>

              <button
                onClick={handleAddProduct}
                className="px-4 py-2 sm:px-6 sm:py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 shadow-sm hover:shadow-md transform hover:scale-105 text-sm sm:text-base font-medium"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Mobile Results Count */}
          <div className="md:hidden mb-3 text-center">
            <span className="text-xs text-gray-600">
              {pagination?.totalProducts || 0} products found
            </span>
          </div>

          {/* Filter Panel - Same as before */}
          {showFilters && (
            <div className="border-t pt-4 sm:pt-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm"
                  >
                    <option value="">All Categories</option>
                    <option value="chair">Chairs</option>
                    <option value="sofa">Sofas</option>
                    <option value="table">Tables</option>
                    <option value="bed">Beds</option>
                    <option value="storage">Storage</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={filters.brand}
                    onChange={(e) =>
                      handleFilterChange("brand", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Min Price (IDR)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Max Price (IDR)
                  </label>
                  <input
                    type="number"
                    placeholder="10000000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm"
                  />
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFilters({
                      category: "",
                      brand: "",
                      minPrice: "",
                      maxPrice: "",
                      sortBy: "createdAt",
                      sortOrder: "desc",
                    });
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="sm:hidden px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error State - Enhanced */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex items-center flex-1">
                <svg
                  className="w-5 h-5 text-red-400 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-red-700 text-sm font-medium">
                    Failed to load products
                  </p>
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              </div>
              <button
                onClick={refetch}
                disabled={loading}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors duration-200 text-sm disabled:opacity-50"
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          </div>
        )}

        {/* Products Grid - Same as before but with loading state on delete */}
        {loading ? (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-yellow-600 mb-3 sm:mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">
              Loading products...
            </p>
          </div>
        ) : (
          <>
            {/* ✅ Show deleting overlay when deleting */}
            {isDeleting && (
              <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                    <span className="text-sm">Deleting product...</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>

            {products.length === 0 && !loading && (
              <div className="text-center py-8 sm:py-12">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
                  />
                </svg>
                <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 text-sm sm:text-base font-medium"
                >
                  Add First Product
                </button>
              </div>
            )}

            {/* Pagination - Same as before */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Product Modal - Same as before */}
      {showModal && (
        <ProductModal
          type={modalType}
          product={selectedProduct}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}

      {/* Footer - Same as before */}
      <Footer />
    </div>
  );
};

export default Shop;
