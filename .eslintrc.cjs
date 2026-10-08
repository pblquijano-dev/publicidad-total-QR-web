module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/react-in-jsx-scope': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
  },
};
