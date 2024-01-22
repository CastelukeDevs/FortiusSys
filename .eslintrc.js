module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn', // or error
          {
            // caughtErrorsIgnorePattern: '^styles',
            // argsIgnorePattern: '^_',
            // varsIgnorePattern: '^_',
            // caughtErrorsIgnorePattern: '^_',
          },
        ],
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
