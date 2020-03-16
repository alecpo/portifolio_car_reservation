module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['react', 'prettier', 'react-hooks', 'babel'],
  globals: {
    __DEV__: true,
    fetch: false
  },
  env: {
    jest: true
  },
  rules: {
    'comma-dangle': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': ['error', { ignore: ['navigation', 'route', 'mask'] }],
    'react/state-in-constructor': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'babel/no-unused-expressions': 0,
    'babel/no-unused-expressions': 1
  }
};
