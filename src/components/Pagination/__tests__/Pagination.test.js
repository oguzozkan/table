import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  // Helper function to setup your component with props and custom settings
  const setup = (propsOverrides = {}) => {
    // (code for setting up default and overridden props)
    const defaultProps = {
      currentPage: 1,
      totalPosts: 100,
      postsPerPage: 10,
      paginate: jest.fn(),
    };

    const props = { ...defaultProps, ...propsOverrides };

    return {
      ...render(<Pagination {...props} />),
      props,
    };
  };

  it("Should render without errors", () => {
    setup();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("Should call the 'paginate' function with the correct page number when a page number is clicked", async () => {
    const paginateMock = jest.fn();
    const { getByRole } = setup({ paginate: paginateMock }); // Pass the mock function to the component
    // If the text "2" is ambiguous (e.g., if there's more than one element with the text "2"),
    const pageNumberButton = getByRole("button", { name: /2/i }); // This assumes "2" is the text of your button. Adjust if necessary.
    fireEvent.click(pageNumberButton);
    await waitFor(() => {
      expect(paginateMock).toHaveBeenCalledWith(2);
    });
  });
  it("Should highlight the current page number", () => {
    setup({ currentPage: 3 });
    const button = screen.getByText("3");
    expect(button.closest("li")).toHaveClass("active");
  });

  it("Should not allow non-numeric input in the 'go to page number' input field", () => {
    const { props } = setup();
    const input = screen.getByTestId("page-input");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.submit(input);

    expect(input.value).toBe("");
    expect(props.paginate).not.toHaveBeenCalledWith(NaN);
  });

  it("Should change pages correctly when a number is entered into the 'go to page number' input field and 'Go' is pressed", () => {
    const { props } = setup();
    const input = screen.getByTestId("page-input");
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(screen.getByText("Go"));

    expect(props.paginate).toHaveBeenCalledWith(5);
    expect(input.value).toBe(""); // The input should be cleared on form submission
  });

  it("Should not allow navigation beyond the first and last pages", () => {
    const { props } = setup();
    const input = screen.getByTestId("page-input");

    // Trying to go beyond the last page
    fireEvent.change(input, { target: { value: "100" } }); // non-existent page
    fireEvent.click(screen.getByText("Go"));
    expect(props.paginate).not.toHaveBeenCalledWith(100);

    // Trying to go before the first page
    fireEvent.change(input, { target: { value: "0" } }); // non-existent page
    fireEvent.click(screen.getByText("Go"));
    expect(props.paginate).not.toHaveBeenCalledWith(0);
  });
  test("Should call the 'handlePageClick' function with the correct page number when 'Next' button is clicked", () => {
    // Create a mock function to simulate handlePageClick
    const handlePageClickMock = jest.fn();

    // Render the Pagination component with the mock function
    const { getByText } = render(
      <Pagination
        postsPerPage={10} // Pass your required props here
        totalPosts={100}
        paginate={handlePageClickMock}
        currentPage={1}
      />,
    );

    // Find the "Next" button and click it
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);

    // Assert that handlePageClick was called with the correct page number (2 in this case)
    expect(handlePageClickMock).toHaveBeenCalledWith(2);
  });
  test("Should call the 'handlePageClick' function with page number 1 when 'First' button is clicked", () => {
    // Create a mock function to simulate handlePageClick
    const handlePageClickMock = jest.fn();

    // Render the Pagination component with the mock function and currentPage set to 2
    const { getByText } = render(
      <Pagination
        postsPerPage={10} // Pass your required props here
        totalPosts={100}
        paginate={handlePageClickMock}
        currentPage={2}
      />,
    );

    // Find the "First" button and click it
    const firstButton = getByText("First");
    fireEvent.click(firstButton);

    // Assert that handlePageClick was called with the correct page number (1)
    expect(handlePageClickMock).toHaveBeenCalledWith(1);
  });
  test("Should call the 'handlePageClick' function with the correct previous page number when 'Previous' button is clicked", () => {
    // Create a mock function to simulate handlePageClick
    const handlePageClickMock = jest.fn();

    // Render the Pagination component with the mock function and currentPage set to 3
    const { getByText } = render(
      <Pagination
        postsPerPage={10} // Pass your required props here
        totalPosts={100}
        paginate={handlePageClickMock}
        currentPage={3}
      />,
    );

    // Find the "Previous" button and click it
    const previousButton = getByText("Previous");
    fireEvent.click(previousButton);

    // Assert that handlePageClick was called with the correct previous page number (2)
    expect(handlePageClickMock).toHaveBeenCalledWith(2);
  });
  test("Should call the 'handlePageClick' function with the correct last page number when 'Last' button is clicked", () => {
    // Create a mock function to simulate handlePageClick
    const handlePageClickMock = jest.fn();

    // Define the total number of pages
    const totalPages = 10; // You can set the total number of pages as needed

    // Render the Pagination component with the mock function and currentPage set to 5
    const { getByText } = render(
      <Pagination
        postsPerPage={10} // Pass your required props here
        totalPosts={totalPages * 10}
        paginate={handlePageClickMock}
        currentPage={5}
      />,
    );

    // Find the "Last" button and click it
    const lastButton = getByText("Last");
    fireEvent.click(lastButton);

    // Assert that handlePageClick was called with the correct last page number (totalPages)
    expect(handlePageClickMock).toHaveBeenCalledWith(totalPages);
  });
});
