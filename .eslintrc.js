const RULES = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
}

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: "module",
    ecmaVersion: 2021,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  plugins: ["react", "react-hooks", "jsx-a11y", "prettier"],
  rules: {
    "prettier/prettier": [RULES.OFF, {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
    "no-restricted-syntax": RULES.OFF,
    "react/react-in-jsx-scope": RULES.OFF,
    "prefer-regex-literals": RULES.OFF,
    "react-hooks/exhaustive-deps": RULES.OFF,
    "no-extend-native": RULES.OFF,
    camelcase: RULES.OFF,
    "no-console": [
      RULES.WARN,
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "react/destructuring-assignment": RULES.OFF,
    "react/jsx-props-no-spreading": RULES.OFF,
    "react/jsx-key": RULES.OFF,
    "no-useless-rename": [
      RULES.ERROR,
      {
        ignoreDestructuring: true,
        ignoreImport: true,
        ignoreExport: true,
      },
    ],
    "react/prop-types": RULES.OFF,
  },
}
