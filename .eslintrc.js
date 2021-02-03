module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import'],
  extends: ['airbnb-standard', 'prettier', 'plugin:import/typescript'],
  overrides: [
    {
      files: ['packages/*/test/**/*.js', 'test/**/*.js'],
      env: {
        jest: true,
      },
      plugins: ['import', 'jest'],
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
    'func-names': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off', // TODO: ts lint bug
    'no-unused-vars': 'off', // TODO: ts lint bug
  },
}
