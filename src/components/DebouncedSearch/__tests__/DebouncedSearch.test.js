import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { DebouncedSearch } from "../DebouncedSearch";

jest.useFakeTimers();

describe("DebouncedSearch", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should cancel the debounced search if the component unmounts", async () => {
    const onSearch = jest.fn();
    const { getByTestId, unmount } = render(
      <DebouncedSearch onSearch={onSearch} />,
    );
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    jest.advanceTimersByTime(250);
    unmount();
    jest.advanceTimersByTime(250);
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("should call onSearch with the final input value after the debounce delay", async () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<DebouncedSearch onSearch={onSearch} />);
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });
    jest.advanceTimersByTime(500);
    expect(onSearch).toHaveBeenCalledWith("test");
    fireEvent.change(searchInput, { target: { value: "hello" } });
    jest.advanceTimersByTime(500);
    expect(onSearch).toHaveBeenCalledWith("hello");
  });

  it("should limit the input value's length to 256 characters", async () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<DebouncedSearch onSearch={onSearch} />);
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "a".repeat(256) } });
    expect(searchInput.value).toHaveLength(256);
  });

  it("should not call onSearch for an empty input value", () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<DebouncedSearch onSearch={onSearch} />);
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "" } });
    jest.advanceTimersByTime(500);
    expect(onSearch).not.toHaveBeenCalled();
  });

  it("should have the correct placeholder text", () => {
    const { getByTestId } = render(<DebouncedSearch onSearch={() => {}} />);
    const searchInput = getByTestId("search-input");
    expect(searchInput.placeholder).toBe("Search");
  });

  it("should have the correct initial styles", () => {
    const { getByTestId } = render(<DebouncedSearch onSearch={() => {}} />);
    const searchInput = getByTestId("search-input");
    expect(searchInput.style.boxShadow).toBe("0 0 15px 4px rgba(0,0,0,0.06)");
  });
});
