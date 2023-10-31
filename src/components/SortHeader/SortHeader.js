import React from "react";
import PropTypes from "prop-types";
import { extractNestedValueAsString } from "../../utils/utils";
import "./SortHeader.css";

// Define possible sorting directions as constants
const SORT_DIRECTION = {
  NEUTRAL: "neutral",
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

// SortHeader component for rendering sortable table headers
const SortHeader = ({ headers, requestSort, sortConfig }) => {
  // Get the CSS class name for a header based on the sorting configuration
  const getClassNameForHeader = (name) => {
    if (sortConfig && sortConfig.key === name) {
      return sortConfig.direction;
    }
    return undefined;
  };

  // Get the arrow icon for a header based on the sorting configuration
  const getArrowForHeader = (name) => {
    if (sortConfig && sortConfig.key === name) {
      if (sortConfig.direction === SORT_DIRECTION.ASCENDING) {
        return (
          <i className="bi bi-chevron-compact-down" data-testid="icon"></i>
        );
      } else if (sortConfig.direction === SORT_DIRECTION.DESCENDING) {
        return <i className="bi bi-chevron-compact-up" data-testid="icon"></i>;
      }
    }

    return <i className="bi bi-dash" data-testid="icon"></i>;
  };

  return (
    <thead>
      <tr>
        {headers.map((header) => {
          const { name, sortable } =
            extractNestedValueAsString(header, "details") || header;

          return (
            <th
              key={name}
              onClick={() => {
                requestSort(name);
              }}
              className={getClassNameForHeader(name)}
              style={{ cursor: sortable ? "pointer" : "default" }}
            >
              {name} {getArrowForHeader(name)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

// Define prop types for SortHeader component
SortHeader.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
      }),
      PropTypes.shape({
        details: PropTypes.shape({
          name: PropTypes.string.isRequired,
          displayName: PropTypes.string.isRequired,
          sortable: PropTypes.bool,
        }),
      }),
    ]),
  ).isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string,
  }),
};

export default SortHeader;
