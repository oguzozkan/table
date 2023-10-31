import { renderHook } from "@testing-library/react-hooks";
import useApiData from "../useApiData";

global.fetch = jest.fn();
describe("useApiData hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches the data successfully", async () => {
    const mockData = [{ id: 1, title: "Test data" }];
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiData("https://api.example.com/data"),
    );
    expect(result.current.loading).toBeTruthy();

    // Wait for the hook to complete the fetch operation
    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles the non-ok response", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiData("https://api.example.com/data"),
    );
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeDefined();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("catches the error if fetching fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch")),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiData("https://api.example.com/data"),
    );
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeDefined();
    expect(result.current.error.message).toBe("Failed to fetch");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("transforms object data into an array of key-value pairs", async () => {
    const mockData = { id: 1, title: "Test data" };
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiData("https://api.example.com/data"),
    );
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual([
      { key: "id", value: 1 },
      { key: "title", value: "Test data" },
    ]);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("does not transform array data", async () => {
    const mockData = [{ id: 1, title: "Test data" }];
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiData("https://api.example.com/data"),
    );
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
