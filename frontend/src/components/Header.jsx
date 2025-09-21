import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo - Responsive */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 transform rotate-45"></div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              Furniro
            </span>
          </Link>

          {/* Desktop Navigation - Same as before */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link to="/shop" className="text-gray-900 font-medium">
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Icons - Better responsive spacing */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Hide some icons on mobile */}
            <button className="hidden sm:block p-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <button className="p-1.5 sm:p-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button className="hidden sm:block p-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button className="p-1.5 sm:p-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200 relative">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 15h12M12 19a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </button>

            {/* Mobile menu button - Better touch target */}
            <button
              className="md:hidden p-2 ml-1 text-gray-700 hover:text-yellow-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved responsive */}
        {isMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t animate-fadeIn">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="py-3 px-1 text-base text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="py-3 px-1 text-base text-gray-900 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="py-3 px-1 text-base text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-3 px-1 text-base text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
