import { useState, useEffect } from "react";

// Custom hook for fetching data from a given URL
const useApiData = (url) => {
  // State variables to manage data, loading status, and errors
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use the useEffect hook to perform data fetching
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let jsonData = await response.json();

        // Check if the fetched data is an object and convert to an array if needed
        if (typeof jsonData === "object" && !Array.isArray(jsonData)) {
          const dataArray = [];
          for (let key in jsonData) {
            dataArray.push({ key: key, value: jsonData[key] });
          }
          jsonData = dataArray;
        }

        setData(jsonData); // Update the data state with fetched data
      } catch (err) {
        setError(err); // Handle and set error state in case of an error
      } finally {
        setLoading(false); // Always set loading state to false after fetch completion
      }
    };

    fetchData(); // Invoke the fetchData function when the URL changes
  }, [url]);

  // Return the fetched data, loading status, and error (if any)
  return { data, loading, error };
};

export default useApiData;
