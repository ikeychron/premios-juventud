module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "comma-dangle": "off",
    quotes: "off",
    camelcase: "off",
    "space-before-function-paren": "off",
    "react/prop-types": "off",
    indent: "off",
    "no-constant-condition": "warn",
    "multiline-ternary": "off",
    "default-param-last": "off",
  },
}
