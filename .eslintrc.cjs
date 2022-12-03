module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
      "import/internal-regex": /^\$/,
    },
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "warn",
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          "builtin",
          "external",
          "type",
          "internal",
          ["sibling", "parent"],
          "index",
          "object",
        ],
        "newlines-between": "always",
      },
    ],
    "import/group-exports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-default-export": "off",
  },
};
