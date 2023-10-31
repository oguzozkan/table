import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

// A React component for debounced search input
export const DebouncedSearch = ({ onSearch }) => {
  // State to manage the input value
  const [inputValue, setInputValue] = useState("");

  // Ref to keep track of the previous input value
  const previousValueRef = useRef(inputValue);

  const debouncedSearch = debounce((value) => {
    onSearch(value); // Notify parent when search is actually performed
    // Notify parent that typing has ended
  }, 500);

  // Call the debouncedSearch function inside the useEffect hook
  useEffect(() => {
    // Check if the input value has changed since the last render
    if (inputValue !== previousValueRef.current) {
      // Call 'onSearch' with the current input value after the debounce delay
      debouncedSearch(inputValue);

      // Update the ref with the current input value
      previousValueRef.current = inputValue;
    }

    // Cleanup: Cancel the debounced search if the component unmounts
    return () => debouncedSearch.cancel();
  }, [inputValue, onSearch]);

  // Function to handle input changes
  const handleInputChange = (event) => {
    // Limit the input value's length to 256 characters for safety
    if (event.target.value.length <= 256) {
      setInputValue(event.target.value);
    }
  };

  return (
    <input
      type="text"
      data-testid="search-input"
      style={{
        borderRadius: "5px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 0 15px 4px rgba(0,0,0,0.06)",
        paddingLeft: "25px",
      }}
      value={inputValue}
      placeholder="Search"
      onChange={handleInputChange}
      maxLength={256} // Set the max input length
    />
  );
};

export default DebouncedSearch;
