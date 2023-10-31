import { renderHook, act } from "@testing-library/react-hooks";
import useFilter from "../useFilter";

describe("useFilter custom hook", () => {
  const mockData = [
    { id: 1, name: "John", details: { age: 30, location: "USA" } },
    { id: 2, name: "Doe", details: { age: 25, location: "UK" } },
    { id: 3, name: "Michael", details: { age: 27, location: "Australia" } },
  ];

  const headers = [
    { name: "name", label: "Name" },
    { name: "details.age", label: "Age" },
    { name: "details.location", label: "Location" },
  ];

  it("should filter data based on query", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));

    // Test with default state (no filtering query set, so all items should be present)
    expect(result.current.filteredData).toEqual(mockData);

    // Define a filtering action (user sets a query)
    const setFilterQuery = (query) => {
      act(() => {
        result.current.setQuery(query);
      });
    };

    // Filter for a name
    setFilterQuery("Doe");
    expect(result.current.filteredData).toEqual([mockData[1]]);

    // Filter for an age
    setFilterQuery("27");
    expect(result.current.filteredData).toEqual([mockData[2]]);

    // Test with a non-matching query
    setFilterQuery("NonExistent");
    expect(result.current.filteredData).toEqual([]);
  });

  it("should handle query reset correctly", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));

    // Setting a query first
    act(() => {
      result.current.setQuery("John");
    });

    expect(result.current.filteredData).toEqual([mockData[0]]);

    // Resetting the query (clearing filter)
    act(() => {
      result.current.setQuery("");
    });

    // Expecting the full set of data back since the filter query is cleared
    expect(result.current.filteredData).toEqual(mockData);
  });
  it("should return all data when query is empty", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    expect(result.current.filteredData).toEqual(mockData);
  });

  it("should filter data based on name", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    act(() => {
      result.current.setQuery("John");
    });
    expect(result.current.filteredData).toEqual([mockData[0]]);
  });

  it("should filter data based on age", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    act(() => {
      result.current.setQuery("25");
    });
    expect(result.current.filteredData).toEqual([mockData[1]]);
  });

  it("should filter data based on location", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    act(() => {
      result.current.setQuery("Australia");
    });
    expect(result.current.filteredData).toEqual([mockData[2]]);
  });

  it("should return empty array when query does not match any data", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    act(() => {
      result.current.setQuery("NonExistent");
    });
    expect(result.current.filteredData).toEqual([]);
  });

  it("should handle undefined values in data", () => {
    const dataWithUndefined = [
      { id: 1, name: "John", details: { age: 30, location: "USA" } },
      { id: 2, name: "Doe", details: { age: undefined, location: "UK" } },
      { id: 3, name: "Michael", details: { age: 27, location: "Australia" } },
    ];
    const { result } = renderHook(() => useFilter(dataWithUndefined, headers));
    act(() => {
      result.current.setQuery("UK");
    });
    expect(result.current.filteredData).toEqual([dataWithUndefined[1]]);
  });
  it("should handle empty data array", () => {
    const { result } = renderHook(() => useFilter([], headers));
    expect(result.current.filteredData).toEqual([]);
  });

  it("should handle undefined data", () => {
    const { result } = renderHook(() => useFilter(undefined, headers));
    expect(result.current.filteredData).toEqual([]);
  });
  it("should handle undefined query", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    act(() => {
      result.current.setQuery(undefined);
    });
    expect(result.current.filteredData).toEqual(mockData);
  });

  it("should handle null query", () => {
    const { result } = renderHook(() => useFilter(mockData, headers));
    act(() => {
      result.current.setQuery(null);
    });
    expect(result.current.filteredData).toEqual(mockData);
  });
});
