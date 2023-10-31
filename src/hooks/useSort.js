import { useState, useMemo } from "react";
import { getDeepPropertyValue } from "../utils/utils";

// Enum for sorting directions
export const SORT_DIRECTION = {
  NEUTRAL: "neutral",
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

// Custom hook for sorting data based on a key and direction
export const useSort = (
  data, // The data array to be sorted
  config = { key: "", direction: SORT_DIRECTION.NEUTRAL }, // Initial sorting configuration
) => {
  // State to manage the sorting configuration
  const [sortConfig, setSortConfig] = useState(config);

  // Memoized sorted data based on the sorting configuration
  const sortedData = useMemo(() => {
    // Create a copy of the data to avoid mutating the original array
    let sortableItems = [...data];

    // Check if the sorting direction is neutral or no key is provided
    if (sortConfig.direction === SORT_DIRECTION.NEUTRAL || !sortConfig.key) {
      return sortableItems; // Return the unaltered data
    }

    // Sort the data based on the provided key and direction
    return sortableItems.sort((a, b) => {
      const aValue = getDeepPropertyValue(a, sortConfig.key);
      const bValue = getDeepPropertyValue(b, sortConfig.key);

      // Handle numeric comparisons by converting to numbers if possible
      let comparisonA = isNaN(aValue) ? aValue : Number(aValue);
      let comparisonB = isNaN(bValue) ? bValue : Number(bValue);

      if (comparisonA < comparisonB) {
        return sortConfig.direction === SORT_DIRECTION.ASCENDING ? -1 : 1;
      }
      if (comparisonA > comparisonB) {
        return sortConfig.direction === SORT_DIRECTION.ASCENDING ? 1 : -1;
      }
      return 0; // Return 0 for equal values
    });
  }, [data, sortConfig]); // Recalculate sortedData when data or sortConfig changes

  // Function to request a sort based on a key
  const requestSort = (key) => {
    setSortConfig((prevState) => {
      // Define direction options based on the previous direction
      const directionOptions = {
        [SORT_DIRECTION.ASCENDING]: SORT_DIRECTION.DESCENDING,
        [SORT_DIRECTION.DESCENDING]: SORT_DIRECTION.NEUTRAL,
        [SORT_DIRECTION.NEUTRAL]: SORT_DIRECTION.ASCENDING,
      };

      // Determine the new direction based on the previous state and key
      const direction =
        prevState.key === key
          ? directionOptions[prevState.direction]
          : SORT_DIRECTION.ASCENDING;

      // Return the updated sorting configuration
      return { key, direction };
    });
  };
  return { sortedData, requestSort, sortConfig };
};
export default useSort;
