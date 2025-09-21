import { useState, useEffect } from "react";

const ProductModal = ({ type, product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "chair",
    brand: "",
    price: "",
    originalPrice: "",
    description: "",
    image: "",
    isNew: false,
    discount: 0,
    inStock: true,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Sample images matching Figma design
  const sampleImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=400",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&w=400",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&w=400",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&w=400",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&w=400",
  ];

  useEffect(() => {
    if (type === "edit" && product) {
      setFormData({
        name: product.name || "",
        category: product.category || "chair",
        brand: product.brand || "",
        price: product.price?.toString() || "",
        originalPrice: product.originalPrice?.toString() || "",
        description: product.description || "",
        image: product.image || sampleImages[0],
        isNew: product.isNew || false,
        discount: product.discount || 0,
        inStock: product.inStock !== undefined ? product.inStock : true,
      });
    } else {
      setFormData({
        name: "",
        category: "chair",
        brand: "",
        price: "",
        originalPrice: "",
        description: "",
        image: sampleImages[0],
        isNew: false,
        discount: 0,
        inStock: true,
      });
    }
  }, [type, product]);

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : null,
        discount: Number(formData.discount),
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg sm:rounded-xl max-w-xs sm:max-w-lg md:max-w-2xl w-full my-2 sm:my-auto shadow-2xl scrollbar-thin">
        <div className="p-3 sm:p-4 md:p-6">
          {/* Header - Responsive */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              {type === "edit" ? "✏️ Edit Product" : "➕ Add New Product"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {/* Product Name - Full width on all screens */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base"
                >
                  <option value="chair">Chair</option>
                  <option value="sofa">Sofa</option>
                  <option value="table">Table</option>
                  <option value="bed">Bed</option>
                  <option value="storage">Storage</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter brand name"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.brand}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Price (IDR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Original Price (IDR)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Description - Full width */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 resize-none text-sm sm:text-base ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image Selection - Responsive grid */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Select Product Image *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {sampleImages.map((imageUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: imageUrl }))
                    }
                    className={`w-full h-12 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      formData.image === imageUrl
                        ? "border-yellow-500 ring-2 ring-yellow-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Option ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              {errors.image && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.image}
                </p>
              )}
            </div>

            {/* Additional Options - Responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-sm sm:text-base"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 sm:mt-6 md:mt-8">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <label
                  htmlFor="isNew"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Mark as New
                </label>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 sm:mt-6 md:mt-8">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <label
                  htmlFor="inStock"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  In Stock
                </label>
              </div>
            </div>

            {/* Form Actions - Responsive buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base order-2 sm:order-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base order-1 sm:order-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>
                  {type === "edit" ? "Update Product" : "Add Product"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
