import React from "react";
import { render, screen } from "@testing-library/react";
import UserDashboard from "../UserDashboard";

// Import and mock the entire module.
import useApiData from "../../../hooks/useApiData";

jest.mock("../../../hooks/useApiData", () => jest.fn());

describe("UserDashboard", () => {
  beforeEach(() => {
    // Mock the return values for the useApiData hook
    useApiData.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    useApiData.mockClear();
  });

  it("renders the UserDashboard component", () => {
    render(<UserDashboard />);
    const userDashboardElement = screen.getByTestId("user-dashboard");
    expect(userDashboardElement).toBeInTheDocument();
  });
});
describe("UserDashboard", () => {
  beforeEach(() => {
    // Mock the return values for the useApiData hook
    useApiData.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    // Clear all mock data after each test to ensure no leftover mock behavior.
    jest.clearAllMocks();
  });

  it("renders the UserDashboard component", () => {
    render(<UserDashboard />);
    const userDashboardElement = screen.getByTestId("user-dashboard");
    expect(userDashboardElement).toBeInTheDocument();
  });

  it("displays loading spinner when any API call is loading", async () => {
    useApiData.mockReturnValueOnce({
      data: [],
      loading: true,
      error: null,
    });
    render(<UserDashboard />);
    const loadingSpinnerElements = await screen.findAllByTestId("spinner");
    expect(loadingSpinnerElements.length).toBeGreaterThan(0);
  });

  it("displays error message when any API call has error", () => {
    useApiData.mockReturnValueOnce({
      data: [],
      loading: false,
      error: new Error("Failed to fetch data"),
    });
    render(<UserDashboard />);
    const errorMessageElement = screen.getByText(
      "Error fetching data. Please try again later.",
    );
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("displays error message when any API call has error", () => {
    useApiData.mockReturnValueOnce({
      data: [],
      loading: false,
      error: new Error("Failed to fetch data"),
    });
    render(<UserDashboard />);
    const errorMessageElement = screen.getByText(
      "Error fetching data. Please try again later.",
    );
    expect(errorMessageElement).toBeInTheDocument();
  });
});
