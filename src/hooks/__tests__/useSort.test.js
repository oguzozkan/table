import useSort, { SORT_DIRECTION } from "../useSort";
import { renderHook, act } from "@testing-library/react-hooks";

describe("useSort", () => {
  const originalData = [
    { id: 1, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
  ];
  it("Should set the initial sorting configuration when provided", () => {
    const initialSortConfig = {
      key: "value",
      direction: SORT_DIRECTION.DESCENDING,
    };
    const { result } = renderHook(() =>
      useSort(originalData, initialSortConfig),
    );
    // Ensure initial sorting configuration is correctly set
    expect(result.current.sortConfig).toEqual(initialSortConfig);
  });
  // Test case: Initialize with default configuration
  it("Should initialize with default configuration when no initial configuration is provided", () => {
    const { result } = renderHook(() => useSort(originalData));
    // Ensure the hook initializes with the default configuration
    expect(result.current.sortConfig).toEqual({
      key: "",
      direction: SORT_DIRECTION.NEUTRAL,
    });
  });
  // Test case: Sorting in descending order
  it("should sort data in descending order when sort is requested again on the same key", () => {
    const { result } = renderHook(() => useSort(originalData));

    act(() => {
      result.current.requestSort("value"); // First sort (ascending)
      result.current.requestSort("value"); // Second sort (should switch to descending)
    });
    // Ensure data is sorted in descending order by 'value'
    expect(result.current.sortedData).toEqual([
      { id: 3, value: "C" },
      { id: 2, value: "B" },
      { id: 1, value: "A" },
    ]);
    expect(result.current.sortConfig.direction).toEqual(
      SORT_DIRECTION.DESCENDING,
    );
  });

  it("Should return data in the same order if the sort direction is neutral", () => {
    const { result } = renderHook(() => useSort(originalData));

    act(() => {
      result.current.requestSort("value"); // First sort (ascending)
      result.current.requestSort("value"); // Second sort (descending)
      result.current.requestSort("value"); // Third sort (should switch to neutral)
    });

    // At this point, the order should remain the same as the original data
    expect(result.current.sortedData).toEqual(originalData);
    expect(result.current.sortConfig.direction).toEqual(SORT_DIRECTION.NEUTRAL);
  });

  it("Should handle sorting of numeric values correctly", () => {
    const { result } = renderHook(() =>
      useSort([
        { id: 1, value: 10 },
        { id: 2, value: 2 },
        { id: 3, value: 1 },
      ]),
    );

    act(() => {
      result.current.requestSort("value");
    });

    expect(result.current.sortedData).toEqual([
      { id: 3, value: 1 },
      { id: 2, value: 2 },
      { id: 1, value: 10 },
    ]);
    expect(result.current.sortConfig.direction).toEqual(
      SORT_DIRECTION.ASCENDING,
    );
  });

  it("Should handle sorting of string values correctly", () => {
    const { result } = renderHook(() =>
      useSort([
        { id: 1, value: "A" },
        { id: 2, value: "B" },
        { id: 3, value: "C" },
      ]),
    );

    act(() => {
      result.current.requestSort("value");
    });

    expect(result.current.sortedData).toEqual([
      { id: 1, value: "A" },
      { id: 2, value: "B" },
      { id: 3, value: "C" },
    ]);
    expect(result.current.sortConfig.direction).toEqual(
      SORT_DIRECTION.ASCENDING,
    );
  });

  it("Should handle sorting of date or custom object values correctly (if applicable)", () => {
    const { result } = renderHook(() =>
      useSort([
        { id: 1, value: new Date("2020-01-01") },
        { id: 2, value: new Date("2020-01-02") },
        { id: 3, value: new Date("2020-01-03") },
      ]),
    );

    act(() => {
      result.current.requestSort("value");
    });

    expect(result.current.sortedData).toEqual([
      { id: 1, value: new Date("2020-01-01") },
      { id: 2, value: new Date("2020-01-02") },
      { id: 3, value: new Date("2020-01-03") },
    ]);
    expect(result.current.sortConfig.direction).toEqual(
      SORT_DIRECTION.ASCENDING,
    );
  });
  // Test case: Handle empty data arrays without errors
  it("Should handle empty data arrays without errors", () => {
    const { result } = renderHook(() => useSort([]));

    expect(result.current.sortedData).toEqual([]);
    expect(result.current.sortConfig.direction).toEqual(SORT_DIRECTION.NEUTRAL);
  });

  it("should preserve the original data array (immutability test)", () => {
    // Ensure empty data arrays are handled gracefully
    const originalDataCopy = JSON.parse(JSON.stringify(originalData));

    // Render the hook with the original data array
    const { result } = renderHook(() => useSort(originalData));

    // Call the requestSort function to sort the data
    act(() => {
      result.current.requestSort("value"); // Assuming "value" is a field you're sorting by
    });

    // Check that the sortedData is not the same reference as the originalData
    expect(result.current.sortedData).not.toBe(originalData);

    // Check that the content of the original data array has not changed by comparing it with the copy
    expect(originalData).toEqual(originalDataCopy);
  });

  it("Should toggle the sort direction correctly", () => {
    const { result } = renderHook(() => useSort(originalData));

    // Request initial sorting (ascending)
    act(() => {
      result.current.requestSort("value");
    });

    // Request sorting again on the same key to toggle direction
    act(() => {
      result.current.requestSort("value");
    });

    // Check that the direction has toggled correctly
    expect(result.current.sortConfig).toEqual({
      key: "value", // Should remain the same
      direction: SORT_DIRECTION.DESCENDING, // It should toggle to DESCENDING
    });
  });
  it("should handle sorting with non-string or non-numeric values", () => {
    const { result } = renderHook(() =>
      useSort([
        { id: 1, value: { name: "A" } },
        { id: 2, value: { name: "B" } },
        { id: 3, value: { name: "C" } },
      ]),
    );

    act(() => {
      result.current.requestSort("value.name");
    });

    expect(result.current.sortedData).toEqual([
      { id: 1, value: { name: "A" } },
      { id: 2, value: { name: "B" } },
      { id: 3, value: { name: "C" } },
    ]);
    expect(result.current.sortConfig.direction).toEqual(
      SORT_DIRECTION.ASCENDING,
    );
  });
});
