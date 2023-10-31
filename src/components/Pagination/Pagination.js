import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  // Calculate the total number of pages based on posts per page and total posts
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  // Number of surrounding pages to display
  const surroundingPages = 2;

  // State to manage the input page number
  const [inputPage, setInputPage] = useState("");

  // Function to calculate a range of page numbers around the current page
  const getPageRange = (current, totalPages, surrounding) => {
    let start = Math.max(2, current - surrounding);
    let end = Math.min(totalPages - 1, current + surrounding);

    // Adjust the range when the current page is near the beginning or end
    if (current - 1 <= surrounding) {
      end = Math.min(totalPages, start + surrounding * 2);
    }

    if (totalPages - current <= surrounding) {
      start = Math.max(2, end - surrounding * 2);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  // Get the range of page numbers to display
  const pageNumbers = getPageRange(currentPage, totalPages, surroundingPages);

  // Handle clicking on a page number
  const handlePageClick = (number) => {
    paginate(number);
  };

  return (
    <>
      <nav>
        <ul className="pagination">
          {/* Render the "First" button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1}
              className="page-link"
            >
              First
            </button>
          </li>

          {/* Render the "Previous" button */}
          {currentPage > 1 && (
            <li className="page-item">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                className="page-link"
              >
                Previous
              </button>
            </li>
          )}

          {/* Render the page numbers */}
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                onClick={() => handlePageClick(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}

          {/* Render the "Next" button */}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                className="page-link"
              >
                Next
              </button>
            </li>
          )}

          {/* Render the "Last" button */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              onClick={() => handlePageClick(totalPages)}
              className="page-link"
            >
              Last
            </button>
          </li>

          {/* Input form to jump to a specific page */}
          <li className="page-item">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Parse and validate the input page number
                const page = Math.min(
                  Math.max(1, parseInt(inputPage)),
                  totalPages,
                );
                if (!isNaN(page)) {
                  handlePageClick(page);
                  setInputPage("");
                }
              }}
              className="page-input-form"
            >
              <label htmlFor="page-input" className="sr-only">
                Page Number
              </label>
              <input
                data-testid="page-input"
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                className="page-input"
                placeholder="Page"
                min="1"
                max={totalPages}
              />
              <button type="submit" className="go-button">
                Go
              </button>
            </form>
          </li>
        </ul>
        <hr />
      </nav>
    </>
  );
};

export default Pagination;
