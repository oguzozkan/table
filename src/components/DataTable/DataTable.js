import React, { useState } from "react";
import useSort from "../../hooks/useSort";
import useFilter from "../../hooks/useFilter";
import DebouncedSearch from "../DebouncedSearch/DebouncedSearch";
import SortHeader from "../SortHeader/SortHeader";
import Pagination from "../Pagination/Pagination";
import {
  extractNestedValueAsString,
  generatePaginationSizeOption,
} from "../../utils/utils";
import PropTypes from "prop-types";
import "./DataTable.css";

const DataTable = ({ headers, data }) => {
  // State for managing current page and posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  // const [isTyping, setIsTyping] = useState(false);

  // Custom hooks for filtering and sorting
  const { filteredData, setQuery } = useFilter(data, headers);
  const { sortedData, requestSort, sortConfig } = useSort(filteredData);

  // Calculate indexes for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedData.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle posts per page change
  const handlePostsPerPageChange = (e) => {
    setPostsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset the current page whenever the posts per page changes
  };

  // Generate dynamic options for posts per page dropdown
  const dynamicOptions = generatePaginationSizeOption(sortedData.length);

  // Function to handle search input change
  const handleSearch = (value) => {
    setCurrentPage(1); // Reset to the first page when searching
    setQuery(value);
  };

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <div className="search-input">
          <i className="bi bi-search"></i>
          <div className="search-inner">
            <DebouncedSearch
              data-testid="search-input-test"
              onSearch={handleSearch}
              // onTyping={setIsTyping}
            />
          </div>
        </div>
        <div className="posts-per-page">
          <span className="results-count">Results: {sortedData.length} </span>
          <label htmlFor="postsPerPage" className="posts-per-page-label">
            Posts per page:{" "}
          </label>
          <div className="custom-dropdown">
            <select
              className="postsPerPageSelect"
              data-testid="postsPerPageSelect"
              value={postsPerPage}
              onChange={handlePostsPerPageChange}
            >
              {dynamicOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <i className="bi bi-chevron-bar-down"></i>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          {/* SortHeader component for table headers */}
          <SortHeader
            headers={headers}
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((item, index) => (
                <tr className="tritem" key={item.id || index}>
                  {headers.map((header) => {
                    const { name } =
                      extractNestedValueAsString(header, "details") || header;
                    return (
                      <td key={name} data-label={name}>
                        {extractNestedValueAsString(item, name)}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              // Display message when no matching results found
              <tr>
                <td colSpan={headers.length}>No matching results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={sortedData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

// PropTypes for headers and data
DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
