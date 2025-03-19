"use client";

import React from "react";

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  const startItem = ((currentPage - 1) * 10) + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
      <span className="fs-13 fw-medium">Items per pages: 10</span>

      <div className="d-flex align-items-center">
        <span className="fs-13 fw-medium me-2">
          {startItem} - {endItem} of {totalItems}
        </span>

        <nav aria-label="Page navigation">
          <ul className="pagination mb-0 justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="material-symbols-outlined">
                  keyboard_arrow_left
                </span>
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link icon"
                onClick={() => onPageChange(currentPage + 1)}
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
