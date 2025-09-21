const Footer = () => {
  return (
    <footer className="bg-yellow-50 border-t border-yellow-100 mt-8 sm:mt-12 md:mt-16">
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {/* High Quality */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                High Quality
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                crafted from top materials
              </p>
            </div>
          </div>

          {/* Warranty Protection */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Warranty Protection
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                Over 2 years
              </p>
            </div>
          </div>

          {/* Free Shipping */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Free Shipping
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                Order over 150 $
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-0">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm0 0v19.5"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                24 / 7 Support
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                Dedicated support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - Responsive */}
      <div className="border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              © 2023 Furniro. All rights reserved.
            </p>

            {/* Footer Links - Responsive */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-4 md:gap-6">
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 px-2 py-1"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 px-2 py-1"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 px-2 py-1"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile Social Links - Optional */}
          <div className="flex justify-center sm:hidden mt-3 space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.32-1.297C4.198 14.824 3.708 13.673 3.708 12.376s.49-2.448 1.297-3.32C5.872 8.184 7.023 7.694 8.32 7.694s2.448.49 3.32 1.297c.867.867 1.357 2.018 1.357 3.315s-.49 2.448-1.357 3.315c-.872.807-2.023 1.297-3.32 1.297z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
