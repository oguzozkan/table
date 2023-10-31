import React from "react";
import DataTable from "../../components/DataTable/DataTable";
import useApiData from "../../hooks/useApiData";

// Importing utility function to generate headers
import { generateHeadersFromObjectKeys } from "../../utils/utils";

// Importing CSS for styling
import "./UserDashboard.css";

// Define the UserDashboard component
const UserDashboard = () => {
  // List of data sources to fetch data from different APIs
  const dataSources = [
    {
      url: "https://jsonplaceholder.typicode.com/posts",
      dataKey: "posts",
    },
    {
      url: "https://www.binance.com/api/v3/ticker/price",
      dataKey: "btc",
    },
    {
      url: "https://jsonplaceholder.typicode.com/users",
      dataKey: "users", // Unique identifier for this data source
    },
    {
      url: "https://api.quotable.io/random",
      dataKey: "random",
    },
  ];

  // Fetch data from each data source using the useApiData hook
  const apiResponses = dataSources.map((source) => useApiData(source.url));

  // Check if any of the API responses are still loading
  const isAnyLoading = apiResponses.some((response) => response.loading);

  // Check if any of the API responses encountered an error
  const hasAnyError = apiResponses.some((response) => response.error);

  // If any of the data sources are still loading, display a loading spinner
  if (isAnyLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div data-testid="spinner" className="loading-spinner"></div>
      </div>
    );
  }

  // If any of the data sources encountered an error, display an error message
  if (hasAnyError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p className="error-message">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  // If all data has been successfully fetched, display data tables
  return (
    <div data-testid="user-dashboard">
      {/* Iterate over API responses and generate DataTables */}
      {apiResponses.map((response, idx) => {
        // Generate table headers based on object keys of the response data
        const headers = generateHeadersFromObjectKeys(response.data);
        return (
          <div key={dataSources[idx].dataKey}>
            <DataTable
              headers={headers}
              data={response.data}
              data-testid="listitem"
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserDashboard;
