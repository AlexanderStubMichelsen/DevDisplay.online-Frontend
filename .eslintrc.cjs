module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // 👈 allows use of `process`, `module`, etc.
    jest: true, // 👈 allows test globals like `describe`, `test`, etc.
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }], // ✅ suppress React unused warning
  },
};
