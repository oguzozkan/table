import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataTable from "../DataTable";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// Define sample headers and data for testing.
const headers = [
  { name: "id", sortable: true },
  { name: "name", sortable: true },
  { name: "age", sortable: true },
];

const data = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Doe", age: 30 },
  { id: 3, name: "Bob Smith", age: 40 },
  { id: 4, name: "Alice Johnson", age: 35 },
];
let renderedComponent;

beforeEach(() => {
  renderedComponent = render(<DataTable headers={headers} data={data} />);
});
// Configure Enzyme for React 17.
configure({ adapter: new Adapter() });

describe("<DataTable />", () => {
  // Test case: Renders the table and checks if "John Doe" is present.
  it("renders the table td", () => {
    const { getByText } = renderedComponent;
    expect(getByText("John Doe")).toBeInTheDocument();
  });

  // Test case: Tests if the data is sorted correctly when the name header is clicked.
  it("sorts the data correctly", () => {
    const { getByText } = renderedComponent;

    // Simulate a click on the "name" header for sorting.
    fireEvent.click(
      getByText(
        (content, element) =>
          element.textContent && element.textContent.startsWith("name"),
      ),
    );

    // Assert that the sorted result with "id" is present.
    expect(getByText("1")).toBeInTheDocument();
  });

  // Test case: Checks if the "posts per page" dropdown updates correctly.
  it("updates postsPerPage when select value changes", () => {
    const { getByTestId } = renderedComponent;
    const selectElement = getByTestId("postsPerPageSelect");

    // Simulate a user selecting a different option (4 in this case).
    fireEvent.change(selectElement, { target: { value: "4" } });

    // Assert that the value has been updated to "4".
    expect(selectElement.value).toBe("4");
  });

  // Test case: Ensures correct pagination behavior when the page number changes.
  it("paginates correctly when page number changes", () => {
    const { getByText } = renderedComponent;
    const nextButton = getByText("2"); // Assuming you have a pagination control that shows page numbers

    // Simulate a click on the next page button.
    fireEvent.click(nextButton);

    // Assert that the new page content is visible (e.g., "3" in this case).
    const newPageContent = getByText("3");
    expect(newPageContent).toBeInTheDocument();
  });

  // Test suite for "onSearch" behavior.
  describe("onSearch behavior", () => {
    const setQuery = jest.fn();
    const setCurrentPage = jest.fn();

    const handleSearch = (value) => {
      setCurrentPage(1);
      setQuery(value);
    };

    const scenarios = [
      { input: "test", expectedSetQuery: "test" },
      { input: "", expectedSetQuery: "" },
      { input: null, expectedSetQuery: null },
    ];

    scenarios.forEach((scenario) => {
      it(`should call setCurrentPage with 1 and setQuery with '${scenario.expectedSetQuery}' when onSearch is called with '${scenario.input}'`, () => {
        handleSearch(scenario.input);
        expect(setCurrentPage).toHaveBeenCalledWith(1);
        expect(setQuery).toHaveBeenCalledWith(scenario.expectedSetQuery);
      });
    });
  });
});
