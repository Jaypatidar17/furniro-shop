import { useState } from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image - Responsive height */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=400";
          }}
        />

        {/* Badges - Responsive positioning and sizing */}
        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-col space-y-1 sm:space-y-2">
          {product.discount > 0 && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg">
              -{product.discount}%
            </div>
          )}
          {product.isNew && (
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg">
              New
            </div>
          )}
        </div>

        {/* Hover Actions Overlay - Better mobile handling */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ pointerEvents: isHovered ? "auto" : "none" }}
        >
          <div className="flex space-x-3 sm:space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 transform hover:scale-110"
              title="Edit Product"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              className="bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 transform hover:scale-110"
              title="Delete Product"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Action Buttons - Show on mobile tap */}
        <div className="sm:hidden absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="bg-white bg-opacity-90 p-2 rounded-full shadow-md"
            title="Edit Product"
          >
            <svg
              className="w-4 h-4 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="bg-white bg-opacity-90 p-2 rounded-full shadow-md"
            title="Delete Product"
          >
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Details - Responsive padding and text */}
      <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-200">
          {product.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 capitalize">
          {product.category} • {product.brand}
        </p>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between pt-1 sm:pt-2 space-y-2 xs:space-y-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                product.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs text-gray-500">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
