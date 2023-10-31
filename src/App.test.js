import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// Mock the UserDashboard component to avoid rendering its child components
jest.mock("./views/UserDashboard/UserDashboard", () => {
  return function DummyUserDashboard() {
    return <div data-testid="user-dashboard">User Dashboard</div>;
  };
});

describe("<App />", () => {
  it("renders the UserDashboard component", () => {
    const { getByTestId } = render(<App />);
    const userDashboardElement = getByTestId("user-dashboard");
    expect(userDashboardElement).toBeInTheDocument();
  });
});
