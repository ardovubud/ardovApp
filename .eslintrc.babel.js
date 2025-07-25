module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['@babel'],
  rules: {
    '@babel/no-invalid-this': 'error',
    '@babel/semi': 'off',
  },
};
