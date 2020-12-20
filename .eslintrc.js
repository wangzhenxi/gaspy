module.exports = {
  root: true,
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
}
