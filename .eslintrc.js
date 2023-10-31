/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",

  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
  plugins: ["react"],
  rules: {
    "react/react-injsx-scope": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "off",
  },
};
