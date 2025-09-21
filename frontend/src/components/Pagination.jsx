const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    // Less visible pages on mobile, more on desktop
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 py-6 sm:py-8">
      {/* Page Info - Mobile */}
      <div className="sm:hidden text-sm text-gray-600 mb-2">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-2">
        {/* Previous Button - Responsive */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden xs:inline">Previous</span>
          <span className="xs:hidden">Prev</span>
        </button>

        {/* First page if not visible - Hide on mobile */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="hidden sm:block px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="hidden sm:block px-2 py-2 text-sm text-gray-500">
                ...
              </span>
            )}
          </>
        )}

        {/* Page Numbers - Responsive sizing */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-2.5 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentPage === pageNumber
                  ? "bg-yellow-600 text-white border border-yellow-600"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Last page if not visible - Hide on mobile */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="hidden sm:block px-2 py-2 text-sm text-gray-500">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="hidden sm:block px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button - Responsive */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span className="hidden xs:inline">Next</span>
          <span className="xs:hidden">Next</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Jump to Page - Desktop only */}
      <div className="hidden lg:flex items-center ml-6 space-x-2">
        <span className="text-sm text-gray-600">Go to:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          placeholder={currentPage}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
                e.target.value = "";
              }
            }
          }}
          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
    </div>
  );
};

export default Pagination;
