/**
 * ESLint flat config (ESLint 9+).
 *
 * Extends React Native's shared config and layers on project-specific
 * ignores. Prettier-conflicting rules are already disabled by the
 * React Native config.
 *
 * @format
 */
const reactNativeConfig = require('@react-native/eslint-config/flat');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'android/**',
      'ios/**',
      'coverage/**',
      '**/*.svg',
      'vendor/**',
    ],
  },
  ...reactNativeConfig,

  // This is a TypeScript-only project with no Flow sources. The Flow rules
  // that React Native's config applies to `.js` files (config/tooling files
  // here) crash under ESLint 9 with eslint-plugin-ft-flow, so disable them.
  {
    files: ['**/*.js'],
    rules: {
      'ft-flow/define-flow-type': 'off',
      'ft-flow/use-flow-type': 'off',
    },
  },

  // Jest setup/mocks run in the Jest environment.
  {
    files: ['jest.setup.js', '**/__mocks__/**'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
];
