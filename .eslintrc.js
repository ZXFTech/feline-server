module.exports = {
  root: true,

  env: {
    node: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },

  plugins: ["@typescript-eslint"],

  rules: {
    indent: ["error", "space"], // Tab 使用两个空格
    "linebreak-style": ["error", "unix"], // 换行符统一使用 \n
    quotes: ["error", "double"], // 所有字符串使用双引号
    semi: ["error", "always"], // 语句结尾必须带分号
    curly: ["error", "multi", "consistent"], // if 语句严格带大括号
    "no-unser-var": ["error", "true"], // 不能有声明后未使用的变量或参数
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
};
