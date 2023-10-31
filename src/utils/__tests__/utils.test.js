import {
  getDeepPropertyValue,
  extractNestedValueAsString,
  generateHeadersFromObjectKeys,
  generatePaginationSizeOption,
} from "../utils";

describe("Utils Functions", () => {
  // Test cases for getDeepPropertyValue function
  describe("getDeepPropertyValue", () => {
    it("retrieves the deep property value correctly", () => {
      const object = { level1: { level2: { level3: "value" } } };
      const result = getDeepPropertyValue(object, "level1.level2.level3");
      expect(result).toBe("value");
    });

    it("returns undefined if the property does not exist", () => {
      const object = { level1: { level2: {} } };
      const result = getDeepPropertyValue(object, "level1.level2.level3");
      expect(result).toBeUndefined();
    });
  });

  // Test cases for extractNestedValueAsString function
  describe("extractNestedValueAsString", () => {
    it("formats nested objects as string", () => {
      const object = { data: { key1: "value1", key2: "value2" } };
      const result = extractNestedValueAsString(object, "data");
      expect(result).toBe("key1: value1, key2: value2");
    });

    it("returns direct value if not a nested object", () => {
      const object = { data: "value" };
      const result = extractNestedValueAsString(object, "data");
      expect(result).toBe("value");
    });

    it("returns null if path is invalid", () => {
      const object = {};
      const result = extractNestedValueAsString(object, "data");
      expect(result).toBeNull();
    });
  });

  // Test cases for generateHeadersFromObjectKeys function
  describe("generateHeadersFromObjectKeys", () => {
    it("generates headers correctly from object keys", () => {
      const dataObjects = [
        { prop1: "value1", prop2: "value2", nested: { prop3: "value3" } },
      ];
      const expectedHeaders = [
        { name: "prop1" },
        { name: "prop2" },
        { name: "nested.prop3" },
      ];
      const headers = generateHeadersFromObjectKeys(dataObjects);
      expect(headers).toEqual(expectedHeaders);
    });

    it("returns empty array for empty input", () => {
      const headers = generateHeadersFromObjectKeys([]);
      expect(headers).toEqual([]);
    });
  });

  // Test cases for generatePaginationSizeOption function
  describe("generatePaginationSizeOption", () => {
    it("includes specific values and max data size", () => {
      const dataSize = 220;
      const options = generatePaginationSizeOption(dataSize);
      expect(options).toEqual(
        expect.arrayContaining([4, 8, 16, 32, 64, 100, 220]),
      );
    });

    it("ends with the exact data size", () => {
      const dataSize = 80;
      const options = generatePaginationSizeOption(dataSize);
      expect(options[options.length - 1]).toBe(dataSize);
    });
  });
});
