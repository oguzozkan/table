// jest.config.js

module.exports = {
  // Set the environment to "jsdom" to provide a DOM for tests
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js", "<rootDir>/src/setupEnzyme.js"],
  // Map various non-JS file extensions to appropriate mock files
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // ... other configurations as necessary
};
