const globals = require('globals');
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  prettier,
  {
    ignores: [
      'test.js',
      'background-test.js',
      'debug-state.js',
      'proyek-presiden.js',
      'test-crash.js',
      'test-fs.js',
      'coverage/',
      '.husky/',
      'docs/'
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-console': 'off',
      'no-process-exit': 'off',
      'no-control-regex': 'off',
    },
  },
];
