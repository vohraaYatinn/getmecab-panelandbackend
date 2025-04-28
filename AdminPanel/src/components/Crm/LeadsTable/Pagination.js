"use client";

import { useState } from "react";

const Pagination = ({ totalItems, itemsPerPage =10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);  // notify parent to change data
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let page = 1; page <= totalPages; page++) {
      pages.push(
        <li key={page} className="page-item">
          <button
            className={`page-link ${currentPage === page ? "active" : ""}`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
        <span className="fs-12 fw-medium">
          Showing {itemsPerPage} of {totalItems} Results
        </span>

        <nav aria-label="Page navigation example">
          <ul className="pagination mb-0 justify-content-center">
            <li className="page-item">
              <button
                className="page-link icon"
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous"
                disabled={currentPage === 1}
              >
                <span className="material-symbols-outlined">
                  keyboard_arrow_left
                </span>
              </button>
            </li>

            {renderPageNumbers()}

            <li className="page-item">
              <button
                className="page-link icon"
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next"
                disabled={currentPage === totalPages}
              >
                <span className="material-symbols-outlined">
                  keyboard_arrow_right
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
