module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['airbnb-standard', 'prettier'],
  overrides: [
    {
      files: ['packages/*/test/**/*.js', 'test/**/*.js'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-underscore-dangle': 'off',
  },
}
