// Function to get a deeply nested property value from an object using dot-separated path
export const getDeepPropertyValue = (obj, path) => {
  // Split the dot-separated path into an array of keys
  const keys = path.split(".");
  let current = obj;

  // Iterate through the keys to access the nested property
  for (const key of keys) {
    current = current[key];
    if (current === undefined) {
      return undefined; // Return undefined if the property does not exist
    }
  }
  return current; // Return the retrieved property value
};

// Function to extract a nested property value as a string from an object using dot-separated path
export const extractNestedValueAsString = (item, path) => {
  // Use reduce to traverse the nested structure and access the property value
  const value = path
    .split(".")
    .reduce(
      (obj, key) =>
        obj && Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : null,
      item,
    );

  // Check if the value is an object (non-array) and convert it to a string
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ");
  }

  return value; // Return the extracted value as a string or the original value
};

// Function to generate table headers from object keys in an array of data
export const generateHeadersFromObjectKeys = (data) => {
  // Check if the input data is an array and not empty
  if (!Array.isArray(data) || data.length === 0) return [];

  // Flatten the nested structure in each object of the data array
  const flatData = data.map((item) => {
    const flattened = { ...item };
    for (const key of Object.keys(item)) {
      if (
        typeof item[key] === "object" &&
        item[key] !== null &&
        !Array.isArray(item[key])
      ) {
        for (const subKey of Object.keys(item[key])) {
          flattened[`${key}.${subKey}`] = item[key][subKey];
        }
        delete flattened[key];
      }
    }
    return flattened;
  });

  // Check if the flattened data is an array and not empty
  if (!Array.isArray(flatData) || flatData.length === 0) return [];

  // Generate table headers based on the keys in the first flattened object
  return Object.keys(flatData[0]).map((key) => ({ name: key }));
};

// Function to generate pagination size options based on the total data size
export const generatePaginationSizeOption = (dataSize) => {
  const options = [4, 8, 16, 32, 64];

  // Calculate and add additional options based on data size
  let value = 100;
  while (value < dataSize) {
    options.push(value);
    value = value + Math.round(Math.log(value) * 50);
  }

  // Filter the options to ensure they are not greater than the data size
  const validOptions = options.filter((opt) => opt <= dataSize);

  // Add the data size itself as an option if it's not already included
  if (validOptions[validOptions.length - 1] !== dataSize) {
    validOptions.push(dataSize);
  }

  return validOptions; // Return the valid pagination size options
};
