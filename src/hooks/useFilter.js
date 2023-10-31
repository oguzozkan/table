import { useState } from "react";
import { getDeepPropertyValue } from "../utils/utils";

// Custom hook for filtering data based on a search query and headers
const useFilter = (data, headers) => {
  // State to manage the search query
  const [query, setQuery] = useState("");
  let filteredData = []; // Initialize the filtered data array

  // Check if the provided data is an array
  if (Array.isArray(data)) {
    // Use the filter method to create a filtered version of the data
    filteredData = data.filter((item) => {
      // If the query is empty, return all items
      if (!query) return true;

      // Check if any of the headers contain the query as a substring
      return headers.some((header) => {
        // Get the value from the data item using the header name
        const value = getDeepPropertyValue(item, header.name);

        // If the value is undefined, skip this header
        if (value === undefined) return false;

        // Perform a case-insensitive search in the value
        return value.toString().toLowerCase().includes(query.toLowerCase());
      });
    });
  }
  // Return the filtered data and a function to update the query
  return { filteredData, setQuery };
};

export default useFilter;
