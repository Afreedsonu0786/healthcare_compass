import React from "react";

interface ResultsPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function ResultsPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: ResultsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Previous
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => {
        // Show first page, last page, current page and pages around current
        const pageNum = i + 1;
        if (
          pageNum === 1 ||
          pageNum === totalPages ||
          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
        ) {
          return (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          );
        } else if (
          (pageNum === currentPage - 2 && currentPage > 3) ||
          (pageNum === currentPage + 2 && currentPage < totalPages - 2)
        ) {
          return (
            <span key={i} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        }
        return null;
      })}

      {currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Next
        </button>
      )}
    </div>
  );
}
